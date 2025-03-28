// @ts-nocheck
import { useEffect, useState } from "react";
import GuessThePlayer from "../components/TriviaShowdownComponents/GuessThePlayer";
import TriviaQuestion from "../components/TriviaShowdownComponents/TriviaQuestion";
function TriviaShowdown({
  assetsLinks,
  playersHeadshots,
}: {
  assetsLinks: AssetLinks;
  playersHeadshots: Record<string | "placeholderHeadshot", string>;
}) {
  const [loading, setLoading] = useState<boolean>(true);
  const [pageLoading, setPageLoading] = useState<boolean>(false);

  const [userStreakData, setUserStreakData] = useState<{
    progress: Progress;
    quizStreak: number;
  }>({ progress: "neutral", quizStreak: 0 });

  const [gameState, setGameState] = useState<GameStateType>({
    gameStarted: false,
    gameLanguage: "english",
    isTimer: false,
    timer: 10, // in seconds
    questionLoading: true,
    questionCategory: "",
    correctAnswer: 0,
    isAnswered: false,
    selectedAnswer: -1,
    newQuestionTimer: 3,
  });

  const [currentQuestion, setCurrentQuestion] = useState({
    question:
      "Who is the MLB player known for both pitching and hitting prowess? 🌟",
    options: ["Shohei Ohtani", "Mike Trout"],
    answer: 0,
    englishOptions: [],
    success: true,
  });

  useEffect(() => {
    window.parent.postMessage(
      {
        type: "getStreakPoints",
      },
      "*"
    );

    window.addEventListener("message", (event) => {
      const { message } = event.data.data;
      if (message.devvitDataType === "streak-points-info") {
        const { results } = message.devvitData;
        setUserStreakData(results);
      } else if (message.devvitDataType === "trivia-question") {
        const { results } = message.devvitData;
        if (gameState.gameLanguage === "english") {
          setGameState({
            ...gameState,
            correctAnswer: results.options[results.answer],
          });
        } else {
          setGameState({
            ...gameState,
            correctAnswer: results.englishOptions[results.answer],
          });
        }
        shuffleOptions(results.options);
        setCurrentQuestion(results);
        setGameState({ ...gameState, questionLoading: false });
      }
    });
    setLoading(false);
  }, []);

  function shuffleOptions(options: string[]) {
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
  }

  const getTriviaQuestion = () => {
    setGameState({ ...gameState, questionLoading: true });
    const category: TriviaQuestionCategory[] = [
      "triviaQuestion",
      "playerGuess",
    ];
    const categoryChoice =
      category[(Math.floor(Math.random() * 2) + Date.now()) % 2];
    setGameState({ ...gameState, questionCategory: categoryChoice });
    // TODO: uncomment this in prod
    // window.parent.postMessage(
    //   {
    //     type: "getTriviaQuestion",
    //     data: {
    //       category: categoryChoice,
    //       language: pageState.gameLanguage,
    //     },
    //   },
    //   "*"
    // );
  };

  return (
    <div className="p-4 relative h-screen ">
      {/* 
      const [timer, setTimer] = useState(10);
        const [currentQuestion, setCurrentQuestion] = useState({
          question:
            "Who is the MLB player known for both pitching and hitting prowess? 🌟",
          options: ["Shohei Ohtani", "Mike Trout"],
          answer: 0,
          englishOptions: [],
          success: true,
        });
        const [selectedAnswer, setSelectedAnswer] = useState<number>(-1);
        const [isAnswered, setIsAnswered] = useState(false); 
        */}
      <GuessThePlayer
        playersHeadshots={playersHeadshots}
        currentQuestion={currentQuestion}
        gameState={gameState}
        setGameState={setGameState}
      />

      {/* {gameState.questionCategory === "playerGuess" ? (
        <GuessThePlayer />
      ) : (
        <TriviaQuestion />
      )} */}
    </div>
  );
}

export default TriviaShowdown;

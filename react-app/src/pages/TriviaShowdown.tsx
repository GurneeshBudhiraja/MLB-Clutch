import { useEffect, useState } from "react";
import GuessThePlayer from "../components/TriviaShowdownComponents/GuessThePlayer";
function TriviaShowdown({
  playersHeadshots,
  setCurrentPage,
  assetsLinks,
}: {
  playersHeadshots: Record<string | "placeholderHeadshot", string>;
  setCurrentPage: React.Dispatch<React.SetStateAction<HeaderOptions>>;
  assetsLinks: AssetLinks;
}) {
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

  const [currentQuestion, setCurrentQuestion] = useState<CurrentQuestionType>({
    answer: 0,
    englishOptions: [],
    options: [],
    question: "",
    success: false,
  });

  const getTriviaQuestion = () => {
    console.log("inside the getTriviaQuestion");
    setGameState((prev) => ({
      ...prev,
      isTimer: false,
      timer: 10,
      questionLoading: true,
      questionCategory: "",
      correctAnswer: 0,
      isAnswered: false,
      selectedAnswer: -1,
      newQuestionTimer: 3,
    }));

    const category: TriviaQuestionCategory[] = [
      "triviaQuestion",
      "playerGuess",
    ];
    const categoryChoice = category[Math.floor(Math.random() * 2)];
    console.log("categoryChoice");
    console.log(categoryChoice);
    // Update this line to not use spread operator
    setGameState((prevState) => ({
      ...prevState,
      questionCategory: categoryChoice,
    }));

    window.parent.postMessage(
      {
        type: "getTriviaQuestion",
        data: {
          category: categoryChoice,
          language: gameState.gameLanguage,
        },
      },
      "*"
    );
  };

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
        console.log("trivia-question");
        const { results } = message.devvitData;
        if (!results || !Object.keys(results).length) {
          console.log("error in getting trivia question");
          setGameState({
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
          setCurrentPage("currentMatches");
          return;
        }
        console.log(results);
        setGameState((prev) => ({
          ...prev,
          questionLoading: false,
          correctAnswer: results.answer,
        }));
        setCurrentQuestion(results);
      }
    });
  }, []);

  useEffect(() => {
    if (!gameState.questionLoading) return;
    console.log("calling the getTriviaQuestion");
    getTriviaQuestion();
  }, [gameState.questionLoading]);

  return (
    <>
      <div className="p-4 relative h-screen ">
        <div className="flex items-center gap-2 border border-theme-white rounded p-3 w-fit">
          <img
            src={assetsLinks["fire-flame"]}
            alt="Streak"
            className="w-5 h-5"
          />
          <span>
            Streak:{" "}
            <span className="bg-theme-red py-1 px-2 rounded-full">
              {userStreakData.quizStreak}
            </span>
          </span>
        </div>
        {gameState.questionLoading ? (
          <div className="flex justify-center items-center h-full">
            <img
              src={assetsLinks["loader"]}
              alt="Loading..."
              className="w-40 h-40"
            />
          </div>
        ) : (
          <GuessThePlayer
            setUserStreakData={setUserStreakData}
            playersHeadshots={playersHeadshots}
            currentQuestion={currentQuestion}
            gameState={gameState}
            setGameState={setGameState}
          />
        )}
      </div>
    </>
  );
}

export default TriviaShowdown;

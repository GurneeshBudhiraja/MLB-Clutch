// @ts-nocheck
import { useEffect, useState } from "react";
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

  const [pageState, setPageState] = useState<PageStateType>({
    gameStarted: false,
    gameLanguage: "english",
    isTimer: false,
    timer: 15, // in seconds
    questionLoading: true,
    questionCategory: "",
    correctAnswer: 0,
  });

  const [currentQuestion, setCurrentQuestion] = useState({
    question:
      "Who is the MLB player known for both pitching and hitting prowess? 🌟",
    options: ["Shohei Ohtani", "Mike Trout"],
    answer: 0,
    englishOptions: [],
    success: true,
  });

  const [timeLeft, setTimeLeft] = useState(pageState.timer);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

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
        if (pageState.gameLanguage === "english") {
          setPageState({
            ...pageState,
            correctAnswer: results.options[results.answer],
          });
        } else {
          setPageState({
            ...pageState,
            correctAnswer: results.englishOptions[results.answer],
          });
        }
        shuffleOptions(results.options);
        setCurrentQuestion(results);
        setPageState({ ...pageState, questionLoading: false });
        setTimeLeft(pageState.timer);
        setSelectedAnswer(null);
        setIsAnswerCorrect(null);
      }
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (
      pageState.gameStarted &&
      pageState.isTimer &&
      timeLeft > 0 &&
      !selectedAnswer
    ) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [pageState.gameStarted, pageState.isTimer, timeLeft, selectedAnswer]);

  function shuffleOptions(options: string[]) {
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
  }

  const getTriviaQuestion = () => {
    setPageState({ ...pageState, questionLoading: true });
    const category: TriviaQuestionCategory[] = [
      "triviaQuestion",
      "playerGuess",
    ];
    const categoryChoice =
      category[(Math.floor(Math.random() * 2) + Date.now()) % 2];
    window.parent.postMessage(
      {
        type: "getTriviaQuestion",
        data: {
          category: categoryChoice,
          language: pageState.gameLanguage,
        },
      },
      "*"
    );
  };

  return <div className="p-4 relative h-full">This is something
  <button onClick={getTriviaQuestion}>Get trivia</button>
  </div>;
}

export default TriviaShowdown;

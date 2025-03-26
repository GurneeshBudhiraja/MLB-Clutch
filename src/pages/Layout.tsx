import {
  Devvit,
  useAsync,
  useForm,
  useState,
  useWebView,
} from "@devvit/public-api";
import LiveScore from "./LiveScorePage.js";
import HomePage from "./HomePage.js";
import QuizPage from "./QuizPage.js";
import Home from "./Home.js";

function Layout({ context }: { context: Devvit.Context }) {
  // Current page
  const [currentPage, setCurrentPage] = useState<CurrentPageType>("home");

  // Quiz settings
  const [quizSettings, setQuizSettings] = useState<TriviaSettings>({
    language: "english",
  });

  const quizSettingsForm = useForm(
    {
      title: "Quiz Settings",
      description:
        "Customize your quiz experience by selecting both difficulty level and preferred language for questions",
      fields: [
        {
          name: "language",
          type: "select",
          label: "Select the language",
          required: true,
          helpText: "Choose which language you want the quiz in",
          options: [
            {
              label: "English",
              value: "english",
            },
            {
              label: "Japanese",
              value: "japanese",
            },
            {
              label: "Spanish",
              value: "spanish",
            },
          ],
        },
      ],
      acceptLabel: "Start Quiz",
      cancelLabel: "Go Back",
    },
    async (values) => {
      console.log("Language:", values.language[0]);
      setQuizSettings({
        language: values.language[0] as TriviaLanguage,
      });
      setCurrentPage("quiz");
    }
  );

  switch (currentPage) {
    case "quiz":
      return (
        <QuizPage
          currentPage={currentPage}
          context={context}
          setCurrentPage={setCurrentPage}
          language={quizSettings.language}
        />
      );
    case "home":
    default:
      return <Home context={context} quizSettingsForm={quizSettingsForm} />;
  }
}

export default Layout;

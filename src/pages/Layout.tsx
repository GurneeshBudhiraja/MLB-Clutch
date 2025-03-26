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
  // State to keep track which page to show
  const [currentPage, setCurrentPage] = useState<CurrentPageType>("home");

  // State for the quiz settings
  const [quizSettings, setQuizSettings] = useState<TriviaSettings>({
    language: "english",
  });

  /**
   * Form to allow users to select the language of the quiz
   * Supported Languages: English, Japanese, or Spanish
   */
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
      // Updates the language in the quizSettings state
      setQuizSettings({
        language: values.language[0] as TriviaLanguage,
      });
      // Updates the state to render the quiz content
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

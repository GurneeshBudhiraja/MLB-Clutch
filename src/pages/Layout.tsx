import { Devvit, useForm, useState } from "@devvit/public-api";
import LiveScore from "./LiveScorePage.js";
import HomePage from "./HomePage.js";
import QuizPage from "./QuizPage.js";
import RedditOFDPage from "./RedditOFDPage.js";

function Layout({ context }: { context: Devvit.Context }) {
  // Current page
  const [currentPage, setCurrentPage] = useState<CurrentPageType>("home");

  // Quiz settings
  const [quizSettings, setQuizSettings] = useState<TriviaSettings>({
    language: "english",
    difficulty: "easy",
  });

  const quizSettingsForm = useForm(
    {
      title: "Quiz Settings",
      description:
        "Customize your quiz experience by selecting both difficulty level and preferred language for questions",
      fields: [
        {
          name: "level",
          type: "select",
          label: "Select the difficulty",
          helpText:
            "This will determine the complexity of questions you'll receive",
          required: true,
          options: [
            {
              label: "Easy",
              value: "easy",
            },
            {
              label: "Medium",
              value: "medium",
            },
            {
              label: "Hard",
              value: "hard",
            },
          ],
        },
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
      console.log("Difficulty:", values.level[0]);
      console.log("Language:", values.language[0]);
      setQuizSettings({
        difficulty: values.level[0] as TriviaDifficulty,
        language: values.language[0] as TriviaLanguage,
      });
      setCurrentPage("quiz");
    }
  );

  switch (currentPage) {
    case "quiz":
      return (
        <QuizPage
          context={context}
          setCurrentPage={setCurrentPage}
          difficulty={quizSettings.difficulty}
          language={quizSettings.language}
        />
      );
    case "home":
    default:
      return (
        <hstack>
          <button onPress={() => context.ui.showForm(quizSettingsForm)}>
            Quiz
          </button>
        </hstack>
      );
  }
}

export default Layout;

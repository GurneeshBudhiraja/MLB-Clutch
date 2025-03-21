import { Devvit, useAsync, useForm, useState } from "@devvit/public-api";
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
  });

  const [userRedisData, setUserRedisData] = useState<Record<string, any>>({});

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

  useAsync(async () => {
    try {
      const applicationDataJSON = await context.redis.get("application-data");

      // Checks if the application-data exists in the Redis storage
      if (!applicationDataJSON) {
        throw new Error(
          "Something went wrong. Please contact mod to reinstall the application."
        );
      }
      const applicationData = JSON.parse(
        applicationDataJSON
      ) as ApplicationData;
      const { users } = applicationData;
      const currentUserInfo = users[`${context.userId}`];
      if (!currentUserInfo) {
        applicationData["users"][`${context.userId}`] = {
          ...applicationData["users"][`${context.userId}`],
          quizStreak: 0,
        };
        setUserRedisData(applicationData["users"]);
        await context.redis.set(
          "application-data",
          JSON.stringify(applicationData)
        );
      } else {
        setUserRedisData(applicationData["users"]);
      }
    } catch (error: any) {
      console.log(error);
      context.ui.showToast(
        error.message ?? "Something went wrong. Please try again later."
      );
    } finally {
      return {};
    }
  });

  switch (currentPage) {
    case "quiz":
      return (
        <QuizPage
          context={context}
          setCurrentPage={setCurrentPage}
          language={quizSettings.language}
        />
      );
    case "home":
    default:
      return (
        <hstack>
          <button
            onPress={async (data) => {
              console.log(data);
              const applicationDataJson = await context.redis.get(
                "application-data"
              );
              console.log("application-data is:");
              console.log(applicationDataJson);
            }}
          >
            check question of the day and user data
          </button>
          <button
            onPress={() => {
              context.ui.showForm(quizSettingsForm);
            }}
          >
            Ultimate Streak Mode
          </button>
        </hstack>
      );
  }
}

export default Layout;

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
      const doExists = await context.redis.exists(`${context.userId}`);
      if (!doExists) {
        await context.redis.set(
          `${context.userId}`,
          JSON.stringify({ quizStreak: 0 })
        );
        console.log("Reddis has been updated");
      } else {
        const jsonRedisStorage = await context.redis.get(`${context.userId}`);
        if (!jsonRedisStorage) {
          throw new Error("Undefined jsonRedisStorage.");
        }
        const redisStorage = JSON.parse(jsonRedisStorage);
        // TODO: remove in production
        console.dir(redisStorage, { depth: null });
        // await context.redis.del(`${context.userId}`);
      }
    } catch (error) {
      console.log(error);
      // TODO: change in production
      context.ui.showToast("Error getting data from Redis storage");
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

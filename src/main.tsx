import { Devvit } from "@devvit/public-api";
import { Loading } from "./components/Loading.js";
import Layout from "./pages/Layout.js";
import { getTriviaQuestion } from "./utils/openAI.js";

Devvit.configure({
  redis: true,
  http: true,
  redditAPI: true,
});

Devvit.addSettings([
  {
    name: "open-ai-api-key",
    label: "Open AI API key",
    type: "string",
    isSecret: true,
    scope: "app",
  },
]);

// Router for the application
Devvit.addCustomPostType({
  name: "MLB Clutch Post",
  height: "tall",
  render: (context) => <Layout context={context} />,
});

Devvit.addMenuItem({
  location: "subreddit",
  forUserType: "moderator",
  description: "Creates a starting MLB Post",
  label: "[MLB Clutch] Create a pinned post",
  onPress: async (event, context) => {
    const { reddit, ui } = context;
    const currentSubreddit = await reddit.getCurrentSubreddit();

    const post = await reddit.submitPost({
      preview: <Loading />,
      title: "MLB Clutch ⚾️",
      subredditName: currentSubreddit.name,
    });
    await post.sticky();
    ui.showToast(`Created and pinned post in ${currentSubreddit.name}`);
  },
});

Devvit.addSchedulerJob({
  name: "question_of_the_day",
  onRun: async (_, context) => {
    console.log("question_of_the_day handler called");
    const previousQuesionOfTheDay = await context.redis.get("qotd");
    if (previousQuesionOfTheDay) {
      await context.redis.del("qotd");
    }
    const openAIKey = (await context.settings.get("open-ai-api-key")) as string;
    const triviaQuestion = await getTriviaQuestion(
      openAIKey,
      "english",
      "gpt-4o"
    );
    if (!triviaQuestion.success) {
      console.log("Failed to get the question of the day");
      return;
    }
    await context.redis.set("qotd", JSON.stringify(triviaQuestion));
    const userRedisDataJSON = await context.redis.get(`${context.userId}`);
    if (!userRedisDataJSON) {
      console.log(
        "No user id found in redis therefore updating it with new values"
      );
      await context.redis.set(
        `${context.userId}`,
        JSON.stringify({
          quizStreak: 0,
          qotdAnswered: false,
        })
      );
    } else {
      const userRedisData = JSON.parse(userRedisDataJSON);
      await context.redis.set(
        `${context.userId}`,
        JSON.stringify({
          ...userRedisData,
          qotdAnswered: false,
        })
      );
    }
    console.log(
      "question_of_the_day handler finished and redis has been updated"
    );
  },
});

Devvit.addTrigger({
  event: "AppInstall",
  onEvent: async (_, context) => {
    console.log("app has been installed for the very first time");
    try {
      const jobId = await context.scheduler.runJob({
        cron: "0 0 * * *",
        name: "question_of_the_day",
        data: {},
      });
      const redisJobId = await context.redis.get("jobId");
      // TODO: remove in prod
      console.log({ redisJobId });

      if (!redisJobId) {
        console.log(
          " ============== Setting the job id for the very first time ================"
        );
        let applicationData: Record<string, any> = {};
        const jsonApplicationData = await context.redis.get("application-data");
        if (jsonApplicationData) {
          applicationData = JSON.parse(jsonApplicationData);
        }

        // Gets the openAI key
        const openAIKey = (await context.settings.get(
          "open-ai-api-key"
        )) as string;

        console.log(openAIKey);
        // Generates a new trivia question
        const triviaQuestion = await getTriviaQuestion(
          openAIKey,
          "english",
          "gpt-4o"
        );
        console.log("Setting the very first trivia question of the day");

        console.log("Updated the very first question of the day");

        applicationData["jobId"] = jobId;
        applicationData["qotd"] = { ...triviaQuestion };
        applicationData["users"] = {};
        await context.redis.set(
          "application-data",
          JSON.stringify(applicationData)
        );
        console.log(
          "Basic redis data has been set after the installation of the application"
        );
      }
    } catch (e) {
      console.log("error was not able to schedule:", e);
      throw e;
    }
  },
});

export default Devvit;

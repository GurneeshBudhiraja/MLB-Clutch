import { Devvit } from "@devvit/public-api";
import { Loading } from "./components/Loading.js";
import Layout from "./pages/Layout.js";

/**
 * Configuration to use the various Devvit APIs
 */
Devvit.configure({
  redis: true,
  http: true,
  redditAPI: true,
});

/**
 * Settings to use the openAI key
 */
Devvit.addSettings([
  {
    name: "open-ai-api-key",
    label: "Open AI API key",
    type: "string",
    isSecret: true,
    scope: "app",
  },
]);

/**
 * The `Layout` component decides which screen to render on the Devvit application
 */
Devvit.addCustomPostType({
  name: "MLB Clutch Post",
  height: "tall",
  render: (context) => <Layout context={context} />,
});

/**
 * Adds the menu option to add the post.
 * Only allowed for moderators
 */
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

Devvit.addTrigger({
  event: "AppInstall",
  onEvent: async (_, context) => {
    console.log("App has been installed for the very first time");
    try {
      /**
       * Creates and stores the empty users object on the installation of the application in the Redis db
       */
      await context.redis.set(
        "application-data",
        JSON.stringify({ users: {} })
      );
      /**
       * Creates and stores the empty `application-bets` object on the installation of the application in the Redis db
       */
      await context.redis.set("application-bets", JSON.stringify({}));
      console.log(
        "Basic redis data has been set after the installation of the application"
      );
    } catch (e) {
      console.log("Error in the AppInstall trigger", e);
      throw e;
    }
  },
});

export default Devvit;

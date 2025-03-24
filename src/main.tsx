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

// Renders the required page
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

Devvit.addTrigger({
  event: "AppInstall",
  onEvent: async (_, context) => {
    console.log("app has been installed for the very first time");
    try {
      const applicationData: ApplicationData = { users: {} };
      await context.redis.set(
        "application-data",
        JSON.stringify(applicationData)
      );
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

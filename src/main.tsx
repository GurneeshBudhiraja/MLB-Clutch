import { Devvit } from "@devvit/public-api";
import { Loading } from "./components/Loading.js";
import Layout from "./pages/Layout.js";

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

export default Devvit;

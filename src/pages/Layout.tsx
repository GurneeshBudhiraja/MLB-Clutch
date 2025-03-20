import { Devvit, useState } from "@devvit/public-api";
import LiveScore from "./LiveScorePage.js";
import HomePage from "./HomePage.js";
import QuizPage from "./QuizPage.js";
import RedditOFDPage from "./RedditOFDPage.js";

function Router({ context }: { context: Devvit.Context }) {
  const [currentPage, setCurrentPage] = useState<CurrentPageType>("home");
  // This function checks and renders the required page
  switch (currentPage) {
    case "home":
      return <HomePage setCurrentPage={setCurrentPage} />;
    case "quiz":
      return <QuizPage setCurrentPage={setCurrentPage} context={context} />;
    // case "redditOfTheDay":
    //   return <RedditOFDPage />;
    default:
      return (
        <vstack>
          <text>404: Page not found</text>
        </vstack>
      );
  }
}

export default Router;

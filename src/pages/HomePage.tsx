import { Devvit, StateSetter } from "@devvit/public-api";
import LiveScore from "./LiveScorePage.js";
import Menu from "../components/menu/Menu.js";

// Home Page
function HomePage({
  setCurrentPage,
}: {
  setCurrentPage: StateSetter<CurrentPageType>;
}) {
  return (
    <zstack width="100%" height="100%" grow={true}>
      {/* Background image */}
      <image
        url="background.jpeg"
        description="Background Image"
        imageHeight={800}
        imageWidth={800}
        width="100%"
        height="100%"
        resizeMode="cover"
      />
      {/* Vertical stack for the main menu */}
      <vstack
        padding="medium"
        gap="medium"
        grow={true}
        width="100%"
        height="100%"
        border="thin"
        borderColor="CoolGray-100"
        cornerRadius="medium"
      >
        {/* Leaderboard icon at top right */}
        <vstack alignment="top end" width="100%" grow={false}>
          <image
            url="leaderboard-icon.jpeg"
            description="Leaderboard"
            imageHeight={100}
            imageWidth={100}
            width="60px"
            height="60px"
            resizeMode="scale-down"
          />
        </vstack>
        <vstack height="100%" width="100%" grow={true} gap="medium">
          <LiveScore />
          {/* Menu for the MLB quiz and Reddit of the day */}
          <Menu setCurrentPage={setCurrentPage} />
        </vstack>
      </vstack>
    </zstack>
  );
}

export default HomePage;

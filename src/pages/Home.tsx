import { Devvit, FormKey, useState } from "@devvit/public-api";
import LeaderBoard from "../components/LeaderBoard.js";
import { getTriviaQuestion } from "../utils/openAI.js";
import Score from "../components/Score.js";

function Home({
  context,
  quizSettingsForm,
}: {
  context: Devvit.Context;
  quizSettingsForm: FormKey;
}) {
  // State to check if the
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  // TODO: remove in prod
  const getRedditLinks = async () => {
    const files = [
      "108.png",
      "109.png",
      "110.png",
      "111.png",
      "112.png",
      "113.png",
      "114.png",
      "115.png",
      "116.png",
      "117.png",
      "118.png",
      "119.png",
      "120.png",
      "121.png",
      "133.png",
      "134.png",
      "135.png",
      "136.png",
      "137.png",
      "138.png",
      "139.png",
      "140.png",
      "teamPlaceholder.png",
    ];
    const fileLinks: Record<string, string> = {};
    const fileNames = files.map((file) => {
      const fileName = file.split(".")[0];
      const url = context.assets.getURL(`teamLogos/${file}`);
      fileLinks[fileName] = url;
    });
    console.log(fileLinks);
  };

  return (
    <zstack width="100%" height="100%" grow={true}>
      {/* Background image */}
      <image
        url="background.jpeg"
        description="MLB-themed Background"
        imageHeight={800}
        imageWidth={800}
        width="100%"
        height="100%"
        resizeMode="cover"
      />

      <vstack width="100%" height="100%">
        {/* Header */}
        <hstack padding="medium" width="100%" alignment="start">
          <text
            size="xlarge"
            weight="bold"
            color="white"
            style="heading"
            alignment="start"
          >
            MLB TRIVIA CHALLENGE
          </text>

          {/* Trophy GIF in top right */}
          <hstack alignment="end" width={"100%"} grow={true}>
            <image
              imageHeight={"60px"}
              imageWidth={"60px"}
              url="leaderboard.gif"
              onPress={() => setShowLeaderboard(true)}
              description="Leaderboard Gif"
            />
          </hstack>
        </hstack>

        {/* Main content area */}
        <vstack grow alignment="middle center" gap="large">
          <button onPress={() => getRedditLinks()}>Click</button>
          <text size="xxlarge" weight="bold" color="white" style="heading">
            BASEBALL TRIVIA
          </text>
          <Score context={context} />

          <button
            appearance="primary"
            size="large"
            onPress={() => {
              context.ui.showForm(quizSettingsForm);
            }}
          >
            ULTIMATE STREAK MODE
          </button>
          <button
            appearance="bordered"
            textColor="white"
            onPress={async (data) => {
              const applicationDataJson = await context.redis.get(
                "application-data"
              );
              console.log("application-data is:");
              console.log(applicationDataJson);
            }}
          >
            Check Stats
          </button>
        </vstack>
      </vstack>

      {/* Leaderboard modal */}
      {showLeaderboard && (
        <LeaderBoard
          setShowLeaderboard={setShowLeaderboard}
          context={context}
        />
      )}
    </zstack>
  );
}

export default Home;

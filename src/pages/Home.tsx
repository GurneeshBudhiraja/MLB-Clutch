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
  const [showLeaderboard, setShowLeaderboard] = useState(false);
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

      {/* Header bar with trophy icon */}
      <vstack width="100%" height="100%">
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

          {/* Trophy icon in top right */}
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

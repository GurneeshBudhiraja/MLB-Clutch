import { Devvit, StateSetter, useAsync } from "@devvit/public-api";
import { getTriviaQuestion } from "../utils/openAI.js";

function QuizPage({
  setCurrentPage,
  context,
}: {
  setCurrentPage: StateSetter<CurrentPageType>;
  context: Devvit.Context;
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
        <hstack alignment="top" width="100%" grow={false} gap="large">
          <vstack
            alignment="start middle"
            onPress={() => setCurrentPage("home")}
          >
            <button icon="back-fill" appearance="bordered" />
          </vstack>
          <vstack alignment="top end" width="100%" grow={true}>
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
        </hstack>
        <button
          onPress={async () => {
            console.log("Pressed");
            const openAIKey = await context.settings.get("open-ai-api-key");
            if (!openAIKey || typeof openAIKey !== "string") {
              console.log("Invalid openAI key");
              return;
            }
            const triviaQuestion = await getTriviaQuestion(openAIKey);
            console.log("Trivia question is: ");
            console.log(triviaQuestion);
          }}
        >
          Click me
        </button>
      </vstack>
    </zstack>
  );
}

export default QuizPage;

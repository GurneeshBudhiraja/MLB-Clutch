import { Devvit } from "@devvit/public-api";

function TriviaModal({
  success,
  answer,
}: {
  success: boolean;
  answer: string;
}) {
  return (
    <zstack
      width="100%"
      height="100%"
      alignment="middle center"
      backgroundColor="rgba(0, 0, 0, 0.5)"
    >
      <hstack
        width="80%"
        height={success ? "40%" : "50%"}
        cornerRadius="medium"
        backgroundColor="neutral-background"
        border="thin"
        borderColor="white"
      >
        <zstack width="40%" alignment="middle center" backgroundColor="#f8f8f8">
          <image
            url={
              success
                ? `success/success${Math.floor(Math.random() * 5)}.gif`
                : `fails/fail${Math.floor(Math.random() * 5)}.gif`
            }
            imageHeight={200}
            imageWidth={200}
            resizeMode="fit"
          />
        </zstack>

        <vstack
          backgroundColor="#002D72"
          padding="large"
          gap="medium"
          width="60%"
          alignment="middle center"
        >
          <hstack alignment="middle center" gap="small">
            <icon
              name={success ? "approve" : "remove"}
              color={success ? "success-plain" : "danger-plain"}
              size="large"
            />
            <text
              style="heading"
              color={success ? "success-plain" : "danger-plain"}
            >
              {success ? "Correct!" : "Incorrect!"}
            </text>
          </hstack>

          <text alignment="center" color="white">
            {success
              ? "Great job! You got the right answer."
              : "Sorry, that's not the right answer."}
          </text>

          {!success && (
            <vstack
              padding="medium"
              backgroundColor="#D32F2F"
              cornerRadius="small"
              gap="small"
              width="90%"
            >
              <hstack gap="small" alignment="middle start">
                <icon name="checkmark-outline" color="white" size="small" />
                <text weight="bold" color="white">
                  Correct answer: {answer}
                </text>
              </hstack>

              <hstack gap="small" alignment="middle start">
                {/* <icon name="" color="white" size="small" /> */}
                <text color="white">Your streak has been reset to 0</text>
              </hstack>
            </vstack>
          )}

          {success ? (
            <hstack gap="medium" alignment="center">
              <button appearance="bordered" onPress={() => {}} icon="home-fill">
                Home
              </button>
              <button appearance="primary" onPress={() => {}}>
                Next Question
              </button>
            </hstack>
          ) : (
            <button
              appearance="bordered"
              textColor="white"
              onPress={() => {}}
              icon="home-fill"
            >
              Back to Home
            </button>
          )}
        </vstack>
      </hstack>
    </zstack>
  );
}

export default TriviaModal;

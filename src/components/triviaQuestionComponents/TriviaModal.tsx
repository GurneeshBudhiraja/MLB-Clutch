import { Devvit, StateSetter, useState } from "@devvit/public-api";

function TriviaModal({
  setCurrentPage,
  success,
  answer,
  streak, // current streak before updating
}: {
  setCurrentPage: StateSetter<CurrentPageType>;
  success: boolean;
  answer: string;
  streak: number;
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
        height="50%"
        cornerRadius="medium"
        backgroundColor="neutral-background"
        border="thin"
        borderColor="white"
      >
        {/* Your existing code remains unchanged here */}
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

          {/* Add streak information ONLY for success case */}
          {success && (
            <vstack
              padding="medium"
              backgroundColor="#4CAF50"
              cornerRadius="small"
              gap="small"
              width="90%"
              alignment="middle center"
            >
              <hstack gap="small" alignment="center">
                <image
                  imageHeight={"20px"}
                  imageWidth={"20px"}
                  height={"20px"}
                  url="fire-flame.gif"
                />
                <text weight="bold" color="white" style="heading">
                  Streak Updated!
                </text>
              </hstack>
              <text color="white">
                You're now on a {streak + 1}-answer streak!
              </text>
            </vstack>
          )}

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
              <button
                appearance="bordered"
                onPress={() => {
                  setCurrentPage("home");
                }}
                icon="home-fill"
              >
                Home
              </button>
              <button appearance="primary" onPress={() => {}}>
                Keep Going!
              </button>
            </hstack>
          ) : (
            <button
              appearance="bordered"
              textColor="white"
              onPress={() => {
                setCurrentPage("home");
              }}
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

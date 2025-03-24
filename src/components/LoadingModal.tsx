import { Devvit } from "@devvit/public-api";

function LoadingModal() {
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
        <zstack width="40%" alignment="middle center" backgroundColor="#f8f8f8">
          <image
            url="loader.gif"
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
          <text style="heading" color="white">
            Loading...
          </text>
          <text alignment="center" color="white">
            New question is being loaded
          </text>
        </vstack>
      </hstack>
    </zstack>
  );
}

export default LoadingModal;

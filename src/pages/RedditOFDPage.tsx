import { Devvit } from "@devvit/public-api";

function RedditOFDPage() {
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
        <text>Reddit of the day page</text>
      </vstack>
    </zstack>
  );
}

export default RedditOFDPage;

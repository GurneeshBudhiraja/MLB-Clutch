import { Devvit } from "@devvit/public-api";

export const Loading = (): JSX.Element => (
  <zstack width="100%" height="100%" alignment="center middle">
    <image
      url="background.jpeg"
      description="Background Image"
      imageHeight={800}
      imageWidth={800}
      width="100%"
      height="100%"
      resizeMode="cover"
    />
    <image
      url="loader.gif"
      description="Loading ..."
      imageHeight={800}
      imageWidth={800}
      width="200px"
      height="200px"
      resizeMode="scale-down"
    />
  </zstack>
);

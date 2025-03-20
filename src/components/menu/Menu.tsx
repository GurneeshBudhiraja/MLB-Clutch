import { Devvit, StateSetter } from "@devvit/public-api";
import MenuButton from "./MenuButton.js";

function Menu({
  setCurrentPage,
}: {
  setCurrentPage: StateSetter<CurrentPageType>;
}) {
  return (
    <hstack
      width="100%"
      height="100%"
      grow={true}
      gap="medium"
      alignment="center"
    >
      <MenuButton buttonText="Quiz" onPress={() => setCurrentPage("quiz")} />
      <MenuButton
        buttonText="Reddit Of The Day"
        onPress={() => setCurrentPage("redditOfTheDay")}
      />
    </hstack>
  );
}

export default Menu;

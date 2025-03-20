import { Devvit } from "@devvit/public-api";

function MenuButton({
  buttonText,
  onPress,
}: {
  buttonText: string;
  onPress?: () => void;
}) {
  return (
    <button
      onPress={
        onPress ? onPress : () => console.log("no onpress has been provided")
      }
    >
      {buttonText}
    </button>
  );
}

export default MenuButton;

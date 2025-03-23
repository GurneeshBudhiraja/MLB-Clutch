import { Devvit } from "@devvit/public-api";

function TriviaButton({
  iconName,
  appearance,
  onPress,
  text,
}: TriviaButtonProps) {
  return (
    <button icon={iconName} appearance={appearance} onPress={onPress}>
      {text}
    </button>
  );
}

export default TriviaButton;

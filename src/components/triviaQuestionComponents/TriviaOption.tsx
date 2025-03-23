import { Devvit } from "@devvit/public-api";

function TriviaOption({
  index,
  setSelectedOption,
  selectedOption,
  option,
}: TriviaOptionProps) {
  return (
    <hstack
      padding="small"
      cornerRadius="small"
      backgroundColor={selectedOption === index ? "#002D72" : "#F5F5F5"}
      onPress={() => setSelectedOption(index)}
      alignment="middle start"
      gap="small"
    >
      <vstack
        width="24px"
        height="24px"
        cornerRadius="full"
        backgroundColor={selectedOption === index ? "#D50032" : "#CCCCCC"}
        alignment="middle center"
      >
        <text
          weight="bold"
          color={selectedOption === index ? "white" : "black"}
        >
          {index + 1}
        </text>
      </vstack>
      <text
        size="medium"
        weight={selectedOption === index ? "bold" : "regular"}
        color={selectedOption === index ? "white" : "black"}
      >
        {option}
      </text>
    </hstack>
  );
}

export default TriviaOption;

import {
  Devvit,
  StateSetter,
  useAsync,
  useForm,
  useState,
} from "@devvit/public-api";
import { getTriviaQuestion } from "../utils/openAI.js";

const sampleObject = {
  question: 'Which MLB team is known for their iconic "Curse of the Bambino"?',
  options: [
    "Chicago Cubs",
    "Boston Red Sox",
    "New York Yankees",
    "Los Angeles Dodgers",
  ],
  answer: 1,
  hint: "This team famously broke a long championship drought in 2004!",
  success: true,
};

function QuizPage({
  setCurrentPage,
  context,
  language,
}: {
  setCurrentPage: StateSetter<CurrentPageType>;
  context: Devvit.Context;
  language: TriviaLanguage;
}) {
  // const [triviaQuestion, setTriviaQuestion] = useState<TriviaQuestion>({
  //   question: "",
  //   answer: -1,
  //   options: [],
  //   success: false,
  //   hint: "",
  // });
  const [triviaQuestion, setTriviaQuestion] =
    useState<TriviaQuestion>(sampleObject);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<number>(-1);
  const [error, setError] = useState<string>("");
  const [modal, setModal] = useState<{ showModal: boolean; success: boolean }>({
    showModal: false,
    success: false,
  });
  const [loading, setLoading] = useState<boolean>(false);

  // Automatically run the function on the component render
  // TODO: Uncomment the code below to fetch the trivia question
  const generateTriviaQuestion = async () => {
    try {
      setLoading(true);
      // Gets the openAI API key
      const openAIKey = await context.settings.get("open-ai-api-key");
      if (!openAIKey || typeof openAIKey !== "string") {
        console.log("OpenAI API key missing or not a string");
        setCurrentPage("home");
        return null;
      }
      // Fetches the trivia question
      const aiTriviaResponse = await getTriviaQuestion(openAIKey, language);
      // If the response is not successful, return to the home page
      if (!aiTriviaResponse.success) {
        console.log("Failed to generate new question.");
        setCurrentPage("home");
        return null;
      }
      console.log(aiTriviaResponse);
      return aiTriviaResponse;
    } catch (error) {
      setCurrentPage("home");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // useAsync(generateTriviaQuestion, {
  //   finally: (data) => {
  //     if (data) {
  //       setTriviaQuestion(data);
  //     }
  //   },
  // });

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
        {/* Leaderboard icon and back icon */}
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

        {/* Show loading state or button based on the loading status */}
        {loading ? (
          <text>Loading trivia question...</text>
        ) : (
          <vstack>
            <text size="small">{triviaQuestion.question}</text>
            <spacer size="small" />
            <vstack>
              {triviaQuestion.options.map((option, index) => (
                <text
                  size="small"
                  color={
                    selectedOption === index ? "AlienBlue-400" : "AlienBlue-200"
                  }
                  onPress={() => setSelectedOption(index)}
                >
                  {index + 1}. {option}
                </text>
              ))}
            </vstack>
            <spacer size="small" />
            <vstack>
              {showHint && <text size="small">{triviaQuestion.hint}</text>}
              <button onPress={() => setShowHint(!showHint)}>Hint</button>
            </vstack>
            <spacer size="small" />
            <button
              onPress={async () => {
                if (selectedOption === -1) {
                  // When no option has been selected
                  setError("Please select an option");
                } else if (selectedOption === triviaQuestion.answer) {
                  // When correct option has been selected
                  setModal({ showModal: true, success: true });
                  const jsonApplicationData = (await context.redis.get(
                    `application-data`
                  )) as string;
                  const applicationData = JSON.parse(
                    jsonApplicationData
                  ) as ApplicationData;

                  applicationData["users"][`${context.userId}`]["quizStreak"]++;
                  await context.redis.set(
                    `application-data`,
                    JSON.stringify(applicationData)
                  );
                } else {
                  // When wrong option has been selected
                  setModal({ showModal: true, success: false });
                  const jsonApplicationData = (await context.redis.get(
                    `application-data`
                  )) as string;
                  const applicationData = JSON.parse(
                    jsonApplicationData
                  ) as ApplicationData;

                  applicationData["users"][`${context.userId}`][
                    "quizStreak"
                  ] = 0;

                  await context.redis.set(
                    `application-data`,
                    JSON.stringify(applicationData)
                  );
                  console.log("Updated the application data");
                }
              }}
            >
              Submit
            </button>
            <spacer size="small" />
          </vstack>
        )}
      </vstack>

      {/* Modal  */}
      {modal.showModal && (
        <zstack width="100%" height="100%" alignment="middle center">
          <vstack
            padding="large"
            gap="medium"
            cornerRadius="medium"
            border="thin"
            borderColor="AlienBlue-200"
            backgroundColor="neutral-background"
            width="80%"
            alignment="middle center"
          >
            {modal.success && (
              <text color={"green"} size="xlarge">
                Correct Answer!
              </text>
            )}
            {!modal.success && (
              <text color={"red"} size="xlarge">
                Wrong Answer!
              </text>
            )}
            {modal.success && <text>Your streak has been increased.</text>}
            {!modal.success && <text>Your streak has been broken</text>}
            <spacer size="medium" />
            <hstack gap="medium">
              <button
                appearance="primary"
                onPress={() => setCurrentPage("home")}
              >
                Back to Home
              </button>
              {modal.success && (
                <button
                  appearance="secondary"
                  onPress={() => {
                    // Add logic here if you want to load a new question
                    setSelectedOption(-1);
                  }}
                >
                  Continue
                </button>
              )}
            </hstack>
          </vstack>
        </zstack>
      )}
    </zstack>
  );
}

export default QuizPage;

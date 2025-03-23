import {
  Devvit,
  StateSetter,
  useAsync,
  useForm,
  useState,
} from "@devvit/public-api";
import { getTriviaQuestion } from "../utils/openAI.js";
import { Loading } from "../components/Loading.js";
import TriviaOption from "../components/triviaQuestionComponents/TriviaOption.js";
import TriviaButton from "../components/triviaQuestionComponents/TriviaButton.js";
import TriviaModal from "../components/triviaQuestionComponents/TriviaModal.js";
import LoadingModal from "../components/LoadingModal.js";

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
    showModal: true,
    success: true,
  });
  const [userData, setUserData] = useState<Omit<UserData, "firstVisit">>({
    quizStreak: 0,
    totalPoints: 0,
  });

  // const [loading, setLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [questionLoading, setQuestionLoading] = useState<boolean>(true);

  // Automatically run the function on the component render
  // TODO: Uncomment the code below to fetch the trivia question
  const generateTriviaQuestion = async () => {
    try {
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
        setLoading(false);
        setCurrentPage("home");
        return null;
      }
      return aiTriviaResponse;
    } catch (error) {
      console.log(error);
      setCurrentPage("home");
      return null;
    } finally {
    }
  };

  // useAsync(generateTriviaQuestion, {
  //   finally: (data) => {
  //     if (data) {
  //       setTriviaQuestion(data);
  //       setLoading(false);
  //     } else {
  //       setCurrentPage("home");
  //     }
  //   },
  // });
  // useAsync(async () => {
  //   return {};
  // });

  useAsync(
    async () => {
      console.log("This is working");
      try {
        const userId = String(context.userId);

        // Gets application-data from Redis
        const jsonApplicationData = await context.redis.get("application-data");
        if (!jsonApplicationData) {
          throw new Error("No application data found in quiz page");
        }

        const applicationData = JSON.parse(
          jsonApplicationData
        ) as ApplicationData;
        const { users } = applicationData;
        const userData = users[userId];
        if (!userData) {
          throw new Error("No user data found in quiz page");
        }

        // Return the data instead of setting state directly
        return {
          quizStreak: userData.quizStreak,
          totalPoints: userData.totalPoints,
        };
      } catch (error) {
        console.log(
          "No application data found in quiz page. Please reinstall the application"
        );
        console.log(error);
        setCurrentPage("home");
        throw error;
      }
    },
    {
      // Set the state after the async operation
      finally: (data) => {
        if (data) {
          setUserData(data);
        }
        setLoading(false);
      },
    }
  );

  const hintForm = useForm(
    {
      fields: [],
      title: "💡 Trivia Hint",
      description: triviaQuestion.hint,
    },
    (values) => {}
  );

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
      {/* Vertical stack for the page content */}
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
        {/* Back button and current streak */}
        <hstack alignment="top" width="100%" grow={false} gap="large">
          {/* Header back button */}
          <vstack
            alignment="start middle"
            onPress={() => setCurrentPage("home")}
            grow={false}
          >
            <button icon="back-fill" appearance="destructive" />
          </vstack>
          {/* Header streak count */}
          <vstack alignment="top end" width={"100%"} grow={true}>
            <hstack
              padding="small"
              alignment="middle center"
              backgroundColor="#002D72"
              cornerRadius="medium"
              border="thin"
              borderColor="white"
            >
              <image
                imageHeight={"20px"}
                imageWidth={"20px"}
                height={"20px"}
                url="fire-flame.gif"
              />
              <text size="medium">Current Streak</text>
              <spacer size="xsmall" />
              <vstack
                width="24px"
                height="24px"
                cornerRadius="full"
                backgroundColor="#D50032"
                alignment="middle center"
              >
                <text weight="bold" color={"white"}>
                  {userData.quizStreak}
                </text>
              </vstack>
              <text size="xlarge" color="Red-100" weight="bold"></text>
            </hstack>
          </vstack>
        </hstack>

        <vstack>
          {/* Question stack */}
          <vstack
            padding="medium"
            backgroundColor="Red-600"
            cornerRadius="medium"
            border="thin"
            borderColor="white"
          >
            <hstack alignment="middle center" gap="small">
              <icon name="predictions-fill" />
              <text size="small" color="CoolGray-200" weight="bold">
                TRIVIA QUESTION
              </text>
            </hstack>
            <spacer size="small" />
            <text
              size="large"
              weight="bold"
              color="white"
              alignment="center middle"
              wrap
            >
              {triviaQuestion.question}
            </text>
          </vstack>

          <spacer size="small" />

          {/* Options stack */}
          <vstack
            padding="medium"
            gap="small"
            backgroundColor="white"
            cornerRadius="medium"
            border="thin"
            borderColor="#D50032"
          >
            {triviaQuestion.options.map((option, index) => (
              <TriviaOption
                index={index}
                option={option}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
              />
            ))}
          </vstack>

          <spacer size="small" />

          {/* Show hint button and submit button */}
          <vstack gap="medium" padding="medium" alignment="end">
            <hstack gap="medium">
              <TriviaButton
                text="Show Hint"
                appearance={"bordered"}
                iconName={showHint ? "topic-help" : "topic-help-fill"}
                onPress={() => {
                  context.ui.showForm(hintForm);
                }}
              />
              <TriviaButton
                text={"Submit Answer"}
                appearance={"primary"}
                iconName={"checkmark"}
                onPress={() => {
                  setModal({
                    showModal: true,
                    success: true,
                  });
                }}
              />
            </hstack>
          </vstack>
          {/* <spacer size="small" />
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
                console.log(
                  "Updated the application data for the correct answer"
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

                applicationData["users"][`${context.userId}`]["quizStreak"] = 0;

                await context.redis.set(
                  `application-data`,
                  JSON.stringify(applicationData)
                );
                console.log(
                  "Updated the application data for the wrong answer"
                );
              }
            }}
          >
            Submit
          </button>
          <spacer size="small" /> */}
        </vstack>
      </vstack>

      {/* Loading overlay */}
      {loading && <Loading />}

      {/* Modal  */}
      {/* {modal.showModal && ( */}
      {questionLoading ? (
        <LoadingModal />
      ) : (
        <TriviaModal
          streak={userData.quizStreak}
          setCurrentPage={setCurrentPage}
          success={modal.success}
          answer={triviaQuestion["options"][triviaQuestion.answer]}
        />
      )}
      {/* )} */}
    </zstack>
  );
}

export default QuizPage;

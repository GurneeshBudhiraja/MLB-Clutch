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
import {
  evaluateQuestion,
  getRedisData,
  updateRedisData,
} from "../utils/utils.js";

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
  currentPage,
  setCurrentPage,
  context,
  language,
}: {
  currentPage: CurrentPageType;
  setCurrentPage: StateSetter<CurrentPageType>;
  context: Devvit.Context;
  language: TriviaLanguage;
}) {
  const [triviaQuestion, setTriviaQuestion] = useState<TriviaQuestion>({
    question: "",
    answer: -1,
    options: [],
    success: false,
    hint: "",
  });
  // const [triviaQuestion, setTriviaQuestion] =
  //   useState<TriviaQuestion>(sampleObject);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<number>(-1);
  const [error, setError] = useState<string>("");
  const [modal, setModal] = useState<{ showModal: boolean; success: boolean }>({
    showModal: false,
    success: false,
  });
  const [userData, setUserData] = useState<
    Omit<UserData, "firstVisit" | "totalPoints"> & { userId: string }
  >({
    userId: "",
    quizStreak: 0,
  });

  const [questionLoading, setQuestionLoading] = useState<boolean>(false);
  const [keepGoing, setKeepGoing] = useState<boolean>(false);

  // Automatically run the function on the component render
  const generateTriviaQuestion = async () => {
    try {
      // Gets the openAI API key
      const openAIKey = await context.settings.get("open-ai-api-key");
      if (!openAIKey || typeof openAIKey !== "string") {
        throw new Error("OpenAI API key missing or not a string");
      }
      // Fetches the trivia question
      const aiTriviaResponse = await getTriviaQuestion(openAIKey, language);
      // If the response is not successful, return to the home page
      if (!aiTriviaResponse.success) {
        throw new Error("Failed to generate trivia question");
      }
      return aiTriviaResponse;
    } catch (error) {
      console.log("Error in `QuizPage.tsx` generateTriviaQuestion");
      console.log(error);
      setCurrentPage("home");
      return null;
    } finally {
    }
  };

  const { loading } = useAsync(
    async () => {
      console.log("This is working");
      try {
        console.log("Generating a triviaquestion");
        const triviaQuestion = await generateTriviaQuestion();
        // const triviaQuestion = sampleObject;
        console.log("Generated a triviaquestion");
        if (!triviaQuestion) {
          throw new Error("Trivia question is undefined");
        }

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

        /**
         * Return the data for the `finally` function to update the state
         */
        return {
          generatedQuestion: triviaQuestion,
          quizStreak: userData.quizStreak,
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
      depends: [keepGoing],
      finally: async (data) => {
        /**
         * Checks the truthiness of the data and update the states using the data object
         */
        if (data) {
          const userId = String(context.userId);
          const { generatedQuestion: triviaQuestion, quizStreak } = data;
          setTriviaQuestion(triviaQuestion);
          setUserData({
            ...userData,
            userId,
            quizStreak,
          });
        }
      },
    }
  );

  // Form to display the hint
  const hintForm = useForm(
    {
      fields: [],
      title: "💡 Trivia Hint",
      description: triviaQuestion.hint,
    },
    (values) => {}
  );

  // Form to inform the user when no choice has been selected
  const noOptionSelectedForm = useForm(
    {
      fields: [],
      title: "⚠️ No Answer Selected",
      description: "Please select an option before submitting your answer.",
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

          <vstack gap="medium" padding="medium" alignment="end">
            <hstack gap="medium">
              {/* Hint button */}
              <TriviaButton
                text="Show Hint"
                appearance={"bordered"}
                iconName={showHint ? "topic-help" : "topic-help-fill"}
                onPress={() => {
                  context.ui.showForm(hintForm);
                }}
              />
              {/* Submit button */}
              <TriviaButton
                text={"Submit Answer"}
                appearance={"primary"}
                iconName={"checkmark"}
                onPress={async () => {
                  const evaluation = evaluateQuestion(
                    triviaQuestion,
                    selectedOption
                  );
                  if (evaluation === "no-option-selected") {
                    context.ui.showForm(noOptionSelectedForm);
                  } else if (evaluation === "correct") {
                    /**
                     * When the answer is correct
                     */
                    try {
                      const newUserData = {
                        ...userData,
                        quizStreak: userData.quizStreak + 1,
                      };
                      setModal({
                        ...modal,
                        showModal: true,
                        success: true,
                      });

                      // UserId of the current user
                      const { userId } = userData;

                      // Gets the old Redis data
                      console.log("Getting the current Redis data");
                      const currentRedisData = await getRedisData(
                        context,
                        "application-data"
                      );

                      // Checks the truthiness and type of currentRedisData
                      if (
                        !currentRedisData ||
                        typeof currentRedisData === "boolean"
                      ) {
                        context.ui.showToast(
                          "Please reinstall the application"
                        );
                        // Reset the modal state
                        setModal({
                          ...modal,
                          showModal: false,
                          success: false,
                        });
                        throw new Error("No redis data found");
                      }

                      console.log("Current Redis data:");
                      console.log(currentRedisData);
                      console.log("=======================");

                      // Updating the currentRedisData object
                      currentRedisData["users"][userId]["quizStreak"] =
                        newUserData.quizStreak;
                      currentRedisData["users"][userId]["progress"] =
                        "positive";

                      // Uses the util function to update the Redis storage.
                      console.log("Updating the redis data");
                      const updateRedisDataResponse = await updateRedisData(
                        context,
                        "application-data",
                        currentRedisData
                      );
                      if (!updateRedisDataResponse) {
                        // Reset the modal state
                        setModal({
                          ...modal,
                          showModal: false,
                          success: false,
                        });
                        context.ui.showToast(
                          "Unable to update data. Please try again later."
                        );
                        throw new Error("Failed to update the redis data");
                      }
                      console.log("Updated the redis data");
                      // Update the userData state
                      setUserData(newUserData);
                    } catch (error) {
                      console.log("Error in correct answer ");
                      console.log(error);
                    } finally {
                      // Resetting the option value selected
                      setSelectedOption(-1);
                    }
                  } else if (evaluation === "incorrect") {
                    /**
                     * When the selected answer is wrong
                     */

                    try {
                      const newUserData = {
                        ...userData,
                        quizStreak: userData.quizStreak - 1,
                      };

                      setModal({
                        ...modal,
                        showModal: true,
                        success: false,
                      });

                      // UserId of the current user
                      const { userId } = userData;

                      // Gets the old Redis data
                      console.log(
                        "Getting the current Redis data *** Revert back to normal ***"
                      );
                      const currentRedisData = await getRedisData(
                        context,
                        "application-data"
                      );

                      // Checks the truthiness and type of currentRedisData
                      if (
                        !currentRedisData ||
                        typeof currentRedisData === "boolean"
                      ) {
                        context.ui.showToast(
                          "Please reinstall the application"
                        );
                        // Reset the modal state
                        setModal({
                          ...modal,
                          showModal: false,
                          success: false,
                        });
                        throw new Error("No redis data found");
                      }

                      console.log("Current Redis data:");
                      console.log(currentRedisData);
                      console.log("=======================");

                      // Updating the currentRedisData object
                      currentRedisData["users"][userId]["quizStreak"] -= 1;
                      currentRedisData["users"][userId]["progress"] =
                        "negative";

                      // Uses the util function to update the Redis storage.
                      console.log("Updating the redis data");
                      const updateRedisDataResponse = await updateRedisData(
                        context,
                        "application-data",
                        currentRedisData
                      );
                      if (!updateRedisDataResponse) {
                        // Reset the modal state
                        setModal({
                          ...modal,
                          showModal: false,
                          success: false,
                        });
                        context.ui.showToast(
                          "Unable to update data. Please try again later."
                        );
                        throw new Error("Failed to update the redis data");
                      }
                      console.log("Updated the redis data");
                      // Update the userData state
                      setUserData(newUserData);
                    } catch (error) {
                      console.log("Error:");
                      console.log(error);
                    } finally {
                      setSelectedOption(-1);
                    }
                  }
                }}
              />
            </hstack>
          </vstack>
        </vstack>
      </vstack>

      {/* Loading overlay */}
      {loading && <Loading />}

      {/* Modal  */}
      {modal.showModal &&
        (questionLoading ? (
          <LoadingModal />
        ) : (
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
              <zstack
                width="40%"
                alignment="middle center"
                backgroundColor="#f8f8f8"
              >
                <image
                  url={
                    modal.success
                      ? /**
                         * Gets the last digit from the Date.now()
                         * Reduce it to the range of 0-4
                         * This increases the randomness
                         */
                        `success/success${(Date.now() % 10) % 5}.gif`
                      : `fails/fail${(Date.now() % 10) % 5}.gif`
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
                    name={modal.success ? "approve" : "remove"}
                    color={modal.success ? "success-plain" : "danger-plain"}
                    size="large"
                  />
                  <text
                    style="heading"
                    color={modal.success ? "success-plain" : "danger-plain"}
                  >
                    {modal.success ? "Correct!" : "Incorrect!"}
                  </text>
                </hstack>

                <text alignment="center" color="white">
                  {modal.success
                    ? "Great job! You got the right answer."
                    : "Sorry, that's not the right answer."}
                </text>

                {/* Add streak information ONLY for modal.success case */}
                {modal.success && (
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
                      You're now on a {userData.quizStreak}-answer streak!
                    </text>
                  </vstack>
                )}

                {!modal.success && (
                  <vstack
                    padding="medium"
                    backgroundColor="#D32F2F"
                    cornerRadius="small"
                    gap="small"
                    width="90%"
                  >
                    <hstack gap="small" alignment="middle start">
                      <icon
                        name="checkmark-outline"
                        color="white"
                        size="small"
                      />
                      <text weight="bold" color="white">
                        Correct answer:{" "}
                        {triviaQuestion["options"][triviaQuestion["answer"]]}
                      </text>
                    </hstack>
                    <text>
                      You're now on a {userData.quizStreak}-answer streak!
                    </text>
                  </vstack>
                )}

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
                  <button
                    appearance="primary"
                    onPress={async () => {
                      setModal({
                        showModal: false,
                        success: false,
                      });
                      setKeepGoing(!keepGoing);
                    }}
                  >
                    Keep Going!
                  </button>
                </hstack>
              </vstack>
            </hstack>
          </zstack>
        ))}
    </zstack>
  );
}

export default QuizPage;

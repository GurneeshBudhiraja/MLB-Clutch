import { Devvit } from "@devvit/public-api"

export function evaluateQuestion(triviaQuestion: TriviaQuestion, selectedOption: number) {
  try {
    console.log("I am in evaluateQuestion")
    if (selectedOption === -1) {
      return "no-option-selected"
    }
    if (selectedOption === triviaQuestion.answer) {
      return "correct"
    }
    if (selectedOption !== triviaQuestion.answer) {
      return "incorrect"
    }
  } catch (error) {
    console.log("Error while evaluating the question")
    console.log(error)
    return undefined
  }

}


export async function updateRedisData(context: Devvit.Context, redisKey: RedisKey, newValue: Record<string, any> | string | boolean | number,) {
  try {
    const jsonRedisData = await context.redis.get(redisKey)
    if (!jsonRedisData) {
      console.log(`No value exists for the ${redisKey} in the redis storage`)
      return false
    }
    const redisData = JSON.parse(jsonRedisData)
    if (redisKey === "application-data" && typeof (newValue) === "object") {
      const updatedRedisData = {
        ...redisData,
        ...newValue
      }
      console.log("Updating the application-data from `updateRedisData`");
      await context.redis.set(redisKey, JSON.stringify(updatedRedisData));
      console.log("Updated the application-data from `updateRedisData`");
      return true
    }
    console.log("Unexpected ending in updateRedisData")
    return false

  } catch (error) {
    console.log("Error while updating the Redis state")
    return false
  }

}


export async function getRedisData(context: Devvit.Context, redisKey: RedisKey): Promise<boolean | ApplicationData> {
  try {
    const jsonRedisData = await context.redis.get(redisKey)
    if (!jsonRedisData) {
      console.log(`Not able to find any data related to ${redisKey}`)
      return false
    }
    const redisData = JSON.parse(jsonRedisData)
    return redisData
  } catch (error) {
    console.log("Error in getting redis data")
    console.log(error)
    return false
  }

}

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
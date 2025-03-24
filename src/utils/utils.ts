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

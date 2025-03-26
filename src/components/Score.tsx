import { Devvit, useAsync, useState, useWebView } from "@devvit/public-api";
import { getRedisData, updateRedisData } from "../utils/utils.js";

function Score({ context }: { context: Devvit.Context }) {
  const getMatchData = async (matchDate?: string) => {
    const url = `https://statsapi.mlb.com/api/v1/schedule?sportId=1&season=2025&date=${matchDate}`;

    const response = await fetch(url);
    if (!response.ok) {
      console.error(
        "API response not OK:",
        response.status,
        response.statusText
      );
      return {
        success: false,
        errorCode: "fetch-error",
        results: [],
      };
    }

    const liveResult = await response.json();

    // checks if there are any games scheduled for today
    if (liveResult.totalGames === 0) {
      return { success: true, errorCode: "no-scheduled-matches", results: [] };
    } else if (liveResult.totalGames) {
      if (!liveResult.dates.length) {
        return {
          success: false,
          errorCode: "fetch-error",
          results: [],
        };
      } else {
        return {
          success: true,
          errorCode: null,
          results: liveResult?.dates[0]?.games ?? [],
        };
      }
    }
  };

  const { mount } = useWebView({
    // URL of your web view content
    url: "index.html",
    // Handle messages from web view
    onMessage: async (message, webview) => {
      if (typeof message === "object") {
        console.log(message?.type);
        if (message && message.type === "getMatches") {
          const { data } = message;
          console.log(data);
          const { date, matchFilter } = data;

          console.log(date);
          const response = await getMatchData(date);
          webview.postMessage({
            devvitDataType: "match-info",
            devvitData: {
              ...response,
            },
          });
        } else if (message && message.type === "userRedisInfo") {
          console.log("message type: userRedisInfo");
          const userId = context.userId as string;
          const applicationDataJson = (await context.redis.get(
            "application-data"
          )) as string;
          const applicationData = JSON.parse(applicationDataJson);

          const response = {};
          if (!Object.keys(applicationData).length || !applicationData?.users) {
            response["success"] = false;
            response["errorCode"] = "no-application-data";
            response["results"] = {};
          }
          if (!applicationData?.users[userId]) {
            response["success"] = false;
            response["errorCode"] = "no-user-data";
            response["results"] = {};
          }
          console.log(response);
          console.log(userId);
          console.log(applicationData);
          response["success"] = true;
          response["errorCode"] = null;
          response["results"] = applicationData?.users[userId];

          console.log(response);
          webview.postMessage({
            devvitDataType: "streak-points-info",
            devvitData: response,
          });
          console.log("Send the streak points data to the user");
        } else if (message && message.type === "betsDataUpdate") {
          console.log("updateBets");
          const { data } = message;
          const betsDataJSON = (await context.redis.get(
            "application-bets"
          )) as string;
          const betsData = JSON.parse(betsDataJSON);
          const userId = String(context.userId);
          const currentUserBetData = betsData[userId];
          const updatedResponse = {
            ...betsData,
          };
          if (!currentUserBetData) {
            updatedResponse[userId] = [data];
          } else {
            updatedResponse[userId] = [...updatedResponse[userId], { ...data }];
          }
          await context.redis.set(
            "application-bets",
            JSON.stringify(updatedResponse)
          );
          const newData = await context.redis.get("application-bets");
          console.log(newData);
        } else if (message && message.type === "currentUserBets") {
          console.log("currentUserBets");
          const userId = String(context.userId);
          const jsonRedisData = await context.redis.get("application-bets");

          const responseData = {};
          if (!jsonRedisData) {
            // When the data of the key named: `application-bets` is not found in the redis data
            return {
              success: false,
              errorCode: "no-bets-data",
              results: [],
            };
          }
          const redisData = JSON.parse(jsonRedisData);
          if (!Object.keys(redisData).length) {
            // When the `application-bets` object is empty
            responseData["success"] = false;
            responseData["errorCode"] = "empty-bets-data";
            responseData["results"] = [];
          }
          const currentUserBetData = redisData[userId];
          if (!currentUserBetData.length) {
            // When there is not bets data for the user id
            responseData["success"] = false;
            responseData["errorCode"] = "empty-user-bets-data";
            responseData["results"] = [];
          }
          // when the data for the corresponding userId has been found
          responseData["success"] = true;
          responseData["errorCode"] = null;
          responseData["results"] = currentUserBetData;
          console.log(responseData);
          webview.postMessage({
            devvitDataType: "user-bets-info",
            devvitData: responseData,
          });
        }
      }
    },
    // Cleanup when web view closes
    onUnmount: () => {
      console.log("Web view closed");
    },
  });

  return (
    <vstack width="100%" gap="medium" padding="medium" onPress={mount}>
      Get Live Updates
    </vstack>
  );
}

export default Score;

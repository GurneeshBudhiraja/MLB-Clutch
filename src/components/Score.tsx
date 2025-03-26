import { Devvit, useAsync, useState, useWebView } from "@devvit/public-api";

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

    // Check if we have valid data
    if (!liveResult.dates || liveResult.dates.length === 0) {
      return { success: false, errorCode: "invalid-data", results: [] };
    }

    return {
      success: true,
      errorCode: null,
      results: liveResult?.dates[0]?.games ?? [],
    };
  };

  const { mount } = useWebView({
    // URL of your web view content
    url: "index.html",
    // Handle messages from web view
    onMessage: async (message, webview) => {
      if (typeof message === "object") {
        if (message && message.type === "getMatches") {
          const { data } = message;
          const { date, matchFilter } = data;

          if (date === "currentDate") {
            // Gets the current date
            const date = new Date();
            let [currentMonth, currentDate, currentYear] = date
              .toLocaleDateString()
              .split("/") as [string, string, string];

            // Properly format the date with padding
            const formattedDate = [
              currentYear,
              currentMonth.padStart(2, "0"),
              String(Number(currentDate) - 1).padStart(2, "0"),
            ].join("-");
            const response = await getMatchData(formattedDate);
            webview.postMessage({
              devvitDataType: "match-info",
              devvitData: {
                ...response,
              },
            });
          }
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

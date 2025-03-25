import { Devvit, useAsync, useState, useWebView } from "@devvit/public-api";

function Score() {
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
              String(Number(currentDate)).padStart(2, "0"),
            ].join("-");

            const response = await getMatchData(formattedDate);

            webview.postMessage({
              devvitDataType: "match-info",
              devvitData: {
                ...response,
              },
            });
          }
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

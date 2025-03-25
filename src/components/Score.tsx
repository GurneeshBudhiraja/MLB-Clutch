import { Devvit, useAsync, useState, useWebView } from "@devvit/public-api";

function Score() {
  const { data: asyncScoreData, loading } = useAsync(
    // @ts-ignore
    async () => {
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

      const url = `https://statsapi.mlb.com/api/v1/schedule?sportId=1&season=2025&date=${formattedDate}`;

      const response = await fetch(url);
      if (!response.ok) {
        console.error(
          "API response not OK:",
          response.status,
          response.statusText
        );
        return {
          returnType: "error",
          message: `HTTP error: ${response.status}`,
        };
      }

      const liveResult = await response.json();

      // Check if we have valid data
      if (!liveResult.dates || liveResult.dates.length === 0) {
        return { returnType: "no-data" };
      }

      const isGameInProgress = liveResult.dates[0].totalGamesInProgress;
      if (!isGameInProgress) {
        return { returnType: "no-match-in-progress" };
      }

      const games = liveResult.dates[0].games as Array<Record<string, any>>;
      const currentPlayedGames: CurrentGame[] = [];

      // Process all games synchronously (no async in the loop)
      for (const game of games) {
        const gameStatus = game.status.abstractGameState;
        if (gameStatus === "Live") {
          const gamePk = game["gamePk"] as number;
          const awayTeamObj = game.teams.away;
          const homeTeamObj = game.teams.home;
          const away = {
            teamName: awayTeamObj.team.name as string, // Changed from id to name
            teamId: awayTeamObj.team.id as number,
            score: awayTeamObj.score as number,
          };
          const home = {
            teamName: homeTeamObj.team.name as string, // Changed from id to name
            teamId: homeTeamObj.team.id as number,
            score: homeTeamObj.score as number,
          };
          currentPlayedGames.push({
            gamePk,
            away,
            home,
          });
        }
      }

      if (currentPlayedGames.length) {
        return {
          returnType: "in-progress-matches",
          currentPlayedGames,
        } as {
          returnType: "in-progress-matches" | "no-match-in-progress";
          currentPlayedGames: CurrentGame[];
        };
      } else {
        return {
          returnType: "no-match-in-progress",
          currentPlayedGames,
        } as {
          returnType: "in-progress-matches" | "no-match-in-progress";
          currentPlayedGames: CurrentGame[];
        };
      }
    },
    {
      finally: (data) => {
        return data;
      },
    }
  );
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const scoreData = asyncScoreData as {
    returnType: "in-progress-matches" | "no-match-in-progress";
    currentPlayedGames: CurrentGame[];
  };

  const { mount } = useWebView({
    // URL of your web view content
    url: "index.html",

    // Handle messages from web view
    onMessage: (message) => {
      console.log("Received from web view:", message);
    },

    // Cleanup when web view closes
    onUnmount: () => {
      console.log("Web view closed");
    },
  });

  return (
    <vstack width="100%" gap="medium" padding="medium" onPress={mount}>
      {scoreData?.returnType === "no-match-in-progress" && (
        <hstack>No matches for now</hstack>
      )}
      {scoreData?.returnType === "in-progress-matches" && (
        <>
          <hstack
            width="100%"
            height="50%"
            border="thick"
            borderColor="#CC0000" // MLB red
            cornerRadius="medium"
            padding="medium"
            gap="small"
            backgroundColor="#041E42" // MLB navy blue
          >
            <hstack width="40%" alignment="start middle" gap="small">
              <zstack
                width="40px"
                height="40px"
                backgroundColor="#FFFFFF"
                cornerRadius="full"
              >
                {/* Space for away team logo */}
              </zstack>
              <text color="#FFFFFF" weight="bold" size="medium">
                {scoreData.currentPlayedGames[currentGameIndex].away.teamName}
              </text>
            </hstack>

            <hstack width="20%" alignment="center middle">
              <text color="#CC0000" weight="bold" size="xlarge">
                {scoreData.currentPlayedGames[currentGameIndex].away.score}
              </text>
              <text color="#FFFFFF" weight="bold" size="medium">
                {" "}
                -{" "}
              </text>
              <text color="#CC0000" weight="bold" size="xlarge">
                {scoreData.currentPlayedGames[currentGameIndex].home.score}
              </text>
            </hstack>

            <hstack width="40%" alignment="end middle" gap="small">
              <text color="#FFFFFF" weight="bold" size="medium">
                {scoreData.currentPlayedGames[currentGameIndex].home.teamName}
              </text>
              <zstack
                width="40px"
                height="40px"
                backgroundColor="#FFFFFF"
                cornerRadius="full"
              >
                {/* Space for home team logo */}
                <text color="#041E42" weight="bold">
                  {scoreData.currentPlayedGames[currentGameIndex].home.teamId}
                </text>
              </zstack>
            </hstack>
          </hstack>

          <hstack width="100%" alignment="center middle" gap="medium">
            <button
              icon="left"
              appearance="bordered"
              disabled={
                scoreData.currentPlayedGames.length <= 1 ||
                currentGameIndex === 0
              }
              onPress={() => setCurrentGameIndex(currentGameIndex - 1)}
            >
              Previous
            </button>

            <text color="#041E42">
              {currentGameIndex + 1} of {scoreData.currentPlayedGames.length}
            </text>

            <button
              icon="right"
              appearance="bordered"
              disabled={
                scoreData.currentPlayedGames.length <= 1 ||
                currentGameIndex === scoreData.currentPlayedGames.length - 1
              }
              onPress={() => setCurrentGameIndex(currentGameIndex + 1)}
            >
              Next
            </button>
          </hstack>
        </>
      )}
    </vstack>
  );
}

export default Score;

import { Devvit, StateSetter, useAsync, useState } from "@devvit/public-api";
import { getRedisData } from "../utils/utils.js";
import { Loading } from "./Loading.js";

function LeaderBoard({
  setShowLeaderboard,
  context,
}: {
  setShowLeaderboard: StateSetter<boolean>;
  context: Devvit.Context;
}) {
  const [leaderboardStats, setLeaderboardStats] = useState<
    Array<LeaderboardStatsType>
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  /**
   * Gets the user's data from Redis
   * Gets the username and sort the user data based on the streak points
   * Caches the result with a minute of expiry
   */
  useAsync(
    async () => {
      return context.cache(
        async () => {
          const redisData = await getRedisData(context, "application-data");
          if (!redisData) {
            return {};
          }
          return redisData;
        },
        {
          key: "application-data-cache",
          ttl: 60 * 1000, // in milliseconds
        }
      );
    },
    {
      finally: async (data) => {
        if (data && !Object.keys(data).length) {
          return;
        } else {
          const { users } = data as ApplicationData;
          const newLeaderboardStats: LeaderboardStatsType[] = [];
          for (const userId in users) {
            // Uses the userid to get the user info
            const user = await context.reddit.getUserById(userId);
            const userName = user?.username ?? "Unknown";
            const streak = users[userId].quizStreak;
            const progress: Progress = users[userId]?.progress ?? "neutral";
            newLeaderboardStats.push({
              userName: userName || "Username not found",
              streak,
              progress,
            });
          }
          newLeaderboardStats.sort((a, b) => b.streak - a.streak);
          setLeaderboardStats(newLeaderboardStats);
        }
        setLoading(false);
      },
    }
  );

  return (
    <zstack
      width="100%"
      height="100%"
      alignment="middle center"
      backgroundColor="rgba(0, 0, 0, 0.7)"
    >
      {loading ? (
        <Loading />
      ) : (
        <vstack
          width="80%"
          maxHeight="80%"
          backgroundColor="neutral-background"
          cornerRadius="medium"
          border="thin"
          borderColor="neutral-border"
        >
          {/* Header with MLB-inspired colors */}
          <hstack
            padding="small"
            backgroundColor="#002D72"
            cornerRadius="medium"
            alignment="middle"
          >
            <text
              size="xlarge"
              weight="bold"
              color="global-white"
              style="heading"
            >
              🏆 Top Sluggers Leaderboard
            </text>
            <spacer grow />
            <button
              icon="close-fill"
              appearance="plain"
              textColor="global-white"
              onPress={() => setShowLeaderboard(false)}
            />
          </hstack>

          <vstack padding="medium" gap="medium">
            {/* Leaderboard header  */}
            <hstack
              padding="small"
              backgroundColor="#bf0d3e"
              cornerRadius="small"
            >
              <text
                width="10%"
                weight="bold"
                alignment="center"
                color="global-white"
                size="large"
              >
                #
              </text>
              <text width="60%" weight="bold" color="global-white" size="large">
                Player
              </text>
              <text
                width="30%"
                weight="bold"
                alignment="center"
                color="global-white"
                size="large"
              >
                Streak
              </text>
            </hstack>

            {/* Leaderboard entries with improved styling */}
            <vstack height="300px" grow={true}>
              {leaderboardStats &&
                leaderboardStats.map((player, index) => (
                  <hstack
                    padding="small"
                    backgroundColor={
                      index === 0
                        ? "rgba(191, 13, 62, 0.1)" // Light MLB red tint for #1 player
                        : index % 2 === 0
                        ? "neutral-background-weak" // Alternating row color
                        : "neutral-background" // Alternating row color
                    }
                    border={index === 0 ? "thin" : "none"}
                    borderColor={index === 0 ? "#bf0d3e" : ""}
                    cornerRadius={index === 0 ? "small" : "none"}
                  >
                    <text
                      width="10%"
                      alignment="center"
                      color="neutral-content-strong"
                    >
                      {index === 0 ? "👑" : index + 1}
                    </text>
                    <hstack width="60%" gap="small" alignment="middle start">
                      <text
                        weight={index < 3 ? "bold" : "regular"}
                        color="neutral-content-strong"
                      >
                        {player.userName}
                      </text>
                    </hstack>
                    <hstack width="30%" alignment="middle center" gap="small">
                      {(player.progress === "positive" ||
                        player.progress === "neutral") && (
                        <icon
                          name="upvote-fill"
                          color="#bf0d3e" // MLB red for positive trend
                          size="small"
                        />
                      )}
                      {player.progress === "negative" && (
                        <icon
                          name="downvote-fill"
                          color="#002D72" // MLB blue for negative trend
                          size="small"
                        />
                      )}
                      <text
                        weight="bold"
                        color={
                          index === 0 ? "#bf0d3e" : "neutral-content-strong"
                        }
                      >
                        {player.streak}
                      </text>
                    </hstack>
                  </hstack>
                ))}
            </vstack>
          </vstack>
        </vstack>
      )}
    </zstack>
  );
}

export default LeaderBoard;

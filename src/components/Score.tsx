import {
  Devvit,
  useChannel,
  useForm,
  useState,
  useWebView,
} from "@devvit/public-api";
import { getPlayerFact, getTriviaQuestion } from "../utils/openAI.js";
import { webview } from "motion/react-client";
import { isElementAccessExpression } from "typescript";

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

  const [supportingTeamData, setSupportingTeamData] = useState({});
  const supportForm = useForm(
    {
      title: "Message Form",
      fields: [
        {
          type: "paragraph",
          name: "message",
          label: "Enter your message:",
          required: true,
        },
      ],
      acceptLabel: "Submit",
    },
    async (values) => {
      console.log("Message received:", values.message);

      // Get current user and subreddit
      const currentUser = await context.reddit.getCurrentUser();
      const currentSubreddit = await context.reddit.getCurrentSubreddit();

      // Submit the post with the form message
      await context.reddit.submitPost({
        title: `Supporting Team ${supportingTeamData.teamId} for Game ${supportingTeamData.gamePk}`,
        subredditName: currentSubreddit.name,
        preview: (
          <vstack padding="medium" alignment="center middle">
            <text>Loading your support message...</text>
          </vstack>
        ),
        textFallback: {
          text: `Support message from ${currentUser!.username}: ${
            values.message
          }`,
        },
      });

      context.ui.showToast("Your support message has been posted!");
    }
  );

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
        } else if (message && message.type === "matchInfoUsingGamePk") {
          console.log("currentUserBets");
          const { data } = message;
          console.log(data); // TODO: remove in production
          const { gamePk } = data;
          console.log(gamePk); // TODO: remove in production
          const JSONRepsonse = await fetch(
            `https://statsapi.mlb.com/api/v1.1/game/${String(gamePk)}/feed/live`
          );
          if (!JSONRepsonse.ok) {
            webview.postMessage({
              devvitDataType: "match-info-from-gamepk",
              devvitData: {
                success: false,
                results: [],
                error: "failure-in-api-request",
              },
            });
            return;
          }
          const response = await JSONRepsonse.json();

          const matchData = response.gameData;

          if (!matchData || !Object.keys(matchData).length) {
            webview.postMessage({
              devvitDataType: "match-info-from-gamepk",
              devvitData: {
                success: false,
                results: [],
                error: "no-match-data",
              },
            });
            return;
          }
          webview.postMessage({
            devvitDataType: "match-info-from-gamepk",
            devvitData: {
              success: true,
              results: matchData,
              error: null,
            },
          });
          return;
        } else if (message && message.type === "getStreakPoints") {
          console.log("getStreakPoints");
          const userId = String(context.userId);
          const applicationDataJSON = await context.redis.get(
            "application-data"
          );
          if (!applicationDataJSON) {
            webview.postMessage({
              devvitDataType: "streak-points-info",
              devvitData: {
                success: false,
                errorCode: "no-application-data",
                results: {},
              },
            });
            return;
          }
          const applicationData = JSON.parse(applicationDataJSON);
          const response: {
            success?: boolean;
            errorCode?: string | null;
            results?: any;
          } = {};
          console.log(applicationData);
          if (!Object.keys(applicationData).length || !applicationData?.users) {
            response["success"] = false;
            response["errorCode"] = "no-application-data";
            response["results"] = {};
          } else {
            const userData = applicationData["users"][userId];
            response["success"] = true;
            response["errorCode"] = null;
            response["results"] = { ...userData };
          }
          webview.postMessage({
            devvitDataType: "streak-points-info",
            devvitData: response,
          });
          return;
        } else if (message && message.type === "getTriviaQuestion") {
          console.log("getTriviaQuestion");
          const { data } = message;
          console.log(data); // TODO: remove in production

          const { category, language = "english" } = data;
          // const { category, language = "english" } = data;
          console.log("selected question category:");
          console.log(category);
          // ["triviaQuestion", "playerGuess"]
          // When the category received from webview is playerGuess

          // Gets the openAI key
          const openAIKey = (await context.settings.get(
            "open-ai-api-key"
          )) as string;
          if (!openAIKey) {
            webview.postMessage({
              devvitDataType: "trivia-question",
              devvitData: {
                success: false,
                results: {},
                errorCode: "empty-open-ai-key",
              },
            });
            return;
          }

          if (category === "playerGuess") {
            // Length is 93
            const playerNames = [
              "aaronJudge",
              "adleyRutschman",
              "andrewBenintendi",
              "andrésMuñoz",
              "aroldisChapman",
              "austinRiley",
              "boBichette",
              "bryanReynolds",
              "bryceHarper",
              "byronBuxton",
              "camiloDoval",
              "cedricMullins",
              "christianWalker",
              "christianYelich",
              "clayHolmes",
              "codyBellinger",
              "corbinBurnes",
              "corbinCarroll",
              "coreySeager",
              "dansbySwanson",
              "davidBednar",
              "devinWilliams",
              "dylanCease",
              "edwinDíaz",
              "ellyDe",
              "emmanuelClase",
              "eugenioSuárez",
              "fernandoTatis",
              "framberValdez",
              "franciscoLindor",
              "freddieFreeman",
              "félixBautista",
              "garySánchez",
              "georgeKirby",
              "gregorySoto",
              "gunnarHenderson",
              "harrisonBader",
              "ianHapp",
              "jazzChisholm",
              "jhoanDuran",
              "joeMantiply",
              "jordanRomano",
              "joseAltuve",
              "joshBell",
              "joshHader",
              "joséLeclerc",
              "joséRamírez",
              "juanSoto",
              "julioRodríguez",
              "justinVerlander",
              "kenleyJansen",
              "ketelMarte",
              "kevinGausman",
              "kyleTucker",
              "larsNootbaar",
              "liamHendriks",
              "loganWebb",
              "luisCastillo",
              "mannyMachado",
              "mattOlson",
              "maxScherzer",
              "mikeTrout",
              "mookieBetts",
              "oneilCruz",
              "ozzieAlbies",
              "paulGoldschmidt",
              "paulSewald",
              "peteAlonso",
              "placeholderHeadshot",
              "rafaelDevers",
              "raiselIglesias",
              "ryanHelsley",
              "ryanPressly",
              "sandyAlcantara",
              "scottBarlow",
              "shaneBieber",
              "shoheiOhtani",
              "spencerSteer",
              "starlingMarte",
              "stevenKwan",
              "teoscarHernández",
              "tommyEdman",
              "tommyPham",
              "treaTurner",
              "tristonMcKenzie",
              "vladimirGuerrero",
              "walkerBuehler",
              "willSmith",
              "willsonContreras",
              "willyAdames",
              "xanderBogaerts",
              "yordanAlvarez",
              "zackWheeler",
            ];
            console.log("playerNames.length");
            console.log(playerNames.length);

            // Generates a random index b/w 0 and 93
            const randomIndex =
              (Math.floor(Math.random() * 93) + Date.now()) % 93;

            const selectedPlayer = playerNames[randomIndex];
            console.log("selectedPlayer");
            console.log(selectedPlayer);

            const playerQuestion = await getPlayerFact(
              openAIKey,
              selectedPlayer,
              language
            );
            if (!playerQuestion.success) {
              webview.postMessage({
                devvitDataType: "trivia-question",
                devvitData: {
                  success: false,
                  results: {},
                  errorCode: "question-generation-error",
                },
              });
              return;
            }
            webview.postMessage({
              devvitDataType: "trivia-question",
              devvitData: {
                success: true,
                results: playerQuestion,
                errorCode: null,
              },
            });
            return;
          }
          // When the category received from webview is triviaQuestion
          else if (category === "triviaQuestion") {
            const playerQuestion = await getTriviaQuestion(openAIKey, language);
            if (!playerQuestion.success) {
              webview.postMessage({
                devvitDataType: "trivia-question",
                devvitData: {
                  success: false,
                  results: {},
                  errorCode: "question-generation-error",
                },
              });
              return;
            }
            webview.postMessage({
              devvitDataType: "trivia-question",
              devvitData: {
                success: true,
                results: playerQuestion,
                errorCode: null,
              },
            });
            return;
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
    <vstack gap="medium" padding="medium" onPress={mount}>
      <button
        appearance="bordered"
        lightTextColor="white"
        darkTextColor="white"
      >
        {" "}
        🚀 Play Now
      </button>
    </vstack>
  );
}

export default Score;

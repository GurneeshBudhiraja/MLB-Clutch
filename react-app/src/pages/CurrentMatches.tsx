import React, { useEffect, useState } from "react";
import BetModal from "../components/BetModal";
import DatePicker from "../components/DatePicker";
import { motion } from "motion/react";
import LiveGameCard from "../components/LiveGameCard";
import AllGameCard from "../components/AllGameCard";

// const matches: Game[] = [
//   {
//     gamePk: 787943,
//     gameGuid: "9242bcc1-796c-4007-94a1-3bda38737382",
//     link: "/api/v1.1/game/787943/feed/live",
//     gameType: "S",
//     season: "2025",
//     gameDate: "2025-03-25T17:05:00Z",
//     officialDate: "2025-03-25",
//     status: {
//       abstractGameState: "Final",
//       codedGameState: "F",
//       detailedState: "Live",
//       statusCode: "I",
//       startTimeTBD: false,
//       abstractGameCode: "F",
//     },
//     teams: {
//       away: {
//         leagueRecord: { wins: 17, losses: 15, pct: ".531" },
//         score: 3,
//         team: { id: 115, name: "Colorado Rockies", link: "/api/v1/teams/115" },
//         isWinner: false,
//         splitSquad: false,
//         seriesNumber: 32,
//       },
//       home: {
//         leagueRecord: { wins: 13, losses: 15, pct: ".464" },
//         score: 5,
//         team: { id: 142, name: "Minnesota Twins", link: "/api/v1/teams/142" },
//         isWinner: true,
//         splitSquad: false,
//         seriesNumber: 32,
//       },
//     },
//     venue: {
//       id: 2862,
//       name: "Lee Health Sports Complex",
//       link: "/api/v1/venues/2862",
//     },
//     content: { link: "/api/v1/game/787943/content" },
//     isTie: false,
//     gameNumber: 1,
//     publicFacing: true,
//     doubleHeader: "N",
//     gamedayType: "E",
//     tiebreaker: "N",
//     calendarEventID: "14-787943-2025-03-25",
//     seasonDisplay: "2025",
//     dayNight: "day",
//     scheduledInnings: 9,
//     reverseHomeAwayStatus: false,
//     inningBreakLength: 120,
//     gamesInSeries: 1,
//     seriesGameNumber: 1,
//     seriesDescription: "Spring Training",
//     recordSource: "S",
//     ifNecessary: "N",
//     ifNecessaryDescription: "Normal Game",
//   },
//   {
//     gamePk: 803680,
//     gameGuid: "75aff0ec-6fec-439f-99a9-beb01fad7c42",
//     link: "/api/v1.1/game/803680/feed/live",
//     gameType: "S",
//     season: "2025",
//     gameDate: "2025-03-25T17:10:00Z",
//     officialDate: "2025-03-25",
//     status: {
//       abstractGameState: "Final",
//       codedGameState: "F",
//       detailedState: "Live",
//       statusCode: "I",
//       startTimeTBD: false,
//       abstractGameCode: "F",
//     },
//     teams: {
//       away: {
//         leagueRecord: { wins: 14, losses: 14, pct: ".500" },
//         score: 2,
//         team: { id: 147, name: "New York Yankees", link: "/api/v1/teams/147" },
//         isWinner: false,
//         splitSquad: false,
//         seriesNumber: 34,
//       },
//       home: {
//         leagueRecord: { wins: 10, losses: 15, pct: ".400" },
//         score: 4,
//         team: { id: 146, name: "Miami Marlins", link: "/api/v1/teams/146" },
//         isWinner: true,
//         splitSquad: false,
//         seriesNumber: 30,
//       },
//     },
//     venue: { id: 4169, name: "loanDepot park", link: "/api/v1/venues/4169" },
//     content: { link: "/api/v1/game/803680/content" },
//     isTie: false,
//     gameNumber: 1,
//     publicFacing: true,
//     doubleHeader: "N",
//     gamedayType: "P",
//     tiebreaker: "N",
//     calendarEventID: "14-803680-2025-03-25",
//     seasonDisplay: "2025",
//     dayNight: "day",
//     description: "at loanDepot park",
//     scheduledInnings: 9,
//     reverseHomeAwayStatus: false,
//     inningBreakLength: 120,
//     gamesInSeries: 1,
//     seriesGameNumber: 1,
//     seriesDescription: "Spring Training",
//     recordSource: "S",
//     ifNecessary: "N",
//     ifNecessaryDescription: "Normal Game",
//   },
//   {
//     gamePk: 778709,
//     gameGuid: "7bcefc5f-136c-49f0-9db2-28b6a04dadf9",
//     link: "/api/v1.1/game/778709/feed/live",
//     gameType: "S",
//     season: "2025",
//     gameDate: "2025-03-25T18:35:00Z",
//     officialDate: "2025-03-25",
//     status: {
//       abstractGameState: "Final",
//       codedGameState: "F",
//       detailedState: "Final",
//       statusCode: "I",
//       startTimeTBD: false,
//       abstractGameCode: "F",
//     },
//     teams: {
//       away: {
//         leagueRecord: { wins: 20, losses: 12, pct: ".625" },
//         score: 3,
//         team: {
//           id: 118,
//           name: "Kansas City Royals",
//           link: "/api/v1/teams/118",
//         },
//         isWinner: true,
//         splitSquad: false,
//         seriesNumber: 31,
//       },
//       home: {
//         leagueRecord: { wins: 14, losses: 16, pct: ".467" },
//         score: 1,
//         team: { id: 140, name: "Texas Rangers", link: "/api/v1/teams/140" },
//         isWinner: false,
//         splitSquad: false,
//         seriesNumber: 31,
//       },
//     },
//     venue: { id: 5325, name: "Globe Life Field", link: "/api/v1/venues/5325" },
//     content: { link: "/api/v1/game/778709/content" },
//     isTie: false,
//     gameNumber: 1,
//     publicFacing: true,
//     doubleHeader: "N",
//     gamedayType: "P",
//     tiebreaker: "N",
//     calendarEventID: "14-778709-2025-03-25",
//     seasonDisplay: "2025",
//     dayNight: "day",
//     description: "at Globe Life Field",
//     scheduledInnings: 9,
//     reverseHomeAwayStatus: false,
//     inningBreakLength: 120,
//     gamesInSeries: 3,
//     seriesGameNumber: 3,
//     seriesDescription: "Spring Training",
//     recordSource: "S",
//     ifNecessary: "N",
//     ifNecessaryDescription: "Normal Game",
//   },
//   {
//     gamePk: 787931,
//     gameGuid: "e844ec96-cef5-4c28-96fd-516209f0d883",
//     link: "/api/v1.1/game/787931/feed/live",
//     gameType: "S",
//     season: "2025",
//     gameDate: "2025-03-25T19:40:00Z",
//     officialDate: "2025-03-25",
//     status: {
//       abstractGameState: "Final",
//       codedGameState: "F",
//       detailedState: "Final",
//       statusCode: "F",
//       startTimeTBD: false,
//       abstractGameCode: "F",
//     },
//     teams: {
//       away: {
//         leagueRecord: { wins: 13, losses: 18, pct: ".419" },
//         score: 3,
//         team: {
//           id: 114,
//           name: "Cleveland Guardians",
//           link: "/api/v1/teams/114",
//         },
//         isWinner: true,
//         splitSquad: false,
//         seriesNumber: 31,
//       },
//       home: {
//         leagueRecord: { wins: 17, losses: 14, pct: ".548" },
//         score: 2,
//         team: {
//           id: 109,
//           name: "Arizona Diamondbacks",
//           link: "/api/v1/teams/109",
//         },
//         isWinner: false,
//         splitSquad: false,
//         seriesNumber: 34,
//       },
//     },
//     venue: { id: 15, name: "Chase Field", link: "/api/v1/venues/15" },
//     content: { link: "/api/v1/game/787931/content" },
//     isTie: false,
//     gameNumber: 1,
//     publicFacing: true,
//     doubleHeader: "N",
//     gamedayType: "P",
//     tiebreaker: "N",
//     calendarEventID: "14-787931-2025-03-25",
//     seasonDisplay: "2025",
//     dayNight: "day",
//     description: "at Chase Field",
//     scheduledInnings: 9,
//     reverseHomeAwayStatus: false,
//     inningBreakLength: 120,
//     gamesInSeries: 2,
//     seriesGameNumber: 2,
//     seriesDescription: "Spring Training",
//     recordSource: "S",
//     ifNecessary: "N",
//     ifNecessaryDescription: "Normal Game",
//   },
//   {
//     gamePk: 778748,
//     gameGuid: "957a78eb-9d28-464b-9ed9-809f076d3106",
//     link: "/api/v1.1/game/778748/feed/live",
//     gameType: "S",
//     season: "2025",
//     gameDate: "2025-03-25T20:05:00Z",
//     officialDate: "2025-03-25",
//     status: {
//       abstractGameState: "Final",
//       codedGameState: "F",
//       detailedState: "Final",
//       statusCode: "F",
//       startTimeTBD: false,
//       abstractGameCode: "F",
//     },
//     teams: {
//       away: {
//         leagueRecord: { wins: 13, losses: 13, pct: ".500" },
//         score: 2,
//         team: { id: 144, name: "Atlanta Braves", link: "/api/v1/teams/144" },
//         isWinner: false,
//         splitSquad: false,
//         seriesNumber: 30,
//       },
//       home: {
//         leagueRecord: { wins: 12, losses: 9, pct: ".571" },
//         score: 4,
//         team: { id: 112, name: "Chicago Cubs", link: "/api/v1/teams/112" },
//         isWinner: true,
//         splitSquad: false,
//         seriesNumber: 23,
//       },
//     },
//     venue: { id: 4629, name: "Sloan Park", link: "/api/v1/venues/4629" },
//     content: { link: "/api/v1/game/778748/content" },
//     isTie: false,
//     gameNumber: 1,
//     publicFacing: true,
//     doubleHeader: "N",
//     gamedayType: "Y",
//     tiebreaker: "N",
//     calendarEventID: "14-778748-2025-03-25",
//     seasonDisplay: "2025",
//     dayNight: "day",
//     scheduledInnings: 9,
//     reverseHomeAwayStatus: false,
//     inningBreakLength: 120,
//     gamesInSeries: 2,
//     seriesGameNumber: 2,
//     seriesDescription: "Spring Training",
//     recordSource: "S",
//     ifNecessary: "N",
//     ifNecessaryDescription: "Normal Game",
//   },
//   {
//     gamePk: 796341,
//     gameGuid: "a8f2eb03-f84e-4d19-8365-70d0b406abd4",
//     link: "/api/v1.1/game/796341/feed/live",
//     gameType: "E",
//     season: "2025",
//     gameDate: "2025-03-25T22:10:00Z",
//     officialDate: "2025-03-25",
//     status: {
//       abstractGameState: "Final",
//       codedGameState: "F",
//       detailedState: "Final",
//       statusCode: "F",
//       startTimeTBD: false,
//       abstractGameCode: "F",
//     },
//     teams: {
//       away: {
//         leagueRecord: { wins: 1, losses: 0, pct: "1.000" },
//         score: 7,
//         team: { id: 459, name: "Dayton Dragons", link: "/api/v1/teams/459" },
//         isWinner: true,
//         splitSquad: false,
//       },
//       home: {
//         leagueRecord: { wins: 0, losses: 1, pct: ".000" },
//         score: 5,
//         team: { id: 113, name: "Cincinnati Reds", link: "/api/v1/teams/113" },
//         isWinner: false,
//         splitSquad: false,
//       },
//     },
//     venue: { id: 2766, name: "Day Air Ballpark", link: "/api/v1/venues/2766" },
//     content: { link: "/api/v1/game/796341/content" },
//     isTie: false,
//     gameNumber: 1,
//     publicFacing: true,
//     doubleHeader: "N",
//     gamedayType: "Y",
//     tiebreaker: "N",
//     calendarEventID: "14-796341-2025-03-25",
//     seasonDisplay: "2025",
//     dayNight: "night",
//     description: "in Dayton, OH",
//     scheduledInnings: 9,
//     reverseHomeAwayStatus: false,
//     inningBreakLength: 120,
//     seriesDescription: "Exhibition",
//     recordSource: "S",
//     ifNecessary: "N",
//     ifNecessaryDescription: "Normal Game",
//   },
//   {
//     gamePk: 794289,
//     gameGuid: "23f680c7-6f65-4fcf-ad32-6d47d1f04386",
//     link: "/api/v1.1/game/794289/feed/live",
//     gameType: "E",
//     season: "2025",
//     gameDate: "2025-03-25T23:10:00Z",
//     officialDate: "2025-03-25",
//     status: {
//       abstractGameState: "Final",
//       codedGameState: "F",
//       detailedState: "Final",
//       statusCode: "F",
//       startTimeTBD: false,
//       abstractGameCode: "F",
//     },
//     teams: {
//       away: {
//         leagueRecord: { wins: 0, losses: 2, pct: ".000" },
//         score: 8,
//         team: {
//           id: 562,
//           name: "Sultanes de Monterrey",
//           link: "/api/v1/teams/562",
//         },
//         isWinner: false,
//         splitSquad: false,
//       },
//       home: {
//         leagueRecord: { wins: 3, losses: 0, pct: "1.000" },
//         score: 12,
//         team: { id: 111, name: "Boston Red Sox", link: "/api/v1/teams/111" },
//         isWinner: true,
//         splitSquad: false,
//       },
//     },
//     venue: {
//       id: 2701,
//       name: "Estadio Mobil Super",
//       link: "/api/v1/venues/2701",
//     },
//     content: { link: "/api/v1/game/794289/content" },
//     isTie: false,
//     gameNumber: 1,
//     publicFacing: true,
//     doubleHeader: "N",
//     gamedayType: "E",
//     tiebreaker: "N",
//     calendarEventID: "14-794289-2025-03-25",
//     seasonDisplay: "2025",
//     dayNight: "night",
//     description: "in Monterrey, MX",
//     scheduledInnings: 9,
//     reverseHomeAwayStatus: false,
//     inningBreakLength: 120,
//     seriesDescription: "Exhibition",
//     recordSource: "S",
//     ifNecessary: "N",
//     ifNecessaryDescription: "Normal Game",
//   },
//   {
//     gamePk: 789323,
//     gameGuid: "9099843f-d057-43a3-b49a-ce223b41c82d",
//     link: "/api/v1.1/game/789323/feed/live",
//     gameType: "S",
//     season: "2025",
//     gameDate: "2025-03-26T00:05:00Z",
//     officialDate: "2025-03-25",
//     status: {
//       abstractGameState: "Final",
//       codedGameState: "F",
//       detailedState: "Final",
//       statusCode: "F",
//       startTimeTBD: false,
//       abstractGameCode: "F",
//     },
//     teams: {
//       away: {
//         leagueRecord: { wins: 12, losses: 15, pct: ".444" },
//         score: 3,
//         team: { id: 116, name: "Detroit Tigers", link: "/api/v1/teams/116" },
//         isWinner: false,
//         splitSquad: false,
//         seriesNumber: 31,
//       },
//       home: {
//         leagueRecord: { wins: 21, losses: 6, pct: ".778" },
//         score: 4,
//         team: {
//           id: 137,
//           name: "San Francisco Giants",
//           link: "/api/v1/teams/137",
//         },
//         isWinner: true,
//         splitSquad: false,
//         seriesNumber: 31,
//       },
//     },
//     venue: { id: 2395, name: "Oracle Park", link: "/api/v1/venues/2395" },
//     content: { link: "/api/v1/game/789323/content" },
//     isTie: false,
//     gameNumber: 1,
//     publicFacing: true,
//     doubleHeader: "N",
//     gamedayType: "P",
//     tiebreaker: "N",
//     calendarEventID: "14-789323-2025-03-25",
//     seasonDisplay: "2025",
//     dayNight: "night",
//     description: "at Oracle Park",
//     scheduledInnings: 9,
//     reverseHomeAwayStatus: false,
//     inningBreakLength: 120,
//     gamesInSeries: 2,
//     seriesGameNumber: 2,
//     seriesDescription: "Spring Training",
//     recordSource: "S",
//     ifNecessary: "N",
//     ifNecessaryDescription: "Normal Game",
//   },
//   {
//     gamePk: 787928,
//     gameGuid: "a1ce4355-4b29-429b-a514-e7d61e714832",
//     link: "/api/v1.1/game/787928/feed/live",
//     gameType: "E",
//     season: "2025",
//     gameDate: "2025-03-26T00:10:00Z",
//     officialDate: "2025-03-25",
//     status: {
//       abstractGameState: "Final",
//       codedGameState: "F",
//       detailedState: "Final",
//       statusCode: "F",
//       startTimeTBD: false,
//       abstractGameCode: "F",
//     },
//     teams: {
//       away: {
//         leagueRecord: { wins: 1, losses: 1, pct: ".500" },
//         score: 7,
//         team: {
//           id: 5434,
//           name: "Sugar Land Space Cowboys",
//           link: "/api/v1/teams/5434",
//         },
//         isWinner: true,
//         splitSquad: false,
//       },
//       home: {
//         leagueRecord: { wins: 1, losses: 1, pct: ".500" },
//         score: 6,
//         team: { id: 117, name: "Houston Astros", link: "/api/v1/teams/117" },
//         isWinner: false,
//         splitSquad: false,
//       },
//     },
//     venue: { id: 2392, name: "Daikin Park", link: "/api/v1/venues/2392" },
//     content: { link: "/api/v1/game/787928/content" },
//     isTie: false,
//     gameNumber: 1,
//     publicFacing: true,
//     doubleHeader: "N",
//     gamedayType: "P",
//     tiebreaker: "N",
//     calendarEventID: "14-787928-2025-03-25",
//     seasonDisplay: "2025",
//     dayNight: "night",
//     scheduledInnings: 9,
//     reverseHomeAwayStatus: false,
//     inningBreakLength: 120,
//     seriesDescription: "Exhibition",
//     recordSource: "S",
//     ifNecessary: "N",
//     ifNecessaryDescription: "Normal Game",
//   },
//   {
//     gamePk: 787997,
//     gameGuid: "b349080f-39a5-488d-be13-88a1fc735abe",
//     link: "/api/v1.1/game/787997/feed/live",
//     gameType: "S",
//     season: "2025",
//     gameDate: "2025-03-26T01:07:00Z",
//     officialDate: "2025-03-25",
//     status: {
//       abstractGameState: "Final",
//       codedGameState: "F",
//       detailedState: "Final",
//       statusCode: "F",
//       startTimeTBD: false,
//       abstractGameCode: "F",
//     },
//     teams: {
//       away: {
//         leagueRecord: { wins: 14, losses: 9, pct: ".609" },
//         score: 4,
//         team: {
//           id: 119,
//           name: "Los Angeles Dodgers",
//           link: "/api/v1/teams/119",
//         },
//         isWinner: true,
//         splitSquad: false,
//         seriesNumber: 20,
//       },
//       home: {
//         leagueRecord: { wins: 11, losses: 18, pct: ".379" },
//         score: 1,
//         team: {
//           id: 108,
//           name: "Los Angeles Angels",
//           link: "/api/v1/teams/108",
//         },
//         isWinner: false,
//         splitSquad: false,
//         seriesNumber: 32,
//       },
//     },
//     venue: { id: 1, name: "Angel Stadium", link: "/api/v1/venues/1" },
//     content: { link: "/api/v1/game/787997/content" },
//     isTie: false,
//     gameNumber: 1,
//     publicFacing: true,
//     doubleHeader: "N",
//     gamedayType: "P",
//     tiebreaker: "N",
//     calendarEventID: "14-787997-2025-03-25",
//     seasonDisplay: "2025",
//     dayNight: "night",
//     description: "at Angel Stadium",
//     scheduledInnings: 9,
//     reverseHomeAwayStatus: false,
//     inningBreakLength: 120,
//     gamesInSeries: 3,
//     seriesGameNumber: 3,
//     seriesDescription: "Spring Training",
//     recordSource: "S",
//     ifNecessary: "N",
//     ifNecessaryDescription: "Normal Game",
//   },
// ];

function CurrentMatches({ assetsLinks }: { assetsLinks: AssetLinks }) {
  const [mlbMatches, setMLBMatches] = React.useState<Game[]>([]);
  // const [mlbMatches, setMLBMatches] = React.useState<Game[]>(matches);
  const [date, setDate] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showBetModal, setShowBetModal] = useState<boolean>(false);
  const [selectedMatch, setSelectedMatch] = useState<number>(-1);
  const [redisUserInfo, setRedisUserInfo] = useState<Record<string, any>>({});
  const [liveMatches, setLiveMatches] = useState<any>([]);

  useEffect(() => {
    setLoading(true);
    if (!date) {
      const newDate = new Date();
      const [month, date, year] = newDate
        .toLocaleDateString()
        .split("/") as string[];
      const currentDate = [year, month.padStart(2, "0"), date].join("-");
      setDate(currentDate);
    }

    // Gets the streak points from the Devvit
    window.parent.postMessage(
      {
        type: "userRedisInfo",
      },
      "*"
    );

    window.addEventListener("message", (event) => {
      console.log("Message has been received");
      console.log(event.data.type);
      console.log(event.data.data);
      if (event.data.type === "devvit-message") {
        const { data } = event.data;
        console.log(data);
        const { message } = data;
        console.log(message);
        if (message.devvitDataType === "match-info") {
          console.log(message.devvitData);
          const { errorCode, success, results } = message.devvitData;
          console.log(errorCode);
          console.log(success);
          if (success) {
            setMLBMatches(results);
          } else {
            // TODO: implement better error handling
            console.log("Error code:");
            console.log(errorCode);
          }
        } else if (message.devvitDataType === "streak-points-info") {
          const { errorCode, success, results } = message.devvitData;
          console.log(errorCode);
          console.log(success);
          console.log(results);
          if (success) {
            setRedisUserInfo(results);
          } else {
            console.log("Error in getUserStreak");
          }
        }
      }
      setLoading(false);
    });
    return () => setLoading(true);
  }, []);

  useEffect(() => {
    setLoading(true);
    // Gets the live matches result from the Devvit
    window.parent.postMessage(
      {
        type: "getMatches",
        data: {
          date,
          matchFilter: "live",
        },
      },
      "*"
    );
  }, [date]);

  useEffect(() => {
    setLiveMatches(
      mlbMatches.filter((match) => match.status.statusCode === "I")
    );
  }, [mlbMatches]);

  return (
    <div className="p-4 relative h-full ">
      <div className="w-full flex justify-end">
        <DatePicker setDate={setDate} />
      </div>
      {loading && (
        <div className="flex justify-center items-center h-full">
          <img
            src={assetsLinks["loader"]}
            alt="Loading..."
            className="w-40 h-40"
          />
        </div>
      )}

      {!loading && mlbMatches.length ? (
        <>
          {
            /**
             * Shows the live matches
             */
            <motion.div
              className="max-w-5xl mx-auto justify-center items-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-4 my-2 max-w-xl md:max-w-6xl mx-auto">
                <span className="h-[1px] bg-gray-500 flex-grow" />
                <div className="text-gray-300 font-medium">Ongoing Matches</div>
                <span className="h-[1px] bg-gray-500 flex-grow" />
              </div>

              <div className="mb-4 w-full overflow-x-auto snap-x snap-mandatory flex gap-3 scroll-smooth px-2 no-scrollbar">
                {liveMatches.length ? (
                  liveMatches.map((match: Game) => {
                    const awayTeam = match.teams.away;
                    const homeTeam = match.teams.home;

                    return (
                      <LiveGameCard
                        key={match.gamePk}
                        gamePk={match.gamePk}
                        detailedState={match.status.detailedState}
                        awayTeamURL={
                          assetsLinks[
                            String(awayTeam.team.id) as AssertLinksProperties
                          ]
                        }
                        awayTeamScore={awayTeam.score}
                        awayTeamName={awayTeam.team.name}
                        homeTeamURL={
                          assetsLinks[
                            String(homeTeam.team.id) as AssertLinksProperties
                          ]
                        }
                        homeTeamName={homeTeam.team.name}
                        homeTeamScore={homeTeam.score}
                        isHomeTeamWinner={homeTeam.isWinner}
                        gameDate={match.gameDate}
                        seriesDescription={match.seriesDescription ?? ""}
                        timeOfTheDay={match.dayNight}
                        venueName={match.venue.name}
                      />
                    );
                  })
                ) : (
                  <NoScheduledMatches
                    text="No Live Matches"
                    subText="Catch the action once the games go live!"
                  />
                )}
              </div>
            </motion.div>
          }

          {/**
           * Shows all the matches for the selected date
           * */}
          {!showBetModal && (
            <div className="max-w-xl md:max-w-6xl mx-auto">
              <div className="flex items-center gap-4 my-4">
                <span className="h-[1px] bg-gray-500 flex-grow" />
                <div className="text-gray-300 font-medium">All Matches</div>
                <span className="h-[1px] bg-gray-500 flex-grow" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {mlbMatches.map((match, index) => (
                  <AllGameCard
                    onClick={() => {
                      setSelectedMatch(match.gamePk);
                      setShowBetModal(true);
                    }}
                    key={index}
                    gamePk={match.gamePk}
                    awayTeamName={match.teams.away.team.name}
                    awayTeamURL={
                      assetsLinks[
                        String(
                          match.teams.away.team.id
                        ) as AssertLinksProperties
                      ] ?? assetsLinks["teamPlaceholder"]
                    }
                    homeTeamName={match.teams.home.team.name}
                    homeTeamURL={
                      assetsLinks[
                        String(
                          match.teams.home.team.id
                        ) as AssertLinksProperties
                      ] ?? assetsLinks["teamPlaceholder"]
                    }
                    seriesDescription={match.seriesDescription}
                    status={match.status.detailedState}
                    officialDate={match.officialDate}
                    venue={match.venue.name}
                  />
                ))}
              </div>
            </div>
          )}
          {showBetModal && (
            <BetModal
              gamePk={selectedMatch}
              setShowBetModal={setShowBetModal}
              redisUserInfo={redisUserInfo}
              assetLinks={assetsLinks}
            />
          )}
        </>
      ) : !loading ? (
        <NoScheduledMatches
          text="No Games Today"
          subText="Check back tomorrow for more MLB action!"
        />
      ) : (
        <></>
      )}
    </div>
  );
}

// Placeholder div when no data is available
function NoScheduledMatches({
  text,
  subText,
}: {
  text: string;
  subText: string;
}) {
  /**
   * Component to render when there are no matches scheduled
   */
  return (
    <motion.div
      className="w-full border border-theme-white border-dashed rounded-lg p-4 text-center text-theme-white opacity-80 max-w-lg mx-auto mt-2"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <p className="text-lg font-semibold">{text}</p>
      <p className="text-sm mt-1">{subText}</p>
    </motion.div>
  );
}

export default CurrentMatches;

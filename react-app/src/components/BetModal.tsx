// @ts-nocheck
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const BetModal = ({
  gamePk,
  setShowBetModal,
  redisUserInfo,
  assetLinks,
}: {
  gamePk: number;
  setShowBetModal: React.Dispatch<React.SetStateAction<boolean>>;
  redisUserInfo: Record<string, any>;
  assetLinks: AssetLinks;
}) => {
  const [selectedTeam, setSelectedTeam] = useState<"away" | "home" | null>(
    null
  );
  const [betAmount, setBetAmount] = useState(0);
  const [matchDetails, setMatchDetails] = useState({});
  const [loading, setLoading] = useState<boolean>(true);

  // async function submitBet() {
  //   console.log("Submitting post message");
  //   await window.parent.postMessage(
  //     {
  //       type: "betsDataUpdate",
  //       data: {
  //         matchId: match.gamePk,
  //         selectedTeam,
  //         date: match.officialDate,
  //         betAmount,
  //       },
  //     },
  //     "*"
  //   );
  // }

  useEffect(() => {
    window.parent.postMessage(
      {
        type: "matchInfoUsingGamePk",
        data: {
          gamePk,
        },
      },
      "*"
    );

    window.addEventListener("message", (event) => {
      const { message } = event.data.data;
      console.log(message);
      if (!message.devvitData.success) {
        setLoading(false);
        setShowBetModal(false);
        console.log("Something went wrong.");
      } else {
        const { results } = message.devvitData;
        console.log(results);
        setMatchDetails(results);
      }
      setLoading(false);
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 backdrop-blur-sm overflow-scroll"
      onClick={() => setShowBetModal(false)}
    >
      {loading ? (
        <>
          <img
            src={assetLinks["loader"]}
            className="h-40 w-40 md:h-48 md:w-48"
          />
        </>
      ) : (
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="bg-gradient-to-br from-theme-blue to-theme-red rounded-xl p-6 w-full max-w-md shadow-2xl relative h-3/4 md:h-fit overflow-scroll"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-bold text-theme-white">
                Game Overview
              </h2>
              <p className="text-sm text-theme-white mt-1">
                {matchDetails.status.detailedState} •{" "}
                {matchDetails.weather.condition}
              </p>
            </div>
            <button
              onClick={() => setShowBetModal(false)}
              className="text-theme-white "
            >
              ✕
            </button>
          </div>

          {/* Teams Section */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {["away", "home"].map((teamType) => (
              <div
                key={teamType}
                className={`cursor-pointer p-4 rounded-lg transition-all ${
                  matchDetails.status.abstractGameState !== "Final" &&
                  selectedTeam === teamType
                    ? "border-2 border-theme-red bg-theme-blue/30"
                    : "border-2 border-transparent hover:bg-theme-blue/20"
                }`}
                onClick={() => setSelectedTeam(teamType)}
              >
                <div className="flex flex-col items-center">
                  <img
                    src={
                      assetLinks[String(matchDetails.teams[teamType].id)] ??
                      assetLinks["teamPlaceholder"]
                    }
                    // src={`https://www.mlbstatic.com/team-logos/${match.teams[teamType].id}.svg`}
                    className="w-16 h-16 mb-2 object-contain"
                    alt={matchDetails.teams[teamType].teamName}
                  />
                  <h3 className="text-lg font-bold text-white">
                    {matchDetails.teams[teamType].abbreviation}
                  </h3>
                  <p className="text-theme-white font-digital text-2xl">
                    {matchDetails.teams[teamType].record?.wins}-
                    {matchDetails.teams[teamType].record?.losses}
                  </p>
                  <div className="mt-2 text-center">
                    <p className="text-xs text-theme-white">
                      {matchDetails.teams[teamType].springLeague?.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Game Info */}
          <div className="bg-theme-blue/30 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-theme-white">First Pitch</p>
                <p className="text-white font-medium">
                  {new Date(matchDetails.datetime.dateTime)?.toLocaleTimeString(
                    "en-US",
                    {
                      hour: "numeric",
                      minute: "2-digit",
                    }
                  )}
                </p>
              </div>
              <div>
                <p className="text-theme-white/70">Duration</p>
                {matchDetails.gameInfo.gameDurationMinutes ? (
                  <p className="text-theme-white font-medium">
                    <span>
                      {isNaN(
                        Math.floor(
                          matchDetails.gameInfo.gameDurationMinutes / 60
                        )
                      )
                        ? "--h"
                        : Math.floor(
                            matchDetails.gameInfo.gameDurationMinutes / 60
                          )}
                      h{" "}
                    </span>
                    <span>
                      {isNaN(matchDetails.gameInfo.gameDurationMinutes % 60)
                        ? "--"
                        : matchDetails.gameInfo.gameDurationMinutes % 60}
                    </span>
                  </p>
                ) : (
                  <p className="text-theme-white font-medium">--h --</p>
                )}
              </div>
              <div>
                <p className="text-theme-white">Venue</p>
                <p
                  className="text-white font-medium truncate"
                  title={matchDetails.venue.name}
                >
                  {matchDetails.venue.name}
                </p>
              </div>
              <div>
                <p className="text-theme-white">Attendance</p>
                <p className="text-white font-medium">
                  {matchDetails.gameInfo.attendance?.toLocaleString() ?? "n/a"}
                </p>
              </div>
              <div>
                <p className="text-theme-white">Weather</p>
                {matchDetails?.weather?.temp ? (
                  <p className="text-white font-medium">
                    {matchDetails.weather.temp}°F, {matchDetails.weather.wind}
                  </p>
                ) : (
                  <p className="text-white font-medium">n/a</p>
                )}
              </div>
              <div>
                <p className="text-theme-white">Field</p>
                <p className="text-white font-medium">
                  {matchDetails.venue.fieldInfo.turfType} ·{" "}
                  {matchDetails.venue.fieldInfo.roofType}
                </p>
              </div>
            </div>
          </div>

          {/* Pitching Status */}
          <div className="bg-theme-blue/30 rounded-lg p-4 mb-6">
            <h3 className="text-theme-white text-sm font-bold mb-2">
              Pitching Status
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-theme-white">No-hitter</p>
                <p
                  className={
                    matchDetails.flags.noHitter
                      ? "text-theme-red"
                      : "text-white"
                  }
                >
                  {matchDetails.flags.noHitter ? "Active" : "None"}
                </p>
              </div>
              <div>
                <p className="text-theme-white">Perfect Game</p>
                <p
                  className={
                    matchDetails.flags.perfectGame
                      ? "text-theme-red"
                      : "text-theme-white"
                  }
                >
                  {matchDetails.flags.perfectGame ? "Active" : "None"}
                </p>
              </div>
            </div>
          </div>

          {/* Betting Controls */}
          {selectedTeam && (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-4">
                {/* ... (existing betting controls) ... */}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default BetModal;

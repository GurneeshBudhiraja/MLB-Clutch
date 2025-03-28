import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const BetModal = ({
  gamePk,
  setShowBetModal,
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
  const [matchDetails, setMatchDetails] = useState({});
  const [loading, setLoading] = useState<boolean>(true);

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

    return () => {
      setLoading(true);
      setMatchDetails({});
      setSelectedTeam(null);
    };
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
          className="bg-gradient-to-br from-theme-blue to-theme-red rounded-xl p-6 w-full max-w-md shadow-2xl relative h-3/4 md:h-h-4/5 overflow-scroll"
          // @ts-expect-error Types issue
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-bold text-theme-white">
                Game Overview
              </h2>
              <p className="text-sm text-theme-white mt-1">
                {/* @ts-expect-error Types issue */}
                {matchDetails.status.detailedState} •{" "}
                {/* @ts-expect-error Types issue */}
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
                className={`p-4 rounded-lg transition-all ${
                  // @ts-expect-error Types issue
                  matchDetails.status.abstractGameState !== "Final" &&
                  selectedTeam === teamType
                    ? "border-2 border-theme-red bg-theme-blue/30 cursor-pointer "
                    : "border-2 border-transparent hover:bg-theme-blue/20 cursor-pointer "
                }`}
                onClick={() => {
                  // @ts-expect-error Types issue
                  if (matchDetails.status.abstractGameState === "Final") return;
                  // @ts-expect-error Types issue
                  setSelectedTeam(teamType);
                }}
              >
                <div className="flex flex-col items-center">
                  <img
                    src={
                      // @ts-expect-error Types issue
                      assetLinks[String(matchDetails.teams[teamType].id)] ??
                      assetLinks["teamPlaceholder"]
                    }
                    // src={`https://www.mlbstatic.com/team-logos/${match.teams[teamType].id}.svg`}
                    className="w-16 h-16 mb-2 object-contain"
                    // @ts-expect-error Types issue
                    alt={matchDetails.teams[teamType].teamName}
                  />
                  <h3 className="text-lg font-bold text-white">
                    {/* @ts-expect-error Types issue  */}
                    {matchDetails.teams[teamType].abbreviation}
                  </h3>
                  <p className="text-theme-white font-digital text-2xl">
                    {/* @ts-expect-error Types issue  */}
                    {matchDetails.teams[teamType].record?.wins}-
                    {/* @ts-expect-error Types issue  */}
                    {matchDetails.teams[teamType].record?.losses}
                  </p>
                  <div className="mt-2 text-center">
                    <p className="text-xs text-theme-white">
                      {/* @ts-expect-error Types issue */}
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
                  {/* @ts-expect-error Types issue  */}
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
                {/* @ts-expect-error Types issue  */}
                {matchDetails.gameInfo.gameDurationMinutes ? (
                  <p className="text-theme-white font-medium">
                    <span>
                      {isNaN(
                        Math.floor(
                          // @ts-expect-error Types issue
                          matchDetails.gameInfo.gameDurationMinutes / 60
                        )
                      )
                        ? "--h"
                        : Math.floor(
                            // @ts-expect-error Types issue
                            matchDetails.gameInfo.gameDurationMinutes / 60
                          )}
                      h{" "}
                    </span>
                    <span>
                      {/* @ts-expect-error Types issue  */}
                      {isNaN(matchDetails.gameInfo.gameDurationMinutes % 60)
                        ? "--"
                        : // @ts-expect-error Types issue
                          matchDetails.gameInfo.gameDurationMinutes % 60}
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
                  // @ts-expect-error Types issue
                  title={matchDetails.venue.name}
                >
                  {/* @ts-expect-error Types issue  */}
                  {matchDetails.venue.name}
                </p>
              </div>
              <div>
                <p className="text-theme-white">Attendance</p>
                <p className="text-white font-medium">
                  {/* @ts-expect-error Types issue  */}
                  {matchDetails.gameInfo.attendance?.toLocaleString() ?? "n/a"}
                </p>
              </div>
              <div>
                <p className="text-theme-white">Weather</p>
                {/* @ts-expect-error Types issue  */}
                {matchDetails?.weather?.temp ? (
                  <p className="text-white font-medium">
                    {/* @ts-expect-error Types issue  */}
                    {matchDetails.weather.temp}°F, {matchDetails.weather.wind}
                  </p>
                ) : (
                  <p className="text-white font-medium">n/a</p>
                )}
              </div>
              <div>
                <p className="text-theme-white">Field</p>
                <p className="text-white font-medium">
                  {/* @ts-expect-error Types issue  */}
                  {matchDetails.venue.fieldInfo.turfType} ·{" "}
                  {/* @ts-expect-error Types issue  */}
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
                    // @ts-expect-error Types issue
                    matchDetails.flags.noHitter
                      ? "text-theme-red"
                      : "text-white"
                  }
                >
                  {/* @ts-expect-error Types issue  */}
                  {matchDetails.flags.noHitter ? "Active" : "None"}
                </p>
              </div>
              <div>
                <p className="text-theme-white">Perfect Game</p>
                <p
                  className={
                    // @ts-expect-error Types issue
                    matchDetails.flags.perfectGame
                      ? "text-theme-red"
                      : "text-theme-white"
                  }
                >
                  {/* @ts-expect-error Types issue  */}
                  {matchDetails.flags.perfectGame ? "Active" : "None"}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default BetModal;

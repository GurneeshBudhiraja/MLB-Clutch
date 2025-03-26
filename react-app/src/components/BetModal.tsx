// @ts-nocheck
import React, { useState } from "react";

const BetModal = ({
  match,
  setShowBetModal,
  redisUserInfo,
}: {
  match: Record<string, any>;
  setShowBetModal: React.Dispatch<React.SetStateAction<boolean>>;
  redisUserInfo: Record<string, any>;
}) => {
  const [selectedTeam, setSelectedTeam] = useState<"away" | "home" | null>(
    null
  );
  const [betAmount, setBetAmount] = useState(0);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-lg p-6 w-full max-w-md text-white">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Match Details</h2>
          <button
            onClick={() => setShowBetModal(false)}
            className="text-gray-300 hover:text-white"
          >
            ×
          </button>
        </div>

        {/* Teams Section */}
        <div className="flex justify-between gap-4 mb-6">
          <div
            className={`flex-1 text-center p-2 cursor-pointer ${
              selectedTeam === "away" ? "bg-blue-600" : "hover:bg-slate-700"
            } rounded`}
            onClick={() => setSelectedTeam("away")}
          >
            <h3 className="font-semibold text-white">
              {match.teams.away.team.name}
            </h3>
            <p className="text-2xl text-white">{match.teams.away.score}</p>
          </div>

          <div className="self-center text-gray-300">VS</div>

          <div
            className={`flex-1 text-center p-2 cursor-pointer ${
              selectedTeam === "home" ? "bg-blue-600" : "hover:bg-slate-700"
            } rounded`}
            onClick={() => setSelectedTeam("home")}
          >
            <h3 className="font-semibold text-white">
              {match.teams.home.team.name}
            </h3>
            <p className="text-2xl text-white">{match.teams.home.score}</p>
          </div>
        </div>

        {/* Match Info */}
        <div className="space-y-2 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-300">Status:</span>
            <span className="text-white">{match.status.detailedState}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Venue:</span>
            <span className="text-white">{match.venue.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Date:</span>
            <span className="text-white">
              {new Date(match.gameDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>

        {/* Betting Section */}
        {selectedTeam && (
          <div className="border-t border-gray-600 pt-4">
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setBetAmount((prev) => Math.max(0, prev - 1))}
                className="px-3 py-1 bg-slate-700 text-white rounded hover:bg-slate-600"
                disabled={betAmount > redisUserInfo.quizStreak}
              >
                -
              </button>

              <div className="text-center">
                <div>Total Streak Points: {redisUserInfo.quizStreak}</div>
                {betAmount > redisUserInfo.quizStreak && (
                  <div>You do not have enough streak points</div>
                )}
                <div className="text-2xl font-medium text-white">
                  {betAmount}
                </div>
                <div className="text-sm text-gray-300">
                  Points on{" "}
                  {selectedTeam === "away"
                    ? match.teams.away.team.name
                    : match.teams.home.team.name}
                </div>
              </div>

              <button
                onClick={() => setBetAmount((prev) => prev + 1)}
                disabled={betAmount > redisUserInfo.quizStreak}
                className="px-3 py-1 bg-slate-700 text-white rounded hover:bg-slate-600"
              >
                +
              </button>
            </div>
            <button>Click to save the bet</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BetModal;

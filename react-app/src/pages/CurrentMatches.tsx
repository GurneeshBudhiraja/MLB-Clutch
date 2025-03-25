import React, { useEffect, useState } from "react";

function CurrentMatches() {
  const [mlbMatches, setMLBMatches] = React.useState<Game[]>([]);
  // @ts-expect-error Ts issue
  const [date, setDate] = useState<string>("currentDate");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    // This is to send message to Devvit app to get the matches info happening at the present moment
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

    window.addEventListener("message", (event) => {
      console.log("Message has been received");
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
        }
      }
      setLoading(false);
    });
  }, []);
  return (
    <div className="p-4 bg-mlb-navy h-full">
      {loading && (
        <div className="flex justify-center items-center h-40">
          <img
            src="https://cdn.dribbble.com/users/187678/screenshots/6169547/media/bd30aaca24a1a9d25d57b4f10cd5b1d4.gif"
            alt="Loading..."
            className="w-20 h-20"
          />
        </div>
      )}

      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 p-4">
          {mlbMatches.map((match) => {
            const awayTeam = match.teams.away;
            const homeTeam = match.teams.home;
            const isFinal = match.status.detailedState === "Final";

            return (
              <div
                key={match.gamePk}
                className="relative bg-gradient-to-br from-mlb-navy/90 to-mlb-blue/90 backdrop-blur-sm rounded-xl p-5 shadow-2xl transform transition-all hover:scale-[1.02] hover:shadow-3xl border border-white/10"
              >
                {/* Game Status Badge */}
                <div
                  className={`absolute -top-3 left-4 px-4 py-1 rounded-full text-xs font-bold ${
                    isFinal
                      ? "bg-mlb-red text-white shadow-md shadow-mlb-red/30"
                      : "bg-mlb-gold text-mlb-navy shadow-md shadow-mlb-gold/30"
                  }`}
                >
                  {isFinal ? "FINAL" : match.status.detailedState.toUpperCase()}
                </div>

                {/* Teams Container */}
                <div className="flex justify-between items-center py-4 space-x-4">
                  {/* Away Team */}
                  <div className="flex-1 flex flex-col items-center">
                    <div className="relative w-20 h-20 mb-3">
                      <img
                        src={`https://www.mlbstatic.com/team-logos/${awayTeam.team.id}.svg`}
                        alt={awayTeam.team.name}
                        className="w-full h-full object-contain drop-shadow-lg"
                      />
                      <div
                        className={`absolute inset-0 rounded-full ${
                          awayTeam.isWinner
                            ? "shadow-[0_0_25px_2px_rgba(255,197,47,0.4)]"
                            : "opacity-50"
                        }`}
                      />
                    </div>
                    <span className="text-sm font-bold text-mlb-gold text-center mb-1">
                      {awayTeam.team.name.split(" ").pop()}
                    </span>
                    <div
                      className={`text-3xl font-digital ${
                        awayTeam.isWinner ? "text-mlb-gold" : "text-white/40"
                      }`}
                    >
                      {awayTeam.score}
                    </div>
                  </div>

                  {/* VS Separator */}
                  <div className="flex flex-col items-center mx-2">
                    <div className="w-1 h-12 bg-gradient-to-b from-mlb-red to-mlb-red/50 rounded-full" />
                    <span className="my-2 text-xs font-bold text-mlb-red">
                      VS
                    </span>
                    <div className="w-1 h-12 bg-gradient-to-b from-mlb-red to-mlb-red/50 rounded-full" />
                  </div>

                  {/* Home Team */}
                  <div className="flex-1 flex flex-col items-center">
                    <div className="relative w-20 h-20 mb-3">
                      <img
                        src={`https://www.mlbstatic.com/team-logos/${homeTeam.team.id}.svg`}
                        alt={homeTeam.team.name}
                        className="w-full h-full object-contain drop-shadow-lg"
                      />
                      <div
                        className={`absolute inset-0 rounded-full ${
                          homeTeam.isWinner
                            ? "shadow-[0_0_25px_2px_rgba(255,197,47,0.4)]"
                            : "opacity-50"
                        }`}
                      />
                    </div>
                    <span className="text-sm font-bold text-mlb-gold text-center mb-1">
                      {homeTeam.team.name.split(" ").pop()}
                    </span>
                    <div
                      className={`text-3xl font-digital ${
                        homeTeam.isWinner ? "text-mlb-gold" : "text-white/40"
                      }`}
                    >
                      {homeTeam.score}
                    </div>
                  </div>
                </div>

                {/* Game Info Footer */}
                <div className="mt-4 pt-3 border-t border-white/10">
                  <div className="text-center text-sm text-mlb-gray-light">
                    <p className="font-semibold tracking-wide">
                      {new Date(match.gameDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </p>
                    <p className="text-xs mt-1 font-medium text-white/60">
                      {match.venue.name.toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CurrentMatches;

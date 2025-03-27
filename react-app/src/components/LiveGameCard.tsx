function LiveGameCard({
  gamePk,
  detailedState,
  awayTeamURL,
  awayTeamName,
  awayTeamScore,
  homeTeamURL,
  homeTeamName,
  homeTeamScore,
  isHomeTeamWinner,
  seriesDescription,
  venueName,
  timeOfTheDay,
  gameDate,
}: LiveGameCard) {
  return (
    <div
      key={gamePk}
      className="relative snap-start shrink-0 bg-theme-white text-theme-blue  backdrop-blur-lg rounded-xl  border border-theme-red transition-all duration-300 shadow-2xl shadow-black/30 overflow-hidden py-2 w-3/4 mx-auto"
    >
      {/* Live Status Ribbon */}
      <div className="absolute top-2 right-2 flex items-center space-x-1.5 bg-mlb-red px-3 py-1 rounded-full animate-pulse text-theme-red">
        <div className="w-2 h-2 bg-theme-red rounded-full"></div>
        <span className="text-xs font-bold uppercase tracking-wide">
          {detailedState}
        </span>
      </div>

      {/* Teams Container */}
      <div className="flex items-center justify-between pt-6 pb-4 text-theme-blue">
        {/* Away Team */}
        <div className="flex-1 flex flex-col items-center">
          <div className="relative w-16 h-16 mb-2">
            <img src={awayTeamURL} alt={awayTeamName} />
          </div>
          <div className="text-center">
            <h3 className="text-sm font-bold text-mlb-gold mb-0.5">
              {awayTeamName}
            </h3>
            <div className="text-3xl">{awayTeamScore}</div>
          </div>
        </div>

        {/* Inning Status */}
        <div className="mx-3 flex flex-col items-center ">
          <div className="w-px h-12" />
          <div className="my-1.5 px-3 py-1 bg-mlb-red/20 rounded-full">
            <span className="text-xs font-semibold text-mlb-red uppercase">
              vs
            </span>
          </div>
          <div className="w-px h-12" />
        </div>

        {/* Home Team */}
        <div className="flex-1 flex flex-col items-center">
          <div className="relative w-16 h-16 mb-2">
            <img
              src={homeTeamURL}
              alt={homeTeamName}
              className="w-full h-full object-contain transition-all duration-300"
            />
          </div>
          <div className="text-center">
            <h3 className="text-sm font-bold text-mlb-gold mb-0.5">
              {homeTeamName}
            </h3>
            <div
              className={`text-3xl font-mlb-score ${
                isHomeTeamWinner ? "text-mlb-gold" : "text-white/50"
              }`}
            >
              {homeTeamScore}
            </div>
          </div>
        </div>
      </div>

      {/* Game Details Footer */}
      <div className="border-t border-mlb-red/20 pt-3 mt-2">
        <div className="grid grid-cols-2 gap-3 text-center">
          <div>
            <p className="text-xs font-semibold text-theme-blue mb-0.5">
              {new Date(gameDate).toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
              })}
            </p>
            <p className="text-[0.7rem] text-theme-blue/60 font-medium">
              {venueName}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-theme-blue/90 mb-0.5">
              {seriesDescription && seriesDescription}
            </p>
            <p className="text-[0.7rem] text-theme-blue/60 font-medium">
              {timeOfTheDay === "day" ? "DAY GAME" : "NIGHT GAME"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveGameCard;

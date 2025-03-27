import { motion } from "motion/react";

function AllGameCard({
  gamePk,
  status,
  homeTeamName,
  homeTeamURL,
  awayTeamName,
  awayTeamURL,
  seriesDescription,
  officialDate,
  venue,
}: AllGameCard) {
  return (
    <motion.div
      key={gamePk}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1 }}
      className="bg-theme-white rounded-xl p-6 shadow-md hover:shadow-lg hover:scale-[101%] transition-all cursor-pointer"
    >
      {/* Game Status Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex justify-between items-center mb-4"
      >
        <span
          className={`text-xs font-semibold flex items-center ${
            status === "Live" ? "text-theme-red animate-pulse" : "text-gray-600"
          }`}
        >
          {status === "Live" ? (
            <>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-2 h-2 bg-theme-red rounded-full mr-1.5"
              />
              LIVE
            </>
          ) : (
            status
          )}
        </span>
        <div className="flex flex-col items-end">
          <span className="text-xs text-gray-500">
            {new Date(officialDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
          <span className="text-xs text-gray-500">{venue}</span>
        </div>
      </motion.div>

      {/* Teams Container */}
      <div className="flex items-center justify-between">
        {/* Away Team */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex flex-col items-center w-1/3"
        >
          <motion.div className="relative mb-3">
            <div className="absolute inset-0 bg-mlb-blue/5 rounded-full" />
            <img
              src={awayTeamURL}
              alt={awayTeamName}
              className="w-16 h-16 object-contain relative z-10"
            />
          </motion.div>
          <span className="text-sm font-bold text-gray-800">
            {awayTeamName.split(" ").pop()}
          </span>
        </motion.div>

        {/* VS Separator */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
              filter: [
                "brightness(100%)",
                "brightness(120%)",
                "brightness(100%)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-12 h-12 bg-gradient-to-r from-mlb-red/10 to-mlb-blue/10 rounded-full flex items-center justify-center"
          >
            <motion.span
              animate={{
                opacity: [0.7, 1, 0.7],
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-lg font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-theme-red to-theme-blue"
            >
              VS
            </motion.span>{" "}
          </motion.div>
        </motion.div>

        {/* Home Team */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center w-1/3"
        >
          <motion.div className="relative mb-3">
            <div className="absolute inset-0 bg-mlb-blue/5 rounded-full" />
            <img
              src={homeTeamURL}
              alt={homeTeamName}
              className="w-16 h-16 object-contain relative z-10"
            />
          </motion.div>
          <span className="text-sm font-bold text-gray-800">
            {homeTeamName.split(" ").pop()}
          </span>
        </motion.div>
      </div>

      {/* Series Footer */}
      {seriesDescription && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-4 pt-3 border-t border-gray-100"
        >
          <span className="text-xs text-gray-500">{seriesDescription}</span>
        </motion.div>
      )}
    </motion.div>
  );
}

export default AllGameCard;

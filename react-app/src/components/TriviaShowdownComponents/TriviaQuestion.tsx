import { useEffect } from "react";
import { motion } from "framer-motion";
import Timer from "./Timer";

function TriviaQuestion({
  currentQuestion,
  gameState,
  setGameState,
}: GuessThePlayerProps) {
  let interval: NodeJS.Timeout;
  useEffect(() => {
    interval = setInterval(() => {
      setGameState((prev) => {
        if (prev.timer === 0) {
          clearInterval(interval);
          return {
            ...prev,
            isAnswered: true,
            timer: 0,
          };
        }
        return {
          ...prev,
          timer: prev.timer - 1,
        };
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      setGameState({
        gameStarted: false,
        gameLanguage: "english",
        isTimer: false,
        timer: 10, // in seconds
        questionLoading: true,
        questionCategory: "",
        correctAnswer: 0,
        isAnswered: false,
        selectedAnswer: -1,
        newQuestionTimer: 3,
      });
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mx-auto h-full px-4 sm:px-6 md:px-10"
    >
      {/* Enhanced Countdown Timer */}
      <div className="relative mb-4 md:mb-8">
        <Timer timer={!gameState.isAnswered ? gameState.timer : 10} />
      </div>

      {/* Main Content Container */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8"
      >
        {/* Enhanced Question Section */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col space-y-3 md:space-y-4 col-span-2 justify-center"
        >
          <div className="bg-theme-white p-3 md:p-6 rounded-xl md:rounded-2xl">
            <div className="text-xs md:text-sm font-semibold text-theme-red mb-1 md:mb-2">
              QUESTION
            </div>
            <motion.div
              className="text-base md:text-2xl font-bold text-theme-blue"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {currentQuestion.question}
            </motion.div>
          </div>

          <div className="space-y-2 md:space-y-3">
            <div className="text-xs md:text-sm font-semibold text-theme-blue mb-1 md:mb-2">
              OPTIONS
            </div>
            <div className="grid grid-cols-1 gap-2 md:gap-3">
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    if (gameState.isAnswered) return;
                    clearInterval(interval);
                    setGameState((prev) => ({
                      ...prev,
                      timer: 15,
                      selectedAnswer: index,
                      isAnswered: true,
                    }));
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                  whileHover={!gameState.isAnswered && { scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full p-2 md:p-4 text-left rounded-lg md:rounded-xl shadow-sm hover:shadow-lg transition-all 
                        border-2 focus:outline-none cursor-pointer text-sm md:text-base ${
                          !gameState.isAnswered
                            ? "bg-theme-white text-theme-blue border-theme-blue/10 hover:border-theme-blue/30 focus:border-theme-blue/50 focus:ring-2 focus:ring-theme-blue/20"
                            : gameState.selectedAnswer === index
                            ? index === currentQuestion.answer
                              ? "bg-green-500 text-white"
                              : "bg-theme-red text-white"
                            : index === currentQuestion.answer
                            ? "bg-green-500 text-white"
                            : "bg-theme-white text-theme-blue border-theme-blue/10"
                        } ${gameState.isAnswered && "!cursor-not-allowed"}`}
                  role="button"
                  tabIndex={0}
                >
                  <div className="flex items-center space-x-2 md:space-x-3">
                    <div className="font-bold text-gray-400 text-xs md:text-sm">
                      {String.fromCharCode(65 + index)}.
                    </div>
                    <span className="truncate">{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default TriviaQuestion;

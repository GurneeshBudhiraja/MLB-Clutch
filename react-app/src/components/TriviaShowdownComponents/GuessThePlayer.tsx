// @ts-nocheck
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Timer from "./Timer";

interface GuessThePlayerProps {
  playersHeadshots: Record<string | "placeholderHeadshot", string>;
}

function GuessThePlayer({ playersHeadshots }: GuessThePlayerProps) {
  const [timer, setTimer] = useState(10);
  const [currentQuestion, setCurrentQuestion] = useState({
    question:
      "Who is the MLB player known for both pitching and hitting prowess? 🌟",
    options: ["Shohei Ohtani", "Mike Trout"],
    answer: 0,
    englishOptions: [],
    success: true,
  });
  const [selectedAnswer, setSelectedAnswer] = useState<number>(-1);
  const [isAnswered, setIsAnswered] = useState(false);
  let interval;

  useEffect(() => {
    interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 0) {
          clearInterval(interval);
          setIsAnswered(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mx-auto h-full px-4 sm:px-10"
    >
      {/* Enhanced Countdown Timer */}
      <div className="relative mb-8">
        <Timer timer={!isAnswered ? timer : 10} />
        <motion.div
          className="absolute top-0 left-0 h-1 bg-gradient-to-r from-theme-blue to-theme-red"
          animate={
            !isAnswered
              ? { width: `${(timer / 10) * 100}%` }
              : { width: `${(10 / 10) * 100}%` }
          }
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Main Content Container */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Enhanced Image Card */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="group relative bg-theme-white rounded-2xl shadow-xl overflow-hidden border-4 border-theme-white hover:border-theme-blue transition-all duration-300 col-span-1"
        >
          <div className="relative overflow-hidden">
            <motion.img
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              src={
                !isAnswered
                  ? playersHeadshots["placeholderHeadshot"]
                  : playersHeadshots[
                      currentQuestion.options[currentQuestion.answer]
                        .split(" ")
                        .map((word, index) => {
                          if (index === 0) {
                            return word.toLowerCase();
                          } else {
                            return word;
                          }
                        })
                        .join("")
                    ]
              }
              alt="Player silhouette"
              className={`w-full h-64 object-cover  group-hover:grayscale-0 transition-all duration-500 ${
                !isAnswered && "grayscale"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          <motion.div
            className="p-6 bg-gradient-to-r from-theme-blue to-theme-red"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center justify-center">
              <p className="text-2xl font-bold text-theme-white text-center">
                {!isAnswered ? (
                  <>Who Am I?</>
                ) : (
                  currentQuestion["options"][currentQuestion["answer"]]
                )}
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced Question Section */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col space-y-3 col-span-2 justify-center"
        >
          <div className="bg-theme-white p-6 rounded-2xl">
            <div className="text-sm font-semibold text-theme-red mb-2">
              QUESTION
            </div>
            <motion.div
              className="text-2xl font-bold text-theme-blue"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {currentQuestion.question}
            </motion.div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-semibold text-theme-blue mb-2">
              OPTIONS
            </div>
            <div className="grid grid-cols-1 gap-3">
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    if (isAnswered) return;
                    setSelectedAnswer(index);
                    setIsAnswered(true);
                    clearInterval(interval);
                    setTimer(timer);
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                  whileHover={!isAnswered && { scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full p-4 text-left rounded-xl shadow-sm hover:shadow-lg transition-all 
                            border-2  focus:outline-none cursor-pointer ${
                              !isAnswered
                                ? "bg-theme-white text-theme-blue border-theme-blue/10 hover:border-theme-blue/30 focus:border-theme-blue/50 focus:ring-2 focus:ring-theme-blue/20"
                                : selectedAnswer === index
                                ? index === currentQuestion.answer
                                  ? "bg-green-500 text-white"
                                  : "bg-theme-red text-white"
                                : index === currentQuestion.answer
                                ? "bg-green-500 text-white"
                                : "bg-theme-white text-theme-blue border-theme-blue/10"
                            } ${isAnswered && "!cursor-not-allowed"}`}
                  role="button"
                  tabIndex={0}
                >
                  <div className="flex items-center space-x-3">
                    <div className=" font-bold text-gray-400">
                      {String.fromCharCode(65 + index)}.
                    </div>
                    <span className="">{option}</span>
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

export default GuessThePlayer;

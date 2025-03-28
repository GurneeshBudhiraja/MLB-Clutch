import { motion } from "motion/react";

function Timer({ timer }: { timer: number | string }) {
  return (
    <motion.div
      className={`border-2 border-theme-red w-fit ml-auto text-8xl p-3 rounded-full   min-w-30 flex items-center justify-center ${
        !timer ? "bg-theme-white/60" : "bg-theme-white"
      } ${
        Number(timer) <= 5 ? "text-theme-red" : "text-theme-blue"
      } select-none`}
      initial={{ scale: 1, y: 0 }}
      animate={
        timer
          ? {
              scale: [1, 1.1, 1],
              transition: {
                duration: 1,
                repeat: Infinity,
              },
            }
          : { scale: 1 }
      }
    >
      {timer}
    </motion.div>
  );
}

export default Timer;

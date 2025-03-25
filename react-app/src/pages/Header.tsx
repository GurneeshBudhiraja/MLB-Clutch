import { motion } from "motion/react";
import React from "react";

function Header({
  setCurrentPage,
}: {
  setCurrentPage: React.Dispatch<React.SetStateAction<CurrentPage>>;
}) {
  return (
    <motion.header
      className="bg-[var(--color-theme-blue)] w-full h-16 flex items-center justify-between px-8 shadow-lg"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-[var(--color-theme-white)] text-2xl font-bold"
        whileHover={{ scale: 1.05 }}
      >
        MLB Betting
      </motion.div>

      <nav className="flex gap-8">
        <motion.div
          onClick={() => setCurrentPage("currentMatches")}
          className="text-[var(--color-theme-white)] hover:text-[var(--color-theme-red)] transition-colors cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Current Matches
        </motion.div>

        <motion.div
          onClick={() => setCurrentPage("bets")}
          className="text-[var(--color-theme-white)] hover:text-[var(--color-theme-red)] transition-colors cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Past Bets
        </motion.div>
      </nav>
    </motion.header>
  );
}

export default Header;

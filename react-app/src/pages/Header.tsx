import { motion } from "motion/react";
import React, { useState } from "react";

function Header({
  setCurrentPage,
}: {
  setCurrentPage: React.Dispatch<React.SetStateAction<CurrentPage>>;
}) {
  const [activeLink, setActiveLink] = useState<"" | HeaderOptions>(
    "currentMatches"
  );

  const pageOptions: PageOptions = {
    currentMatches: "Ongoing Games",
    trivia: "Trivia Showdown 🎁",
  };

  return (
    <motion.header
      className="bg-theme-blue w-full h-16 flex items-center justify-between px-4 md:px-8 shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="flex gap-4 md:gap-8 justify-end w-full">
        {(Object.keys(pageOptions) as HeaderOptions[]).map((option, index) => (
          <motion.div
            key={index}
            onClick={() => {
              setActiveLink(option);
              setCurrentPage(option);
            }}
            className={`transition-colors cursor-pointer border border-theme-white px-2 md:px-4 py-1 rounded-full text-theme-white hover:border-theme-red text-sm md:text-base ${
              activeLink === option && "bg-theme-red "
            }`}
          >
            {pageOptions[option]}
          </motion.div>
        ))}
      </nav>
    </motion.header>
  );
}

export default Header;

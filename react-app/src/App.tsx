import { useState } from "react";
import Header from "./pages/Header";
import CurrentMatches from "./pages/CurrentMatches";

function App() {
  const [currentPage, setCurrentPage] = useState<CurrentPage>("currentMatches");
  return (
    <div className="box-border h-full w-screen text-theme-white bg-theme-blue overflow-scroll">
      <Header setCurrentPage={setCurrentPage} />
      {currentPage === "currentMatches" && <CurrentMatches />}
    </div>
  );
}

export default App;

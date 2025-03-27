import { useState } from "react";
import Header from "./pages/Header";
import CurrentMatches from "./pages/CurrentMatches";
import UserBets from "./pages/UserBets";

function App() {
  const [currentPage, setCurrentPage] = useState<CurrentPage>("currentMatches");
  const assetsLinks: AssetLinks = {
    "108": "https://i.redd.it/22j4630f4xqe1.png",
    "109": "https://i.redd.it/0kt6hlhnsyqe1.png",
    "110": "https://i.redd.it/fjgsy3hnsyqe1.png",
    "111": "https://i.redd.it/b1oj2jfnsyqe1.png",
    "112": "https://i.redd.it/gj8q8vhnsyqe1.png",
    "113": "https://i.redd.it/0l8ov2hnsyqe1.png",
    "114": "https://i.redd.it/peetgkhnsyqe1.png",
    "115": "https://i.redd.it/2p0udyhnsyqe1.png",
    "116": "https://i.redd.it/5n0gx5hnsyqe1.png",
    "117": "https://i.redd.it/8d4g5whnsyqe1.png",
    "118": "https://i.redd.it/kekj96hnsyqe1.png",
    "119": "https://i.redd.it/igyrnvknsyqe1.png",
    "120": "https://i.redd.it/9wxml7knsyqe1.png",
    "121": "https://i.redd.it/igwzubknsyqe1.png",
    "133": "https://i.redd.it/wt63xcknsyqe1.png",
    "134": "https://i.redd.it/8ikunzknsyqe1.png",
    "135": "https://i.redd.it/5jk25njnsyqe1.png",
    "136": "https://i.redd.it/xd28kuknsyqe1.png",
    "137": "https://i.redd.it/ooonrrknsyqe1.png",
    "138": "https://i.redd.it/5hznbtknsyqe1.png",
    "139": "https://i.redd.it/1dh21zknsyqe1.png",
    "140": "https://i.redd.it/qo53ecmnsyqe1.png",
    "141": "https://i.redd.it/hgop7f7bp4re1.png",
    "142": "https://i.redd.it/cxi1wv8bp4re1.png",
    "143": "https://i.redd.it/3ciufi8bp4re1.png",
    "144": "https://i.redd.it/yywu6b8bp4re1.png",
    "145": "https://i.redd.it/u6c5jx8bp4re1.png",
    "146": "https://i.redd.it/wzm6988bp4re1.png",
    "147": "https://i.redd.it/d60g8v9bp4re1.png",
    "158": "https://i.redd.it/fg6zsl8bp4re1.png",
    teamPlaceholder: "https://i.redd.it/o3b57u73zyqe1.png",
    loader: "https://i.redd.it/wrrgcv1e6ppe1.gif",
    "fire-flame": "https://i.redd.it/b9z995x0ebqe1.gif",
    leaderboard: "https://i.redd.it/uyo7vm2dwjqe1.gif",
  };

  return (
    <div className="box-border h-screen w-screen text-theme-white bg-theme-blue overflow-scroll">
      <Header setCurrentPage={setCurrentPage} />
      {currentPage === "currentMatches" ? (
        <CurrentMatches assetsLinks={assetsLinks} />
      ) : (
        <UserBets />
      )}
    </div>
  );
}

export default App;

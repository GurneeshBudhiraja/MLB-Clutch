import { useState } from "react";
import Header from "./pages/Header";
import CurrentMatches from "./pages/CurrentMatches";
import TriviaShowdown from "./pages/TriviaShowdown";

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

  const playersHeadshots: Record<string | "placeholderHeadshot", string> = {
    aaronJudge: "https://i.redd.it/pf1ybpy7z7re1.jpeg",
    adleyRutschman: "https://i.redd.it/fzncxdhi08re1.jpeg",
    andrewBenintendi: "https://i.redd.it/viwkvnvqy7re1.jpeg",
    andrésMuñoz: "https://i.redd.it/ybieanyh08re1.jpeg",
    aroldisChapman: "https://i.redd.it/yf0kl71wy7re1.jpeg",
    austinRiley: "https://i.redd.it/04jcu4hi08re1.jpeg",
    boBichette: "https://i.redd.it/v1fynrwqy7re1.jpeg",
    bryanReynolds: "https://i.redd.it/tcrp3shi08re1.jpeg",
    bryceHarper: "https://i.redd.it/lqq8dj97z7re1.jpeg",
    byronBuxton: "https://i.redd.it/po6ubevty7re1.jpeg",
    camiloDoval: "https://i.redd.it/ygyqs8fzy7re1.jpeg",
    cedricMullins: "https://i.redd.it/qt9e0eyh08re1.jpeg",
    christianWalker: "https://i.redd.it/r65365tj08re1.jpeg",
    christianYelich: "https://i.redd.it/u2wn7prj08re1.jpeg",
    clayHolmes: "https://i.redd.it/964sl197z7re1.jpeg",
    codyBellinger: "https://i.redd.it/1gpr383qy7re1.jpeg",
    corbinBurnes: "https://i.redd.it/i53dirvty7re1.jpeg",
    corbinCarroll: "https://i.redd.it/183qbq2vy7re1.jpeg",
    coreySeager: "https://i.redd.it/na6xzahi08re1.jpeg",
    dansbySwanson: "https://i.redd.it/hxe0gq2j08re1.jpeg",
    davidBednar: "https://i.redd.it/0xw70y3qy7re1.jpeg",
    devinWilliams: "https://i.redd.it/awnjsusj08re1.jpeg",
    dylanCease: "https://i.redd.it/yugvm6ovy7re1.jpeg",
    edwinDíaz: "https://i.redd.it/mdfb52syy7re1.jpeg",
    ellyDe: "https://i.redd.it/dvdsc0syy7re1.jpeg",
    emmanuelClase: "https://i.redd.it/nvci9fmwy7re1.jpeg",
    eugenioSuárez: "https://i.redd.it/i58aws4j08re1.jpeg",
    fernandoTatis: "https://i.redd.it/xou5rx4j08re1.jpeg",
    framberValdez: "https://i.redd.it/wdxxcj3j08re1.jpeg",
    franciscoLindor: "https://i.redd.it/n5usl4ch08re1.jpeg",
    freddieFreeman: "https://i.redd.it/q80orv82z7re1.jpeg",
    félixBautista: "https://i.redd.it/016i9z6qy7re1.jpeg",
    garySánchez: "https://i.redd.it/9rr5vlgi08re1.jpeg",
    georgeKirby: "https://i.redd.it/penqatdh08re1.jpeg",
    gregorySoto: "https://i.redd.it/sdmlxshi08re1.jpeg",
    gunnarHenderson: "https://i.redd.it/ictil6c7z7re1.jpeg",
    harrisonBader: "https://i.redd.it/g5tjwwioy7re1.jpeg",
    ianHapp: "https://i.redd.it/8qg5dwe5z7re1.jpeg",
    jazzChisholm: "https://i.redd.it/5tdrpz2wy7re1.jpeg",
    jhoanDuran: "https://i.redd.it/bglflfvzy7re1.jpeg",
    joeMantiply: "https://i.redd.it/ldhnrxdh08re1.jpeg",
    jordanRomano: "https://i.redd.it/2qrwiohi08re1.jpeg",
    joseAltuve: "https://i.redd.it/xs72gpnmy7re1.jpeg",
    joshBell: "https://i.redd.it/j3dl3p3qy7re1.jpeg",
    joshHader: "https://i.redd.it/od2mhsi5z7re1.jpeg",
    joséLeclerc: "https://i.redd.it/40sxfydh08re1.jpeg",
    joséRamírez: "https://i.redd.it/mh25vkzh08re1.jpeg",
    juanSoto: "https://i.redd.it/vwz1bo4j08re1.jpeg",
    julioRodríguez: "https://i.redd.it/9s06ajhi08re1.jpeg",
    justinVerlander: "https://i.redd.it/0oqaen3j08re1.jpeg",
    kenleyJansen: "https://i.redd.it/tw5jli58z7re1.jpeg",
    ketelMarte: "https://i.redd.it/cdgmptyh08re1.jpeg",
    kevinGausman: "https://i.redd.it/xkoale24z7re1.jpeg",
    kyleTucker: "https://i.redd.it/7pfsmf4j08re1.jpeg",
    larsNootbaar: "https://i.redd.it/68gpotyh08re1.jpeg",
    liamHendriks: "https://i.redd.it/7dp9ghh7z7re1.jpeg",
    loganWebb: "https://i.redd.it/6vstketj08re1.jpeg",
    luisCastillo: "https://i.redd.it/0vmij3ovy7re1.jpeg",
    mannyMachado: "https://i.redd.it/ccskr6eh08re1.jpeg",
    mattOlson: "https://i.redd.it/thx5jtyh08re1.jpeg",
    maxScherzer: "https://i.redd.it/x2ydynhi08re1.jpeg",
    mikeTrout: "https://i.redd.it/1gbind5j08re1.jpeg",
    mookieBetts: "https://i.redd.it/bj5mlswqy7re1.jpeg",
    oneilCruz: "https://i.redd.it/c3cp82syy7re1.jpeg",
    ozzieAlbies: "https://i.redd.it/my7dqb8my7re1.jpeg",
    paulGoldschmidt: "https://i.redd.it/4ubj3524z7re1.jpeg",
    paulSewald: "https://i.redd.it/agd5tqgi08re1.jpeg",
    peteAlonso: "https://i.redd.it/kdegdyomy7re1.jpeg",
    placeholderHeadshot: "https://i.redd.it/a0liff3ex7re1.jpeg",
    rafaelDevers: "https://i.redd.it/23zyqnqyy7re1.jpeg",
    raiselIglesias: "https://i.redd.it/edv0rq68z7re1.jpeg",
    ryanHelsley: "https://i.redd.it/hhvv3hh7z7re1.jpeg",
    ryanPressly: "https://i.redd.it/jgjlcuyh08re1.jpeg",
    sandyAlcantara: "https://i.redd.it/9edylgnmy7re1.jpeg",
    scottBarlow: "https://i.redd.it/6i49skhpy7re1.jpeg",
    shaneBieber: "https://i.redd.it/5rmph6cry7re1.jpeg",
    shoheiOhtani: "https://i.redd.it/s3mqljyh08re1.jpeg",
    spencerSteer: "https://i.redd.it/6b2u585j08re1.jpeg",
    starlingMarte: "https://i.redd.it/xkzz4hzh08re1.jpeg",
    stevenKwan: "https://i.redd.it/1sdbrydh08re1.jpeg",
    teoscarHernández: "https://i.redd.it/s5ilsek7z7re1.jpeg",
    tommyEdman: "https://i.redd.it/2bn2juvzy7re1.jpeg",
    tommyPham: "https://i.redd.it/9vyte8zh08re1.jpeg",
    treaTurner: "https://i.redd.it/bqd3d25j08re1.jpeg",
    tristonMcKenzie: "https://i.redd.it/twr24y1i08re1.jpeg",
    vladimirGuerrero: "https://i.redd.it/kcbrxxp5z7re1.jpeg",
    walkerBuehler: "https://i.redd.it/u30j2g8ty7re1.jpeg",
    willSmith: "https://i.redd.it/q4bj3bki08re1.jpeg",
    willsonContreras: "https://i.redd.it/bkytr0kxy7re1.jpeg",
    willyAdames: "https://i.redd.it/xas1dc8my7re1.jpeg",
    xanderBogaerts: "https://i.redd.it/5011xutry7re1.jpeg",
    yordanAlvarez: "https://i.redd.it/c2d9ae5ny7re1.jpeg",
    zackWheeler: "https://i.redd.it/7pg8a4tj08re1.jpeg",
  };

  return (
    <div className="box-border h-screen w-screen text-theme-white bg-theme-blue overflow-scroll">
      <Header setCurrentPage={setCurrentPage} />
      {currentPage === "currentMatches" && (
        <CurrentMatches assetsLinks={assetsLinks} />
      )}
      {currentPage === "trivia" && (
        <TriviaShowdown
          playersHeadshots={playersHeadshots}
          setCurrentPage={setCurrentPage}
          assetsLinks={assetsLinks}
        />
      )}
    </div>
  );
}

export default App;

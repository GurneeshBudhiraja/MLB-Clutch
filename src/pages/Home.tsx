// TODO: redesign the homepage.
import { Devvit, FormKey, useState } from "@devvit/public-api";
import LeaderBoard from "../components/LeaderBoard.js";
import { getTriviaQuestion } from "../utils/openAI.js";
import Score from "../components/Score.js";
import { webview } from "motion/react-client";

function Home({
  context,
  quizSettingsForm,
}: {
  context: Devvit.Context;
  quizSettingsForm: FormKey;
}) {
  // State to check if the
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  // TODO: remove in prod
  // const getRedditLinks = async () => {
  //   const files = [
  //     "108.png",
  //     "109.png",
  //     "110.png",
  //     "111.png",
  //     "112.png",
  //     "113.png",
  //     "114.png",
  //     "115.png",
  //     "116.png",
  //     "117.png",
  //     "118.png",
  //     "119.png",
  //     "120.png",
  //     "121.png",
  //     "133.png",
  //     "134.png",
  //     "135.png",
  //     "136.png",
  //     "137.png",
  //     "138.png",
  //     "139.png",
  //     "140.png",
  //     "teamPlaceholder.png",
  //   ];
  //   const fileLinks: Record<string, string> = {};
  //   const fileNames = files.map((file) => {
  //     const fileName = file.split(".")[0];
  //     const url = context.assets.getURL(`teamLogos/${file}`);
  //     fileLinks[fileName] = url;
  //   });
  //   console.log(fileLinks);
  // };
  const getRedditLinks = async () => {
    // const files = [
    //   "108.png",
    //   "109.png",
    //   "110.png",
    //   "111.png",
    //   "112.png",
    //   "113.png",
    //   "114.png",
    //   "115.png",
    //   "116.png",
    //   "117.png",
    //   "118.png",
    //   "119.png",
    //   "120.png",
    //   "121.png",
    //   "133.png",
    //   "134.png",
    //   "135.png",
    //   "136.png",
    //   "137.png",
    //   "138.png",
    //   "139.png",
    //   "140.png",
    //   "141.png",
    //   "142.png",
    //   "143.png",
    //   "144.png",
    //   "145.png",
    //   "146.png",
    //   "147.png",
    //   "158.png",
    //   "teamPlaceholder.png",
    // ];

    const files = [
      "aaronJudge.jpg",
      "adleyRutschman.jpg",
      "andrewBenintendi.jpg",
      "andrésMuñoz.jpg",
      "aroldisChapman.jpg",
      "austinRiley.jpg",
      "boBichette.jpg",
      "bryanReynolds.jpg",
      "bryceHarper.jpg",
      "byronBuxton.jpg",
      "camiloDoval.jpg",
      "cedricMullins.jpg",
      "christianWalker.jpg",
      "christianYelich.jpg",
      "clayHolmes.jpg",
      "codyBellinger.jpg",
      "corbinBurnes.jpg",
      "corbinCarroll.jpg",
      "coreySeager.jpg",
      "dansbySwanson.jpg",
      "davidBednar.jpg",
      "devinWilliams.jpg",
      "dylanCease.jpg",
      "edwinDíaz.jpg",
      "ellyDe.jpg",
      "emmanuelClase.jpg",
      "eugenioSuárez.jpg",
      "fernandoTatis.jpg",
      "framberValdez.jpg",
      "franciscoLindor.jpg",
      "freddieFreeman.jpg",
      "félixBautista.jpg",
      "garySánchez.jpg",
      "georgeKirby.jpg",
      "gregorySoto.jpg",
      "gunnarHenderson.jpg",
      "harrisonBader.jpg",
      "ianHapp.jpg",
      "jazzChisholm.jpg",
      "jhoanDuran.jpg",
      "joeMantiply.jpg",
      "jordanRomano.jpg",
      "joseAltuve.jpg",
      "joshBell.jpg",
      "joshHader.jpg",
      "joséLeclerc.jpg",
      "joséRamírez.jpg",
      "juanSoto.jpg",
      "julioRodríguez.jpg",
      "justinVerlander.jpg",
      "kenleyJansen.jpg",
      "ketelMarte.jpg",
      "kevinGausman.jpg",
      "kyleTucker.jpg",
      "larsNootbaar.jpg",
      "liamHendriks.jpg",
      "loganWebb.jpg",
      "luisCastillo.jpg",
      "mannyMachado.jpg",
      "mattOlson.jpg",
      "maxScherzer.jpg",
      "mikeTrout.jpg",
      "mookieBetts.jpg",
      "oneilCruz.jpg",
      "ozzieAlbies.jpg",
      "paulGoldschmidt.jpg",
      "paulSewald.jpg",
      "peteAlonso.jpg",
      "placeholderHeadshot.jpeg",
      "rafaelDevers.jpg",
      "raiselIglesias.jpg",
      "ryanHelsley.jpg",
      "ryanPressly.jpg",
      "sandyAlcantara.jpg",
      "scottBarlow.jpg",
      "shaneBieber.jpg",
      "shoheiOhtani.jpg",
      "spencerSteer.jpg",
      "starlingMarte.jpg",
      "stevenKwan.jpg",
      "teoscarHernández.jpg",
      "tommyEdman.jpg",
      "tommyPham.jpg",
      "treaTurner.jpg",
      "tristonMcKenzie.jpg",
      "vladimirGuerrero.jpg",
      "walkerBuehler.jpg",
      "willSmith.jpg",
      "willsonContreras.jpg",
      "willyAdames.jpg",
      "xanderBogaerts.jpg",
      "yordanAlvarez.jpg",
      "zackWheeler.jpg",
    ];

    const fileLinks: Record<string, string> = {};
    const fileNames = files.map((file, index) => {
      const fileName = file.split(".")[0];
      const url = context.assets.getURL(
        `playerHeadshots/placeholderHeadshot.jpeg`
      );
      fileLinks[fileName] = url;
      return;
    });
    console.log(fileLinks);
  };

  return (
    <zstack width="100%" height="100%" grow={true}>
      {/* Background image */}
      <image
        url="background.jpeg"
        description="MLB-themed Background"
        imageHeight={800}
        imageWidth={800}
        width="100%"
        height="100%"
        resizeMode="cover"
      />

      <vstack width="100%" height="100%">
        {/* Header */}
        <hstack padding="medium" width="100%" alignment="start">
          <text
            size="xlarge"
            weight="bold"
            color="white"
            style="heading"
            alignment="start"
          >
            MLB TRIVIA CHALLENGE
          </text>

          {/* Trophy GIF in top right */}
          <hstack alignment="end" width={"100%"} grow={true}>
            <image
              imageHeight={"60px"}
              imageWidth={"60px"}
              url="leaderboard.gif"
              onPress={() => setShowLeaderboard(true)}
              description="Leaderboard Gif"
            />
          </hstack>
        </hstack>

        {/* Main content area */}
        <vstack grow alignment="middle center" gap="large">
          {/* TODO: remove in prod */}
          <button onPress={() => getRedditLinks()}>Click</button>
          <text size="xxlarge" weight="bold" color="white" style="heading">
            BASEBALL TRIVIA
          </text>
          <Score context={context} />

          <button
            appearance="primary"
            size="large"
            onPress={() => {
              context.ui.showForm(quizSettingsForm);
            }}
          >
            ULTIMATE STREAK MODE
          </button>
          <button
            appearance="bordered"
            textColor="white"
            onPress={async (data) => {
              const applicationDataJson = await context.redis.get(
                "application-data"
              );
              console.log("application-data is:");
              console.log(applicationDataJson);
            }}
          >
            Check Stats
          </button>
        </vstack>
      </vstack>

      {/* Leaderboard modal */}
      {showLeaderboard && (
        <LeaderBoard
          setShowLeaderboard={setShowLeaderboard}
          context={context}
        />
      )}
    </zstack>
  );
}

export default Home;

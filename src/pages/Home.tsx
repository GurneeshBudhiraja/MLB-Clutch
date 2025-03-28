import { Devvit, useState } from "@devvit/public-api";
import LeaderBoard from "../components/LeaderBoard.js";
import Score from "../components/Score.js";

function Home({ context }: { context: Devvit.Context }) {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showRules, setShowRules] = useState(false);

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
  files.forEach((file) => {
    const fileName = file.split(".")[0];
    const url = context.assets.getURL(`playerHeadshots/${file}`);
    fileLinks[fileName] = url;
  });

  return (
    <zstack width="100%" height="100%" grow={true}>
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
        <hstack padding="medium" width="100%" alignment="start">
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

        <vstack grow alignment="middle center" gap="small">
          <text size="xxlarge" weight="bold" color="white" style="heading">
            ⚾ MLB Clutch
          </text>
          <text size="large" weight="bold" color="white" style="heading">
            Step up to the plate — test your MLB knowledge and prediction
            streaks!
          </text>
          <hstack alignment="center middle">
            <button
              appearance="bordered"
              textColor="white"
              onPress={() => setShowRules(true)}
            >
              Rules 📃
            </button>
            <Score context={context} />
          </hstack>
        </vstack>
      </vstack>

      {showLeaderboard && (
        <LeaderBoard
          setShowLeaderboard={setShowLeaderboard}
          context={context}
        />
      )}
      {showRules && (
        // Rules stack
        <zstack width="100%" height="100%" backgroundColor="rgba(0, 0, 0, 0.7)">
          <vstack width="80%" gap="medium" alignment="middle center">
            <hstack
              alignment="center"
              padding="small"
              backgroundColor="#BF0D3E"
              cornerRadius="small"
              width="100%"
            >
              <text size="xlarge" weight="bold" color="white">
                ⚾ RULES ⚾
              </text>
            </hstack>

            <vstack
              gap="medium"
              padding="medium"
              backgroundColor="white"
              cornerRadius="small"
              width="100%"
            >
              <hstack gap="small">
                <text size="large" weight="bold" color="#041E42">
                  1.
                </text>
                <text size="large" color="#041E42">
                  Be respectful to other fans and teams
                </text>
              </hstack>

              <hstack gap="small">
                <text size="large" weight="bold" color="#041E42">
                  2.
                </text>
                <text size="large" color="#041E42">
                  No spam or excessive self-promotion
                </text>
              </hstack>

              <hstack gap="small">
                <text size="large" weight="bold" color="#041E42">
                  3.
                </text>
                <text size="large" color="#041E42">
                  Keep discussions related to baseball
                </text>
              </hstack>

              <hstack gap="small">
                <text size="large" weight="bold" color="#041E42">
                  4.
                </text>
                <text size="large" color="#041E42">
                  No personal attacks or harassment
                </text>
              </hstack>

              <hstack gap="small">
                <text size="large" weight="bold" color="#041E42">
                  5.
                </text>
                <text size="large" color="#041E42">
                  Use appropriate language and content
                </text>
              </hstack>

              <hstack gap="small">
                <text size="large" weight="bold" color="#041E42">
                  6.
                </text>
                <text size="large" color="#041E42">
                  The app lets you view live, scheduled, and past MLB games
                </text>
              </hstack>

              <hstack gap="small">
                <text size="large" weight="bold" color="#041E42">
                  7.
                </text>
                <text size="large" color="#041E42">
                  Trivia questions reward +2 streak points for correct answers
                  and -1 for wrong answers
                </text>
              </hstack>

              <hstack gap="small">
                <text size="large" weight="bold" color="#041E42">
                  8.
                </text>
                <text size="large" color="#041E42">
                  You have 10 seconds to answer each trivia question
                </text>
              </hstack>

              <hstack gap="small">
                <text size="large" weight="bold" color="#041E42">
                  9.
                </text>
                <text size="large" color="#041E42">
                  Future updates will include live polls and friendly bets using
                  streak points
                </text>
              </hstack>
            </vstack>

            <hstack width="100%" alignment="end">
              <button
                appearance="primary"
                textColor="white"
                onPress={() => setShowRules(false)}
              >
                Close Rules
              </button>
            </hstack>
          </vstack>
        </zstack>
      )}
    </zstack>
  );
}

export default Home;

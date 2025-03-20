async function getLiveMLBGames() {
  const today = new Date().toISOString().split("T")[0];
  const url = `https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=${today}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Destructure the games array from the response
    const { dates } = data;
    if (!dates.length) return console.log("No games today");

    const { games } = dates[0];
    console.log(games);
    // Filter only live games
    const liveGames = games.filter(
      (game) => game.status.abstractGameState === "Live"
    );
    if (!liveGames.length) {
      console.log("No live games right now.");
      return;
    }

    // Extract relevant game details
    liveGames.forEach((game) => {
      const {
        gamePk, // Unique game ID
        teams: { away, home }, // Extract team info
        status, // Game status
        venue, // Venue information
      } = game;

      console.log(`🏟️ Venue: ${venue.name}`);
      console.log(`⚾ Match: ${away.team.name} vs. ${home.team.name}`);
      console.log(
        `📊 Score: ${away.team.name} ${away.score} - ${home.score} ${home.team.name}`
      );
      console.log(`🟢 Status: ${status.detailedState}`);
      console.log(`🔗 Game Link: https://www.mlb.com/gameday/${gamePk}`);
      console.log("--------------------------");
    });
  } catch (error) {
    console.error("Error fetching MLB data:", error);
  }
}
getLiveMLBGames()
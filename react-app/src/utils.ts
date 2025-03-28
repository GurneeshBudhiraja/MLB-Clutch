export async function getMatches(date: string, matchFilter: MatchFilter) {
  try {
    const url = `https://statsapi.mlb.com/api/v1/schedule?sportId=1&season=2025&date=${date}`;
    console.log(url)
    const reponse = await fetch(url)
    const data = await reponse.json()
    if (!data) {
      throw new Error("No data found")
    }
    if (matchFilter === "all") {
      return {
        success: true,
        data: data.dates[0].games
      }
    } else if (matchFilter === "live") {
      return {
        success: true,
        // @ts-expect-error Any type issue
        data: data.dates[0].games.filter((game) => game.status.statusCode === "I")
      }
    }
  } catch (error) {
    console.log("Error in getMatches")
    console.log(error)
    return {
      success: false,
      data: null
    }
  }

}
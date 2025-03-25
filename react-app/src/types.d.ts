type CurrentPage = "currentMatches" | "bets"

type MatchFilter = "all" | "live" | "scheduled"


type Game = {
  gamePk: number;
  away: {
    teamName: string;
    teamId: number;
    score: number;
    [key: string]: any; // Additional properties for away team
  },
  home: {
    teamName: string;
    teamId: number;
    score: number;
    [key: string]: any; // Additional properties for home team
  },
  [key: string]: any; // Additional properties for the game
}
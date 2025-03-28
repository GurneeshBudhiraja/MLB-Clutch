type CurrentPage = HeaderOptions

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



type AssertLinksProperties =
  "loader" |
  "fire-flame" |
  "leaderboard" |
  "108" |
  "109" |
  "110" |
  "111" |
  "112" |
  "113" |
  "114" |
  "115" |
  "116" |
  "117" |
  "118" |
  "119" |
  "120" |
  "121" |
  "133" |
  "134" |
  "135" |
  "136" |
  "137" |
  "138" |
  "139" |
  "140" |
  "141" |
  "142" |
  "143" |
  "144" |
  "145" |
  "146" |
  "147" |
  "158" |
  "teamPlaceholder"


type AssetLinks = {
  [key in AssertLinksProperties]: string;
}


type HeaderOptions = "currentMatches" | "trivia"


type PageOptions = {
  [key in HeaderOptions]?: string;
}


type LiveGameCard = {
  gamePk: number;
  detailedState: string;
  awayTeamURL: string;
  awayTeamName: string;
  awayTeamScore: number;
  homeTeamURL: string;
  homeTeamName: string;
  homeTeamScore: number;
  isHomeTeamWinner: boolean;
  seriesDescription: string;
  venueName: string;
  timeOfTheDay: string;
  gameDate: string;
}


type AllGameCard = {
  gamePk: number;
  status: string;
  homeTeamName: string;
  homeTeamURL: string;
  awayTeamName: string;
  awayTeamURL: string;
  seriesDescription: string;
  officialDate: string;
  venue: string;
  onClick: () => void;
}


type Progress = "positive" | "negative" | "neutral"

type TriviaQuestionCategory = "triviaQuestion" | "playerGuess"
type TriviaLanguage = "english" | "spanish" | "japanese"


type GameStateType = {
  gameStarted: boolean;
  gameLanguage: TriviaLanguage | "";
  isTimer: boolean;
  timer: number;
  questionLoading: boolean;
  questionCategory: TriviaQuestionCategory | "";
  correctAnswer: number;
  isAnswered: boolean;
  selectedAnswer: number;
}


type CurrentPageType = "home" | "quiz" | "redditOfTheDay" | "leaderboard";

type TriviaLanguage = "english" | "spanish" | "japanese"

type TriviaDifficulty = "easy" | "medium" | "hard";

type RedisKey = "application-data"

type Progress = "positive" | "negative" | "neutral"

type RedditContext = Devvit.Context

type TriviaSettings = {
  language: TriviaLanguage;
}

type TriviaQuestion = {
  question: string;
  answer: number;
  options: string[];
  success: boolean;
  hint: string;
}


type ApplicationData = {
  // Objects inside object
  users: Record<string, Record<string, any>>
}

type UserData = {
  quizStreak: number;
  totalPoints: number;
  firstVisit: boolean;
}

type TriviaOptionProps = {
  index: number;
  setSelectedOption: StateSetter<number>;
  selectedOption: number;
  option: string;
}

type TriviaButtonProps = {
  iconName: IconName;
  appearance: Devvit.Blocks.ButtonAppearance;
  onPress?: Devvit.Blocks.OnPressEventHandler;
  text: string;
}

type LeaderboardStatsType = {
  streak: number;
  userName: string;
  progress: Progress;
}


type CurrentGame = {
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

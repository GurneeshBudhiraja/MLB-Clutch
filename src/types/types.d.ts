

type CurrentPageType = "home" | "quiz" | "redditOfTheDay" | "leaderboard";

type TriviaLanguage = "english" | "spanish" | "japanese"

type TriviaDifficulty = "easy" | "medium" | "hard";

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
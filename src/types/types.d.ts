
type CurrentPageType = "home" | "quiz" | "redditOfTheDay";

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
  jobId: string;
  qotd: TriviaQuestion;
  // Objects inside object
  users: Record<string, Record<string, any>>
}
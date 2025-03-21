
type CurrentPageType = "home" | "quiz" | "redditOfTheDay";

type TriviaLanguage = "english" | "spanish" | "japanese"

type TriviaDifficulty = "easy" | "medium" | "hard";

type TriviaSettings = {
  language: TriviaLanguage;
  difficulty: TriviaDifficulty;
}

type TriviaQuestion = {
  question: string;
  answer: number;
  options: string[];
  success: boolean;
  hint: string;
}
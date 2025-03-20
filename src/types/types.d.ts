
type CurrentPageType = "home" | "quiz" | "redditOfTheDay";

type SupportedTriviaLanguagesType = "english" | "spanish" | "japanese"

type TriviaQuestion = {
  question: string;
  answer: number;
  options: string[];
  success: boolean;
  hint: string;
}
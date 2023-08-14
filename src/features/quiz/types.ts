// src/features/quiz/types.ts
import { Phrase } from "../../assets/initial-phrase";
export type QuizProps = {
  selectedLanguage: string;
  selectedLanguageForAnswer: string;
  phrases: Phrase[];
  isQuizStarted: boolean;
  setIsQuizStarted: (value: boolean) => void;
  onQuizEnd: () => void;
};

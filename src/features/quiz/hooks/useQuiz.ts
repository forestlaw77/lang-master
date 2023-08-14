import { useState, useEffect, useCallback } from "react";
import {
  Phrase,
  initialPhrases,
  languageToLanguageCode,
} from "../../../assets/initial-phrase";

const getTargetPhrases = (language: string) => {
  // 対象言語で絞り込み、問題候補となる単語・短文のリストを targetPhrases に入れる
  const phrases = initialPhrases.filter(
    (word) => word.languageCode === languageToLanguageCode[language]
  );
  // 問題候補が１つも無い場合はエラーにする
  if (phrases.length === 0) {
    console.error("No phrases found for language:", language);
    return [];
  }
  return phrases;
};

const getMeanings = (language: string) => {
  // ユーザ言語で絞り込み、意味候補となる単語・短文のリスト返す
  const phrases = initialPhrases.filter(
    (word) => word.languageCode === languageToLanguageCode[language]
  );

  // 候補が１つも無い場合はエラーにする
  if (phrases.length === 0) {
    console.error("No phrases found for language:", language);
    return [];
  }
  return phrases;
};

const correctAudio = new Audio("./maou_se_chime13.mp3");
const incorrectAudio = new Audio("./maou_se_onepoint33.mp3");

type QuizProps = {
  targetLanguage: string;
  userLanguage: string;
  onEnd: () => void;
};

const useQuiz = ({ targetLanguage, userLanguage, onEnd }: QuizProps) => {
  const targetPhrases = getTargetPhrases(targetLanguage);
  const meanings = getMeanings(userLanguage);
  const [quizPhrase, setQuizPhrase] = useState<Phrase | null>(null);
  const [answerOptions, setAnswerOptions] = useState<number[]>([]);
  const [correctPhrasesIndex, setCorrectPhrasesIndex] = useState<number | null>(
    null
  );

  const createAnswerOptions = useCallback(
    (correctMeaningId: number): number[] => {
      const options: number[] = [];
      const correctPhrasesIndex = meanings.findIndex(
        (word) => word.meaningId === correctMeaningId
      );

      if (correctPhrasesIndex < 0) {
        return [];
      } else {
        setCorrectPhrasesIndex(correctPhrasesIndex);
        options.push(correctPhrasesIndex);
      }

      while (options.length < 3) {
        const randomIndex = Math.floor(Math.random() * meanings.length);
        if (
          !options.includes(randomIndex) &&
          meanings[randomIndex].meaningId !== correctMeaningId
        ) {
          options.push(randomIndex);
        }
      }

      return shuffleArray(options);
    },
    [meanings]
  );

  const shuffleArray = (array: number[]): number[] => {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const createQuiz = useCallback(() => {
    // 問題候補の中からランダムに１つ問題を選択する
    const randomIndex = Math.floor(Math.random() * targetPhrases.length);
    const selectedPhrase = targetPhrases[randomIndex];

    // 問題を quizPhrase 設定する
    setQuizPhrase(selectedPhrase);

    // 同じ意味を持つユーザ言語から三択を作る
    const answerOptions = createAnswerOptions(selectedPhrase.meaningId);
    if (answerOptions.length === 0) {
      console.error("No answer words found for language:", userLanguage);
      return false;
    }
    setAnswerOptions(answerOptions);
    return true;
  }, [targetPhrases, setQuizPhrase, createAnswerOptions, userLanguage]);

  const handleAnswer = (answerPhraseIndex: number) => {
    answerPhraseIndex === correctPhrasesIndex
      ? correctAudio.play()
      : incorrectAudio.play();

    setTimeout(() => {
      createQuiz();
    }, 2000);
  };

  useEffect(() => {
    if (!quizPhrase) createQuiz();
  }, [quizPhrase, createQuiz]);

  return {
    quizPhrase,
    answerOptions,
    meanings,
    handleAnswer,
  };
};

export default useQuiz;

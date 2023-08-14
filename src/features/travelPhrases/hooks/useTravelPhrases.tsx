import { useState, useEffect, useCallback } from "react";
import {
  Phrase,
  initialPhrases,
  languageToLanguageCode,
} from "../../../assets/initial-phrase";
//import { QuizProps } from "../types";

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

const getRandomPhrase = (targetPhrases: Phrase[]) => {
  // 候補の中からランダムに１つを選択する
  if (targetPhrases !== null) {
    const randomIndex = Math.floor(Math.random() * targetPhrases.length);
    return targetPhrases[randomIndex];
  } else {
    return null;
  }
};

const getMeaning = (meanings: Phrase[], phrase: Phrase | null) => {
  if (phrase) {
    return meanings.find((word) => word.meaningId === phrase.meaningId);
  }
  return null;
};

type useTravelPhrasesProps = {
  targetLanguage: string;
  userLanguage: string;
};

export const useTravelPhrases = ({
  targetLanguage,
  userLanguage,
}: useTravelPhrasesProps) => {
  const targetPhrases = getTargetPhrases(targetLanguage);
  const meanings = getMeanings(userLanguage);
  const [targetPhrase, setTargetPhrase] = useState<Phrase | null>(null);
  const [meaning, setMeaning] = useState<Phrase | null | undefined>(null);

  const handleNext = useCallback(() => {
    setTargetPhrase(null);
    setMeaning(null);
  }, []);

  const doNext = useCallback(() => {
    //if (targetPhrases && meanings) {
    const phrase = getRandomPhrase(targetPhrases);
    if (phrase) {
      const meaning = getMeaning(meanings, phrase);
      setTargetPhrase(phrase);
      setMeaning(meaning);
    }
    //}
  }, [targetPhrases, meanings]);

  useEffect(() => {
    if (targetPhrase === null && meaning === null) {
      doNext();
    }
  }, [targetPhrase, meaning, doNext]);

  return {
    phrase: targetPhrase,
    meaning,
    nextPhrase: handleNext,
  };
};

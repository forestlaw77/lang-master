import {
  initialPhrases,
  languageToLanguageCode,
} from "../assets/initial-phrase";

export const speech = (
  text: string,
  lang: string,
  handleSpeechOnEnd: () => void
) => {
  let replacedText = text.replace(/\[/g, " ").replace(/\]/g, " ");
  if (lang === "fr-FR") {
    replacedText = text.replace(/-/g, " ");
  }
  if (lang === "ja-JP") {
    replacedText = text.replace(/金庫/g, "きんこ");
  }
  const utterance = new SpeechSynthesisUtterance(replacedText);
  utterance.lang = lang;
  utterance.onend = handleSpeechOnEnd;
  speechSynthesis.speak(utterance);
};

export const waitSpeech = async (text: string, lang: string) => {
  // 新しいコールバック関数を渡してspeechを呼び出す
  speech(text, lang, () => {});

  await new Promise<void>((resolve) => {
    const interval = setInterval(() => {
      if (!speechSynthesis.speaking) {
        clearInterval(interval);
        resolve();
      }
    }, 100); // チェックする間隔を調整することもできます
  });
};

export const getPhrases = (language: string) => {
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

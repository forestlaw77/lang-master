// ./i18n/config.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translation_en from "./en.json";
import translation_ja from "./ja.json";
import translation_fr from "./fr.json";

const resources = {
  Japanese: {
    translation: translation_ja,
  },
  "English(US)": {
    translation: translation_en,
  },
  French: {
    translation: translation_fr,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "English(US)",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;

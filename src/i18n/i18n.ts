import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "../i18n/locales/en.json";
import plTranslation from "../i18n/locales/pl.json";

i18n
  .use(initReactI18next) 
  .init({
    lng: "en", 
    resources: {
      en: { translation: enTranslation }, 
      pl: { translation: plTranslation }, 
    },
    fallbackLng: "en", 
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
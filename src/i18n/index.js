import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enTranslations from "./en.json"; 
import uaTranslations from "./ua.json"; 

const options = {
  interpolation: {
    escapeValue: false, 
  },
  lng: "en",
  fallbackLng: "en", 
  resources: {
    en: {
      translation: enTranslations,
    },
    ua: {
      translation: uaTranslations,
    },
  },
};

i18n.use(LanguageDetector).init(options);

export default i18n;

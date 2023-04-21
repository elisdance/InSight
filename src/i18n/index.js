import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslations from './en.json'; 
import uaTranslations from './ua.json'; 

const options = {
  interpolation: {
    escapeValue: false, 
  },
  lng: localStorage.getItem('i18nextLng') || 'en',
  fallbackLng: 'en', 
  resources: {
    en: {
      translation: enTranslations,
    },
    ua: {
      translation: uaTranslations,
    },
  },
};

i18n.use(initReactI18next).use(LanguageDetector).init(options);
i18n.on('changed', (language) => {
  localStorage.setItem('nextLanguage', language);
});
export default i18n;

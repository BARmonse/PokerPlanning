import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import english from './src/locales/en.json';
import spanish from './src/locales/es.json';

const resources = {
  en: {
    translation: english,
  },
  es: {
    translation: spanish,
  },
};

const i18nInstance = i18n.createInstance();

i18nInstance
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    resources: resources,

    interpolation: {
      escapeValue: false,
    },
  });

export default i18nInstance;

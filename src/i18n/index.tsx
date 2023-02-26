import i18next from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const isDEV = process.env.NODE_ENV !== 'production';

i18next
  .use(initReactI18next)
  .use(Backend)
  .use(LanguageDetector)
  .init({
    lng: isDEV ? 'en' : 'nl',
    // debug: isDEV,
    keySeparator: false,
    fallbackLng: ['en', 'nl'],
    interpolation: {
      escapeValue: false,
    },
    nonExplicitSupportedLngs: true,
    react: {
      useSuspense: true,
    },
    backend: {
      loadPath: '/locales/{{ns}}/{{lng}}.json',
    },
    ns: ['translations'],
    defaultNS: 'translations',
  });

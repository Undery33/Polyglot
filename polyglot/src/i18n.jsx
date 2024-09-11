import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';  // 언어 감지기 추가

i18n
  .use(LanguageDetector) 
  .use(initReactI18next)
  .init({
    resources: {
      한국어: {
        translation: {
            SelectLang: "언어 선택",
            conquerTheWorld: "영어부터 세계 정복까지",
        },
      },
      English: {
        translation: {
            SelectLang: "Select English",
            conquerTheWorld: "From English to World Domination",
        },
      },
      日本語: {
        translation: {
            SelectLang: "言語選択",
            conquerTheWorld: "英語から世界征服まで"
        },
      },
    },
    fallbackLng: '한국어',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'cookie', 'navigator', 'htmlTag', 'path', 'subdomain'],  // 언어를 감지하는 순서
      caches: ['localStorage', 'cookie'],  
    },
  });

export default i18n;

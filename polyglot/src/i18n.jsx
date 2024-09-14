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
          // Section - firsttext
          LiveTranslate: "실시간 번역, 자연스러운 대화",
          LiveTranslatetext1: "채팅으로 번역하던 시절은 안녕, ",
          LiveTranslatetext2: "POLYGLOT을 이용한 실시간 번역을 디스코드에서도 체험해보세요.",
          // Section - secondtext
          VoiceTTS: "TTS로 듣는 깔끔한 음성",
          VoiceTTStext1: "어떻게 실시간 번역이 가능하냐고요?",
          VoiceTTStext2: "그야 TTS가 대신 답해주거든요!",
          // Section - thirdtext
          conquerTheWorld: "영어부터 세계 정복까지",
          conquerTheWorldtext1: "세계 제 1 외국어인 영어부터 시작해서",
          conquerTheWorldtext2: "아시아, 유럽, 아프리카 등 소통 안되는 나라가 없도록"
        }
      },
      English: {
        translation: {
          SelectLang: "Select Language",
          // Section - firsttext
          LiveTranslate: "Instant Translation, \nSmooth Conversations",
          LiveTranslatetext1: "Goodbye to the days of translating through chat,",
          LiveTranslatetext2: "Experience real-time translation with POLYGLOT on Discord.",
          // Section - secondtext
          VoiceTTS: "Clear Voice with TTS",
          VoiceTTStext1: "How is real-time translation possible?",
          VoiceTTStext2: "That's because TTS answers for you!",
          // Section - thirdtext
          conquerTheWorld: "From English to World Domination",
          conquerTheWorldtext1: "Starting with English, the world's most spoken language,",
          conquerTheWorldtext2: "Make sure there's no country in Asia, Europe, Africa, etc., where you can't communicate."
        }
      },
      日本語: {
        translation: {
          SelectLang: "言語選択",
          // Section - firsttext
          LiveTranslate: "リアルタイム翻訳、\nスムーズな会話",
          LiveTranslatetext1: "チャット翻訳にさようなら、",
          LiveTranslatetext2: "DiscordでPOLYGLOTのリアルタイム翻訳を体験しよう。",
          // Section - secondtext
          VoiceTTS: "TTSで聞くクリアな音声",
          VoiceTTStext1: "どうやってリアルタイム翻訳が可能なの？",
          VoiceTTStext2: "それはTTSが代わりに答えるからです！",
          // Section - thirdtext
          conquerTheWorld: "英語から世界征服まで",
          conquerTheWorldtext1: "世界で最も話されている言語である英語から始めて、",
          conquerTheWorldtext2: "アジア、ヨーロッパ、アフリカでも自由にコミュニケーションを。"
        }
      },
    },
    lng: "한국어",
    fallbackLng: '한국어',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'cookie', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage', 'cookie'],  
    },
  });

export default i18n;

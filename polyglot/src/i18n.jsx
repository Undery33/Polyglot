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
          conquerTheWorldtext2: "아시아, 유럽, 아프리카 등 소통 안되는 나라가 없도록",
          // Polyglot - What is PolyGlot
          whatispolyglot: "폴리글롯은 다양함을 뜻하는 Poly와 혀(Glot)의 합성어로, 여러 외국어를 능숙하게 구사하는 사람을 뜻합니다.",
          wip_text1: "실시간 채팅 및 음성 번역을 지원함을 의미하기도 하고요.",
          wip_text2: "약 4억명 이상의 사용자를 보유한 디스코드로, 여러 각국의 친구들을 만날 수 있게 되었습니다.",
          wip_text3: "그렇기에 해외 유저와 소통을 하고 싶어하는 친구들이 더더욱 많아졌죠.",
          wip_text4: "PolyGlot을 통해 채팅과 음성으로 언어의 벽을 부숴보세요.",
          // Polyglot - Why Make This
          whymakethis: "외국인과 소통을 원하지만 언어의 장벽이 높아 포기했던 적 있으시죠?",
          wmt_text1: "이러한 불편함을 보완하고 싶어 프로젝트를 기획하게 되었습니다.",
          wmt_text2: "이제는 모두가 친해질 수 있는 세상 속에서 해외 친구들을 만드는 것이 좋지 않겠어요?",
          // Polyglot - Features
          features: "기능 소개",
          featuresText1: "PolyGlot이 제공하는 여러 기능들이에요!",
          featuresText2: "이러한 장점이 여러분의 바램들을 보완해줄 거에요",
          // Howtouse - Command Info
          support: "지원",
          commands: "명령어 소개",
          cmd_text1: "아래 명령어를 이용하여 PolyGlot을 라이브로 이용해보세요!", 
          cmd_text2: "만약 사용하다 오류 및 버그가 발견되면 아래 버튼을 이용하여 지원 받을 수 있습니다.",
          // Pathnote
          issue: "많이 찾는 이슈",
          pathnote: "패치 내역",
          uneedhelp: "지원이 필요하신가요?",
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
          conquerTheWorldtext2: "Make sure there's no country in Asia, Europe, Africa, etc., where you can't communicate.",
          // Polyglot - What is PolyGlot
          whatispolyglot: "A polyglot is a compound word made up of 'Poly,' meaning diversity, and 'Glot,' \nmeaning tongue, and it refers to a person who is proficient in multiple foreign languages.",
          wip_text1: "It also means supporting real-time chat and voice translation.",
          wip_text2: "With Discord, which has over 400 million users, you can meet friends from various countries.",
          wip_text3: "As a result, more and more people want to communicate with international users.",
          wip_text4: "Break the language barrier through PolyGlot with chat and voice.",
          // Polyglot - Why Make This
          whymakethis: "Have you ever wanted to communicate with foreigners \nbut gave up because of the language barrier?",
          wmt_text1: "This project was planned to address this inconvenience.",
          wmt_text2: "Wouldn't it be great to make friends from abroad in a world where everyone can get closer?",
          // Polyglot - Features
          features: "Features",
          featuresText1: "These are the various features that PolyGlot offers!",
          featuresText2: "These advantages will complement your desires.",
          // Howtouse - Command Info
          support: "Support",
          commands: "Command Introduction",
          cmd_text1: "Try using PolyGlot live with the commands below!",
          cmd_text2: "If you encounter any errors or bugs while using it, you can get support by using the button below.",
          // Pathnote
          issue: "Common Issues",
          pathnote: "Patch Notes",
          uneedhelp: "Need Support?",

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
          conquerTheWorldtext2: "アジア、ヨーロッパ、アフリカでも自由にコミュニケーションを。",
          // Polyglot - What is PolyGlot
          whatispolyglot: "ポリグロットは、多様性を意味する「Poly」と舌を意味する「Glot」の合成語で、\n複数の外国語を流暢に話す人を指します。",
          wip_text1: "リアルタイムチャットや音声翻訳をサポートしていることも意味します。",
          wip_text2: "4億人以上のユーザーを持つDiscordを通じて、さまざまな国の友達と出会うことができます。",
          wip_text3: "そのため、海外ユーザーとコミュニケーションを取りたいと思う友達が増えています。",
          wip_text4: "PolyGlotを通じて、チャットと音声で言語の壁を打ち破りましょう。",
          // Polyglot - Why Make This
          whymakethis: "外国人とコミュニケーションを取りたいと思ったことがあるけれど、\n言語の壁が高くて諦めたことはありませんか？",
          wmt_text1: "その不便さを補いたいという思いから、このプロジェクトを企画しました。",
          wmt_text2: "皆が仲良くなれる世界で、海外の友達を作るのも良いのではないでしょうか？",
          // Polyglot - Features
          features: "機能紹介",
          featuresText1: "PolyGlotが提供するさまざまな機能です！",
          featuresText2: "これらの利点があなたの希望を補ってくれますよ。",
          // Howtouse - Command Info
          support: "サポート",
          commands: "コマンド紹介",
          cmd_text1: "以下のコマンドを使用して、PolyGlotをライブで体験してみてください！",
          cmd_text2: " もし使用中にエラーやバグが見つかった場合は、下のボタンでサポートを受けることができます。",
          // Pathnote
          issue: "よく検索される問題",
          pathnote: "パッチノート",
          uneedhelp: "サポートが必要ですか？"
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

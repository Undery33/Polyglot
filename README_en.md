# Polyglot – Discord Real-Time Multilingual Translation Bot

**Polyglot** is a Discord bot that provides real-time translation for both text and voice messages.  
It leverages AWS AI services (AWS Transcribe, Translate, Polly) to handle text-to-speech, speech-to-text, and multilingual translation.

---

## 📌 Project Overview

- **Platform**: Discord
- **Main Features**
  - Translate chat messages
  - Translate voice messages (speech-to-text → translation → speech)
  - Multilingual web UI support (React + i18n)
  - PRO Mode: custom terminology, personalized speaking style, TTS voice selection, real-time call translation

---

## 💻 Tech Stack

- Discord API
- Node.js
- AWS SDK
  - **Transcribe** – Speech → Text
  - **Translate** – Text translation
  - **Polly (TTS)** – Text → Speech
  - **S3** – Audio file storage
  - **DynamoDB** – User translation settings storage
- React
  - i18n multilingual support

---

## ⚙️ Bot Architecture

### Text Translation (Chat)

1. Receive chat messages on Discord
2. Check user translation settings (language, etc.)
3. Call AWS Translate API
4. Send translated text back to Discord

---

### Voice Translation (Voice)

1. Join Discord voice channel
2. Record user speech
3. Upload audio file to S3
4. Process through Transcribe → Translate → Polly
5. Play back translated audio

> **Limitations**  
> - AWS Transcribe requires speech longer than 15 seconds  
> - ffmpeg is required  
> - Short noises can cause false positives in detec

```
Polyglot/
├── bot/
│ ├── chat_translate.js
│ └── voice_translate.js
├── web/
│ ├── src/
│ │ ├── Main.jsx
│ │ ├── Polyglot.jsx
│ │ └── components/
│ │ ├── HowToUse.jsx
│ │ ├── Issue.jsx
│ │ └── UseWeb.jsx
└── aws/
├── transcribe.js
├── translate.js
└── polly.js
```


---

## 🌐 Web UI

Built with React

- Main page
- Bot introduction
- How to use
- Bug reports
- Web demo

All UI supports multilingual switching via i18n

---

## 🔧 Troubleshooting

### Current Issues

- Transcribe limitation:
  - Cannot recognize speech shorter than 15 seconds
- Requires ffmpeg
- Short noises can trigger false positives

### Planned Solutions

- Buffering audio and handling in chunks
- Filter out audio shorter than a specific duration
- Optimize module integration

---

## 🎯 Future Plans

- **AWS SDK Modularization**
  - Combine Transcribe, Translate, and Polly into a single JS module
  - Improve reusability and maintenance
- **PRO Features**
  - Custom terminology translation
  - TTS voice selection
  - Real-time call translation
- Registering in Discord App Directory
  - Aiming to meet all official requirements

---

## 📈 Cost Considerations

- Translate only → Low cost
- Polly (TTS) only → Relatively low cost
- Including Transcribe → Higher cost
- PRO mode features planned as paid options

---

## 🧑‍💻 Developer

- **Undery33 (홍태의)**
  - Department of Computer Software Engineering / Cloud & Big Data Major
  - Discord: Undery33#<Tag>
  - GitHub: [Link TBD]

---

> This project aims to break language barriers in Discord communication.  
> The architecture is designed for modular reuse in other applications as well.

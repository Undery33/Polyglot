# Polyglot – Discord 실시간 다국어 번역 봇

**Polyglot**은 Discord에서 채팅과 음성을 실시간으로 번역해주는 봇입니다.  
AWS의 AI 서비스(AWS Transcribe, Translate, Polly)를 활용해 텍스트·음성 변환, 번역, TTS 기능을 제공합니다.

---

## 📌 프로젝트 개요

- **플랫폼**: Discord
- **주요 기능**
  - 채팅 메시지 번역
  - 음성 메시지 번역 (음성을 텍스트로 변환 → 번역 → 음성 출력)
  - 다국어 지원 웹 UI (React + i18n)
  - PRO 모드: 커스텀 용어, 말투, TTS 음성 선택, 전화 번역 등 고급 기능

---

## 💻 기술 스택

- Discord API
- Node.js
- AWS SDK
  - **Transcribe** – 음성 → 텍스트
  - **Translate** – 텍스트 번역
  - **Polly (TTS)** – 텍스트 → 음성
  - **S3** – 음성 파일 저장
  - **DynamoDB** – 번역 설정 저장
- React
  - i18n 다국어 지원

---

## ⚙️ Bot 아키텍처

### 텍스트 번역 (Chat)

1. Discord 채팅 수신
2. 사용자 번역 설정 확인 (언어 등)
3. AWS Translate API 호출
4. 번역된 텍스트를 Discord로 전송

---

### 음성 번역 (Voice)

1. Discord Voice Channel 입장
2. 음성 녹음
3. S3에 음성 파일 업로드
4. Transcribe → Translate → Polly 순서로 처리
5. 번역 음성을 재생

> **제약사항**  
> - AWS Transcribe 최소 15초 이상의 음성이 필요  
> - ffmpeg 필요  
> - 짧은 소리에도 false positive 발생 가능

---

## 🗃️ 폴더 구조 (예시)

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

React 기반으로 제작

- 메인 화면
- 봇 소개
- 사용 방법
- 버그 제보
- 웹 체험

모든 UI 다국어 지원 (i18n)

---

## 🔧 트러블슈팅

### 현황

- Transcribe 제약:
  - 15초 미만 음성 인식 불가
- ffmpeg 활용 필요
- 짧은 소리에도 잘못된 감지 발생

### 해결 방안 계획

- 음성 버퍼링 및 청크 단위 처리
- 일정 길이 미만 무시 필터 적용
- 모듈 통합 최적화

---

## 🎯 향후 계획

- **AWS SDK 모듈화**
  - Transcribe, Translate, Polly 기능을 하나의 JS 모듈로 결합
  - 재사용성과 유지보수 향상
- **PRO 기능 개발**
  - 커스텀 용어 번역
  - TTS 음성 선택
  - 전화 통화 실시간 번역
- Discord App Directory 등록
  - 공식 App 디렉터리 요건 충족 예정

---

## 📈 비용 관련

- Translate 단독 사용 → 저비용
- Polly(TTS)만 사용 → 비교적 저비용
- Transcribe 포함 시 비용 상승
- PRO 모드 기능은 요금 기반으로 계획 중

---

## 🧑‍💻 개발자

- **Undery33 (홍태의)**
  - 컴퓨터소프트웨어공학부 / 클라우드-빅데이터 전공
  - Discord: Undery33#<Tag>
  - GitHub: [링크 예정]

---

> 본 프로젝트는 Discord 커뮤니케이션의 언어 장벽을 허물고자 기획되었으며,  
> 모듈화를 통해 다른 애플리케이션에서도 재사용 가능하도록 개발 중입니다.

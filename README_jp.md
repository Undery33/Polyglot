# Polyglot – Discordリアルタイム多言語翻訳Bot

**Polyglot** は、Discord上でチャットと音声をリアルタイム翻訳するBotです。  
AWSのAIサービス（AWS Transcribe, Translate, Polly）を活用し、テキスト・音声変換、翻訳、TTS機能を提供します。

---

## 📌 プロジェクト概要

- **プラットフォーム**: Discord
- **主な機能**
  - チャットメッセージ翻訳
  - 音声メッセージ翻訳（音声をテキスト化→翻訳→音声再生）
  - 多言語対応Web UI（React + i18n）
  - PROモード: カスタム用語、話し方設定、TTS音声選択、通話翻訳など高度な機能

---

## 💻 技術スタック

- Discord API
- Node.js
- AWS SDK
  - **Transcribe** – 音声 → テキスト
  - **Translate** – テキスト翻訳
  - **Polly (TTS)** – テキスト → 音声
  - **S3** – 音声ファイル保存
  - **DynamoDB** – 翻訳設定保存
- React
  - i18n多言語対応

---

## ⚙️ Botアーキテクチャ

### テキスト翻訳 (Chat)

1. Discordチャットを受信
2. ユーザーの翻訳設定を確認（言語など）
3. AWS Translate APIを呼び出す
4. 翻訳結果をDiscordに送信

---

### 音声翻訳 (Voice)

1. Discordのボイスチャンネルに参加
2. 音声を録音
3. S3へ音声ファイルをアップロード
4. Transcribe → Translate → Pollyの順に処理
5. 翻訳された音声を再生

> **制約事項**  
> - AWS Transcribeは15秒以上の音声が必要  
> - ffmpegが必要  
> - 短いノイズでも誤検知する可能性あり

---

## 🗃️ フォルダ構成例

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

Reactベースで実装

- メイン画面
- Bot紹介
- 使い方
- バグ報告
- Web体験

全UIがi18nで多言語対応

---

## 🔧 トラブルシューティング

### 現状の問題

- Transcribeの制約:
  - 15秒未満の音声は認識不可
- ffmpegの利用が必要
- 短いノイズでも誤検知が発生

### 解決予定

- 音声のバッファリングやチャンク単位で処理
- 一定以下の長さは無視するフィルタを実装
- モジュール統合の最適化

---

## 🎯 今後の予定

- **AWS SDKモジュール化**
  - Transcribe、Translate、Pollyを一つのJSモジュールに統合
  - 再利用性・保守性を向上
- **PRO機能開発**
  - カスタム用語翻訳
  - TTS音声の選択
  - 通話中リアルタイム翻訳
- Discord App Directory登録
  - 公式ディレクトリの要件を満たす予定

---

## 📈 コストについて

- Translate単独利用 → 低コスト
- Polly(TTS)のみ利用 → 比較的低コスト
- Transcribeを含む場合 → コスト高
- PROモード機能は有料化を検討中

---

## 🧑‍💻 開発者

- **Undery33 (홍태의)**
  - コンピュータソフトウェア工学部 / クラウド・ビッグデータ専攻
  - Discord: Undery33#<Tag>
  - GitHub: [リンク予定]

---

> 本プロジェクトは、Discordコミュニケーションにおける言語の壁をなくすことを目的としています。  
> モジュール化により他のアプリケーションでも再利用可能な設計を目指しています。
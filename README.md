# Chrome Extension: Send Selected Text and HTML

## 概要

このChrome拡張は、**Webページ上で選択したテキストとそのHTML構造**を取得し、ユーザーが入力した追加情報と共にWebhookエンドポイントに送信するツールです。シンプルな操作でデータを収集し、外部ツールやシステムと連携できます。

---

## 主な機能

1. **選択範囲のデータ取得**:
   - 選択したテキストと、そのテキストを含むHTML構造を取得します。

2. **追加情報の入力**:
   - 選択データに付加する自由入力フィールドを提供します。

3. **Webhook送信**:
   - 選択テキスト、HTML構造、追加情報をJSON形式で指定のWebhookエンドポイントに送信します。

4. **操作性**:
   - ショートカットキーで即時起動。
   - 入力完了後、**Command + Enter**（Mac）または **Ctrl + Enter**（Windows/Linux）で送信。
   - キャンセルボタンやEscapeキーで操作を中断可能。

---

## デモ

1. Webページで必要な部分を選択。
2. **Command + Shift + G**（Mac）または **Ctrl + Shift + G**（Windows/Linux）を押下。
3. 入力ウィンドウに追記情報を入力し、**Command + Enter** または **Ctrl + Enter** で送信。

---

## インストールとセットアップ

1. **リポジトリをクローン**
   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
   ```

2. **Webhook URLを設定**
   - `config.example.js` をコピーして `config.js` を作成します。
     ```bash
     cp config.example.js config.js
     ```
   - `config.js` を編集し、Webhook URL を設定します。
     ```javascript
     const CONFIG = {
         WEBHOOK_URL: "https://your-webhook-endpoint.com", // Webhook URL を設定
     };
     export default CONFIG;
     ```

3. **Chrome拡張として読み込む**
   - Chromeで `chrome://extensions/` を開きます。
   - 「デベロッパーモード」を有効化。
   - 「パッケージ化されていない拡張機能を読み込む」をクリック。
   - クローンしたリポジトリのフォルダを選択。

---

## 使用方法

1. Webページで送信したいテキストを選択します。
2. **Command + Shift + G**（Mac）または **Ctrl + Shift + G**（Windows/Linux）を押下。
3. 表示された入力ウィンドウに必要な情報を入力します。
4. **Command + Enter** または **Ctrl + Enter** で送信。
5. キャンセルする場合は、**Escapeキー** または **Cancelボタン** を押してください。

---

## データ送信形式

Webhookに送信されるデータは以下のJSON形式です：

```json
{
  "selectedText": "選択されたテキスト",
  "selectedHTML": "<div>選択範囲を含むHTML</div>",
  "userInput": "ユーザーが入力した追加情報"
}
```

- **selectedText**: 選択されたテキスト。
- **selectedHTML**: 選択範囲を含むHTML構造。
- **userInput**: ユーザーが入力した自由なテキスト。

---

## 開発とテスト

1. **コード編集**
   - 必要に応じて `content.js` や `config.js` を編集します。

2. **テスト**
   - 拡張機能を再読み込み（`chrome://extensions/`）。
   - Webページで動作を確認します。

3. **デバッグ**
   - Chromeのデベロッパーツール（F12）でコンソールログを確認し、エラーを特定します。

---

## 注意事項

- **Webhook URL** は機密情報です。`config.js` は `.gitignore` に登録し、リポジトリに含めないようにしてください。
- 公開リポジトリには必ず `config.example.js` のみを含め、設定方法をREADMEに記載してください。

---

## ライセンス

[MIT License](LICENSE)

---

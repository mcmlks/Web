# MCML Web

MCML の公式サイト。編集は `data/config.json` を中心に行います。

## 1) 使い方（編集）
- Discord 招待リンクやサーバーの IP 変更: `data/config.json` を編集
- トップの文言やレイアウトを変えたい: `index.html` / `assets/styles.css`
- お知らせの追加: `data/config.json` の `news` 配列に追記

## 2) デプロイ

### A. GitHub Pages（標準）
1. このリポジトリを GitHub に作成し、コードを push。
2. GitHub > Settings > Pages で Branch: `main` / folder: `/(root)` を選択。
3. 数分後、`https://<ユーザー名>.github.io/<リポジトリ名>/` で公開。
4. **管理ページの保護**: GitHub Pages はサーバー側の認証機能が無いので、Cloudflare Access（無料枠あり）などでドメイン配下 `/admin.html` を保護してください。

### B. Netlify（推奨：簡易パスワード保護）
1. Netlify で "New site from Git" → GitHub リポジトリを選択。
2. Build Command: `nil`（空）、Publish directory: `/`。
3. デプロイ後、 `_headers` の Basic 認証が効き `/admin` を保護できます。

## 3) 管理ページのパスコードについて（フロント側）
- `admin.html` 内の `PASS_HASH` を安全なハッシュに置き換えます。
- 任意のパスコードを決め、ブラウザ DevTools で以下を実行し出力を貼り付けます。

```js
(async t=>{const e=new TextEncoder().encode(t);const b=await crypto.subtle.digest('SHA-256',e);console.log('sha-256:'+[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join(''))})('your-passcode');
```

> これは**目隠し程度**です。必ず Netlify Basic 認証や Cloudflare Access で保護してください。

## 4) 便利リンク（自動生成）
- 管理ページから `config.json` と `index.html` の GitHub 直接編集リンクへ飛べます
  - `data/config.json` の `githubRepo` / `githubEditBase` を自分の値に変更してください

## 5) ライセンス
- お好きに。

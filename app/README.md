# TsuraTsura

## 開発

前提
- Node.js
- npm
- Git
- SSHによるGitHubへの接続

``` bash
# このレポジトリを自分のパソコンにコピー
git clone git@github.com:kkiriyama/tsuratsura.git

# プロジェクトの中に移動
cd tsuratsura

# 必要なパッケージをインストール
npm install

# 編集用にブランチを作成
git checkout -b ブランチ名

# 開発用サーバーを起動
npm run dev

# 編集したファイルをコミットできる状態にする
git add <編集したファイル>

# 変更をコミット
git commit -m "コミットメッセージ"

# 変更をGitHubにプッシュ
git push origin 編集したブランチ名
```

## テスト

```bash
# ブラウザを自動操作するe2eテスト
npm run e2e
```

## ビルド

```bash
# masterブランチに移る
git checkout master

# 最新の状態に
git pull origin master

# 本番環境用のファイルを作成(同時にテストが自動で走ります)
npm run build
```

## デプロイ

前提
- firebase

```bash
# 最終確認
firebase serve

# デプロイ
firebase deploy
```

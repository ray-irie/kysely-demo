# ローカル環境の起動
## 開発環境の起動
VSCodeの拡張、[DevContainers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)をインストールしてください。
VSCodeでプロジェクトをひらけば自動で（もしくはコマンドパレットからReopen in containerを実行）ローカルコンテナが起動します。
これによりpnpmなどのツールを個人の環境に依存せずに利用できます。
コンテナを起動しない状態で各種コマンドを実行しないでください。

※DockerFileは雑に作っただけなので、ローカルでのサーバー、フロント、DBの起動には下記のpnpm devコマンドを使用

## api,front,DBの起動
```
pnpm dev
```
ローカル環境での各種ビルドは各フレームワークのdevコマンドをそのまま使用しているだけなので、Dockerfileは現状無関係です。

# Atlas
### DB schema を変更する場合
1. schema.hcl を編集
2. atlas schema apply（schemaの通りDBを変更、宣言的マイグレーション）
3. atlas migrate diff（現在のdiffを生成）
4. migration を commit（本番環境用のdiffをコミット）
### 最新を Pull した場合
- atlas migrate apply を実行する
- schema apply は実行しない

# Schema
pnpm kysely:codegen
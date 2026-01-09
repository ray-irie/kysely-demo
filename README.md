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

# Prisma
https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/mysql

初回、マイグレーション時
```
npx prisma migrate dev --name init
```
シーディング（v6まではマイグレーション時に自動で走っていたがv7からは手動必須になった）
```
npx prisma db seed
```
PrismaClientの生成
```
npx prisma generate
```

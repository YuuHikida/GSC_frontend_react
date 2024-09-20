# ビルドステージのベースイメージを指定
FROM node:16-alpine AS build-stage

# 作業ディレクトリを作成
WORKDIR /app

# package.json と package-lock.json をコピー
COPY package.json package-lock.json ./

# 依存関係をインストール
RUN npm install

# ソースコードをコピー
COPY . .

# Reactアプリをビルド
RUN npm run build

# 最終ステージでNginxを使って静的ファイルを提供
FROM nginx:alpine
COPY --from=build-stage /app/build /usr/share/nginx/html

# コンテナが公開するポート番号
EXPOSE 80

# Nginxの起動
CMD ["nginx", "-g", "daemon off;"]

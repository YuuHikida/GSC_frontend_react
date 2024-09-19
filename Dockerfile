# ベースイメージを指定
FROM node:16-alpine

# 作業ディレクトリを作成
WORKDIR /app

# パッケージファイルをコピーしてインストール
COPY package.json package-lock.json ./
RUN npm install

# ソースコードをコピー
COPY . .

# Reactアプリをビルド
RUN npm run build

# Nginxを使って静的ファイルを提供する
FROM nginx:alpine
COPY --from=build-stage /app/build /usr/share/nginx/html

# コンテナが公開するポート番号
EXPOSE 80

# Nginxの起動
CMD ["nginx", "-g", "daemon off;"]

# Node.jsの公式イメージを使用
FROM node:16-alpine

# 作業ディレクトリを設定
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピーして依存関係をインストール
COPY package*.json ./
RUN npm install

# ソースコードをコンテナにコピー
COPY . .

# TypeScriptコードをビルド
RUN npm run build

# アプリケーションのポートを開放
EXPOSE 5001

# アプリケーションを起動
CMD ["npm", "start"]

# Hono Lambda SAM Example  

Honoフレームワークを使用したAWS Lambda + SAM（Serverless Application Model）のサンプルプロジェクトです。TypeScriptで書かれたサーバーレスAPIを、AWS Lambda、API Gateway、DynamoDB、Secrets Managerと連携して構築できます。

## 🚀 機能

- **Honoフレームワーク**: 軽量で高速なWebフレームワーク
- **AWS Lambda**: サーバーレス関数実行環境
- **API Gateway**: RESTful APIエンドポイント
- **DynamoDB**: NoSQLデータベース
- **Secrets Manager**: 機密情報の管理
- **LocalStack**: ローカル開発環境
- **TypeScript**: 型安全性を保証
- **SAM**: AWSリソースの管理

## 📋 要件

- Node.js 22.x以上
- Docker & Docker Compose
- AWS CLI
- AWS SAM CLI

## 🛠️ インストール・セットアップ

### 1. リポジトリのクローン

```bash
git clone <repository-url>
cd hono-lambda-sam-example
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. ローカル開発環境の起動

```bash
# LocalStackを使用したローカル環境の起動
docker-compose up -d

# アプリケーションコンテナに入る
docker-compose exec app bash
```

### 4. ローカル環境へのデプロイ

```bash
# LocalStackにデプロイ
npm run localstack
```

## 🏃‍♂️ 使用方法

### ローカル開発

```bash
# ローカル環境の起動
docker-compose up -d

# アプリケーションコンテナに入る
docker-compose exec app bash

# LocalStackにデプロイ
npm run localstack
```

### 本番環境へのデプロイ

```bash
# 開発環境
npm run deploy:dev

# ステージング環境
npm run deploy:staging

# 本番環境
npm run deploy:prod
```

## 📁 プロジェクト構造

```
hono-lambda-sam-example/
├── src/
│   ├── index.ts              # メインアプリケーション
│   ├── env.ts                # 環境変数と型定義
│   ├── routes/
│   │   ├── DynamoDB.ts       # DynamoDB関連のルート
│   │   └── SecretsManager.ts # Secrets Manager関連のルート
│   └── middleware/
│       ├── DynamoDB.ts       # DynamoDB操作のミドルウェア
│       └── SecretsManager.ts # Secrets Manager操作のミドルウェア
├── template.yaml             # SAMテンプレート
├── samconfig.toml           # SAM設定ファイル
├── docker-compose.yml       # ローカル開発環境
├── Dockerfile               # アプリケーションコンテナ
└── package.json            # プロジェクト設定
```

## 🔧 利用可能なスクリプト

| スクリプト | 説明 |
|-----------|------|
| `npm run localstack` | LocalStack環境の構築とデプロイ |
| `npm run build` | SAMアプリケーションのビルド |
| `npm run deploy` | デフォルト環境へのデプロイ |
| `npm run deploy:dev` | 開発環境へのデプロイ |
| `npm run deploy:staging` | ステージング環境へのデプロイ |
| `npm run deploy:prod` | 本番環境へのデプロイ |

## 🌐 API エンドポイント

### 基本エンドポイント

- `GET /` - アプリケーションのルート
- `GET /hello` - 挨拶メッセージ

### DynamoDB エンドポイント

- `GET /dynamodb/put` - 文字列データの保存
- `GET /dynamodb/putJson` - JSONデータの保存

### Secrets Manager エンドポイント

- `GET /secrets-manager/get-secret-value` - シークレット値の取得

## 🔒 環境設定

### ローカル開発環境

LocalStackを使用したローカル開発環境が提供されています：

- **AWS Services**: Lambda, API Gateway, DynamoDB, Secrets Manager
- **エンドポイント**: `http://localhost:4566`
- **リージョン**: `us-east-1`

### 本番環境

- **リージョン**: `ap-northeast-1`
- **ステージ**: `dev`, `staging`, `prod`

## 🧪 テスト

```bash
# ローカル環境でのテスト
curl http://localhost:4566/restapis/{api-id}/v1/_user_request_/

# 本番環境でのテスト
curl https://{api-gateway-id}.execute-api.ap-northeast-1.amazonaws.com/v1/
```

## 📄 ライセンス

このプロジェクトは [MIT License](LICENSE) の下で公開されています。

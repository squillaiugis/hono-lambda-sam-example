# Hono Lambda SAM Example

A example project for AWS Lambda + SAM (Serverless Application Model) using the Hono framework. Build serverless APIs written in TypeScript with integration to AWS Lambda, API Gateway, DynamoDB, and Secrets Manager.

## 🚀 Features

- **Hono Framework**: Lightweight and fast web framework
- **AWS Lambda**: Serverless function execution environment
- **API Gateway**: RESTful API endpoints
- **DynamoDB**: NoSQL database
- **Secrets Manager**: Management of sensitive information
- **LocalStack**: Local development environment
- **TypeScript**: Type safety guaranteed
- **SAM**: AWS resource management

## 📋 Requirements

- Node.js 22.x or higher
- Docker & Docker Compose
- AWS CLI
- AWS SAM CLI

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd hono-lambda-sam-example
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Local Development Environment

```bash
# Start local environment using LocalStack
docker-compose up -d

# Enter the application container
docker-compose exec app bash
```

### 4. Deploy to Local Environment

```bash
# Deploy to LocalStack
npm run localstack
```

## 🏃‍♂️ Usage

### Local Development

```bash
# Start local environment
docker-compose up -d

# Enter the application container
docker-compose exec app bash

# Deploy to LocalStack
npm run localstack
```

### Production Deployment

```bash
# Development environment
npm run deploy:dev

# Staging environment
npm run deploy:staging

# Production environment
npm run deploy:prod
```

## 📁 Project Structure

```
hono-lambda-sam-example/
├── src/
│   ├── index.ts              # Main application
│   ├── routes/
│   │   ├── DynamoDB.ts       # DynamoDB related routes
│   │   └── SecretsManager.ts # Secrets Manager related routes
│   └── helper/
│       ├── DynamoDBHelper.ts # DynamoDB operation helper
│       └── SecretsManagerHelper.ts # Secrets Manager operation helper
├── template.yaml             # SAM template
├── samconfig.toml           # SAM configuration file
├── docker-compose.yml       # Local development environment
├── Dockerfile               # Application container
├── tsconfig.json            # TypeScript configuration
├── package.json             # Project configuration
├── LocalStack_Test.postman_collection.json # Postman collection for testing
└── LICENSE                  # License file
```

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run localstack` | Build and deploy LocalStack environment |
| `npm run build` | Build SAM application |
| `npm run deploy` | Deploy to default environment |
| `npm run deploy:dev` | Deploy to development environment |
| `npm run deploy:staging` | Deploy to staging environment |
| `npm run deploy:prod` | Deploy to production environment |

## 🌐 API Endpoints

### Basic Endpoints

- `GET /` - Application root
- `GET /hello` - Greeting message

### DynamoDB Endpoints

- `GET /dynamodb/put` - Save string data
- `GET /dynamodb/putJson` - Save JSON data

### Secrets Manager Endpoints

- `GET /secrets-manager/get-secret-value` - Retrieve secret values

## 🔒 Environment Configuration

### Local Development Environment

A local development environment using LocalStack is provided:

- **AWS Services**: Lambda, API Gateway, DynamoDB, Secrets Manager
- **Endpoint**: `http://localhost:4566`
- **Region**: `us-east-1`

### Production Environment

- **Region**: `ap-northeast-1`
- **Stages**: `dev`, `staging`, `prod`

## 🧪 Testing

```bash
# Testing in local environment
curl http://localhost:4566/restapis/{api-id}/v1/_user_request_/

# Testing in production environment
curl https://{api-gateway-id}.execute-api.ap-northeast-1.amazonaws.com/v1/
```

## 📄 License

This project is released under the [MIT License](LICENSE).
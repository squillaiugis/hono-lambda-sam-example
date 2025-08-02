import { Env as DefaultEnv } from "hono";
import { SecretsManagerHelper } from "./middleware/SecretsManager";
import { DynamoDBHelper } from "./middleware/DynamoDB";

export interface Env extends DefaultEnv {
  Variables: {
    secretsManager: SecretsManagerHelper;
    dynamoDB: DynamoDBHelper;
  };
}

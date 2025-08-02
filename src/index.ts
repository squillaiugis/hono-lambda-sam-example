import { Hono } from "hono";
import { handle } from "hono/aws-lambda";
import { Env } from "./env";
import { dynamoDBRoutes } from "./routes/DynamoDB";
import { secretsManagerRoutes } from "./routes/SecretsManager";

const app = new Hono<Env>()
  .get("/", (c) => {
    return c.text("Hello Hono!");
  })
  .route("/secrets-manager", secretsManagerRoutes)
  .route("/dynamodb", dynamoDBRoutes);

export const handler = handle(app);

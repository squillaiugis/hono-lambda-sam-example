import { Hono } from "hono";
import {
  Env,
  dynamoDBMiddleware,
} from "@squilla/hono-aws-middlewares/dynamodb";

export const dynamoDBRoutes = new Hono<Env>()
  .use(dynamoDBMiddleware())
  .get("/put", async (c) => {
    const dynamoDB = c.get("DynamoDB");
    await dynamoDB.putItem({
      TableName: process.env.DynamoTable || "hono-dynamodb",
      Item: {
        id: { S: crypto.randomUUID() },
        value: { S: "Put Value" },
      },
    });
    return c.text("Put Item!");
  });

import { Hono } from "hono";
import { Env } from "../env";
import { dynamoDBMiddleware } from "../middleware/DynamoDB";

export const dynamoDBRoutes = new Hono<Env>()
  .use(dynamoDBMiddleware())
  .get("/put", async (c) => {
    const dynamoDB = c.get("dynamoDB");
    dynamoDB.putStringValue({
      item: {
        id: crypto.randomUUID(),
        value: "Put Value",
      },
      tableName: "hono-v1",
      expirationTtl: 3600, // 1 hour
    });
    return c.text("Put Item!");
  })
  .get("/putJson", async (c) => {
    const dynamoDB = c.get("dynamoDB");
    dynamoDB.putJsonValue({
      item: {
        id: crypto.randomUUID(),
        value: {
          name: "John Doe",
          age: 30,
          email: "john.doe@example.com",
        },
      },
      tableName: "hono-v1",
      expirationTtl: 3600, // 1 hour
    });
    return c.text("Put JSON Item!");
  });

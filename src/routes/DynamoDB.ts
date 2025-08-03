import { Hono } from "hono";
import {
  Env,
  dynamoDBMiddleware,
} from "@squilla/hono-aws-middlewares/dynamodb";
import { DynamoDBHelper } from "../helper/DynamoDBHelper";

export const dynamoDBRoutes = new Hono<Env>()
  .use(dynamoDBMiddleware())
  .post("/put/:id", async (c) => {
    const value = (await c.req.formData()).get("value")?.toString();
    if (!value) {
      return c.text("Value is required", 400);
    }
    const dynamoDB = c.get("DynamoDB");
    const helper = new DynamoDBHelper(
      dynamoDB,
      process.env.DynamoTable || "hono-dynamodb"
    );
    await helper.putItem({
      id: { S: c.req.param("id") },
      value: { S: value },
    });
    return c.text("Put Item!");
  })
  .get("/get/:id", async (c) => {
    const dynamoDB = c.get("DynamoDB");
    const helper = new DynamoDBHelper(
      dynamoDB,
      process.env.DynamoTable || "hono-dynamodb"
    );
    const item = await helper.getItem({
      id: { S: c.req.param("id") },
    });
    return c.json(item);
  })
  .post("/update/:id", async (c) => {
    const value = (await c.req.formData()).get("value")?.toString();
    if (!value) {
      return c.text("Value is required", 400);
    }
    const dynamoDB = c.get("DynamoDB");
    const helper = new DynamoDBHelper(
      dynamoDB,
      process.env.DynamoTable || "hono-dynamodb"
    );
    await helper.updateItem(
      {
        id: { S: c.req.param("id") },
      },
      "SET #value = :value",
      {
        ":value": { S: value },
      },
      {
        "#value": "value",
      }
    );
    return c.text("Update Item!");
  })
  .delete("/delete/:id", async (c) => {
    const dynamoDB = c.get("DynamoDB");
    const helper = new DynamoDBHelper(
      dynamoDB,
      process.env.DynamoTable || "hono-dynamodb"
    );
    await helper.deleteItem({
      id: { S: c.req.param("id") },
    });
    return c.text("Delete Item!");
  });

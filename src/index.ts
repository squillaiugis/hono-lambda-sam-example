import { Hono } from "hono";
import { handle } from "hono/aws-lambda";
import { Env } from "./env";
import { secretsManagerMiddleware } from "./middleware/SecretsManager";

const app = new Hono<Env>()
  .use(secretsManagerMiddleware())
  .get("/", (c) => {
    return c.text("Hello Hono!");
  })
  .get("/get-secret-value", async (c) => {
    const secretsManager = c.get("secretsManager");
    const secret = await secretsManager.getJsonValue({ SecretId: "hono-v1" });
    return c.json(secret);
  });

export const handler = handle(app);

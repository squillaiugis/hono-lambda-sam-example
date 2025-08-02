import { Hono } from "hono";
import { Env } from "../env";
import { secretsManagerMiddleware } from "../middleware/SecretsManager";

export const secretsManagerRoutes = new Hono<Env>()
  .use(secretsManagerMiddleware())
  .get("/get-secret-value", async (c) => {
    const secretsManager = c.get("secretsManager");
    const secret = await secretsManager.getJsonValue({ SecretId: "hono-v1" });
    return c.json(secret);
  })


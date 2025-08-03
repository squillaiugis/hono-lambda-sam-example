import { Hono } from "hono";
import { Env, secretsManagerMiddleware } from "@squilla/hono-aws-middlewares/secrets-manager";

export const secretsManagerRoutes = new Hono<Env>()
  .use(secretsManagerMiddleware())
  .get("/get-secret-value", async (c) => {
    const secretsManager = c.get("SecretsManager");
    const secret = await secretsManager.getSecretValue({
      SecretId: process.env.SecretsManager || "hono-secrets",
    });
    return c.json(JSON.parse(secret.SecretString || "{}"));
  });

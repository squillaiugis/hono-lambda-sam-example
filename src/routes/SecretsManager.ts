import { Hono } from "hono";
import {
  Env,
  secretsManagerMiddleware,
} from "@squilla/hono-aws-middlewares/secrets-manager";
import { SecretsManagerHelper } from "../helper/SecretsManagerHelper";

export const secretsManagerRoutes = new Hono<Env>()
  .use(secretsManagerMiddleware())
  .get("/get", async (c) => {
    const secretsManager = c.get("SecretsManager");
    const helper = new SecretsManagerHelper(
      secretsManager,
      process.env.SecretsManager || "hono-secrets"
    );
    const value = await helper.getStringValue();
    return c.text(value);
  })
  .get("/get-json", async (c) => {
    const secretsManager = c.get("SecretsManager");
    const helper = new SecretsManagerHelper(
      secretsManager,
      process.env.SecretsManager || "hono-secrets"
    );
    const value = await helper.getJsonValue();
    return c.json(value);
  });

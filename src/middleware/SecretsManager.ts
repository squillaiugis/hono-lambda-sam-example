import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import { MiddlewareHandler } from "hono";
import { createMiddleware } from "hono/factory";
import { Env } from "../env";

export type SecretsManagerClientConfig = ConstructorParameters<
  typeof SecretsManagerClient
>[0];

export type GetValueParams = ConstructorParameters<
  typeof GetSecretValueCommand
>[0];

export class SecretsManagerHelper {
  #client: SecretsManagerClient;

  constructor(config: SecretsManagerClientConfig) {
    this.#client = new SecretsManagerClient([config]);
  }

  async getValue(params: GetValueParams) {
    const comand = new GetSecretValueCommand(params);
    return await this.#client.send(comand);
  }

  async getStringValue(params: GetValueParams) {
    const response = await this.getValue(params);
    const str = response.SecretString;
    if (!str) {
      throw new ReferenceError(`${params.SecretId} is not found.`);
    }
    return str;
  }

  async getJsonValue(params: GetValueParams) {
    const str = await this.getStringValue(params);
    return JSON.parse(str);
  }

  async getBinaryValue(params: GetValueParams) {
    const response = await this.getValue(params);
    const binary = response.SecretBinary;
    if (!binary) {
      throw new ReferenceError(`${params.SecretId} is not found.`);
    }
    return binary;
  }
}

export const secretsManagerMiddleware = (
  config?: SecretsManagerClientConfig
): MiddlewareHandler => {
  return createMiddleware<Env>(async (c, next) => {
    const secretsManager = new SecretsManagerHelper(config);
    c.set("secretsManager", secretsManager);
    await next();
  });
};

import { SecretsManager } from "@aws-sdk/client-secrets-manager";

export class SecretsManagerHelper {
  constructor(private readonly secretsManager: SecretsManager, private readonly secretId: string) {}

  async getStringValue() {
    const secret = await this.secretsManager.getSecretValue({
      SecretId: this.secretId,
    });
    return secret.SecretString || "";
  }

  async getJsonValue() {
    const secret = await this.secretsManager.getSecretValue({
      SecretId: this.secretId,
    });
    return JSON.parse(secret.SecretString || "{}");
  }
}

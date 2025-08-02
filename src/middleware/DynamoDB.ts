import {
  AttributeValue,
  DynamoDBClient,
  PutItemCommand,
} from "@aws-sdk/client-dynamodb";
import { MiddlewareHandler } from "hono";
import { createMiddleware } from "hono/factory";
import { Env } from "../env";

export type DynamoDBClientConfig = ConstructorParameters<
  typeof DynamoDBClient
>[0];

export type DynamoDBItem = {
  id: string;
  value: string;
  expireAt?: number;
};

export type DynamoDBTransportableItem = {
  id: AttributeValue.SMember;
  value: AttributeValue.SMember;
  expireAt?: AttributeValue.NMember;
};

export type PutValueParams = {
  tableName: string;
  item: Omit<DynamoDBItem, "expireAt">;
  expirationTtl?: number;
};

export class DynamoDBHelper {
  #client: DynamoDBClient;

  constructor(config: DynamoDBClientConfig) {
    this.#client = new DynamoDBClient([config]);
  }

  async putStringValue(params: PutValueParams) {
    const transportableItem: DynamoDBTransportableItem = {
      id: { S: params.item.id },
      value: { S: params.item.value },
    };

    if (params.expirationTtl) {
      const expireAt = Math.floor(Date.now() / 1000) + params.expirationTtl;
      transportableItem.expireAt = { N: expireAt.toString() };
    }

    const command = new PutItemCommand({
      TableName: params.tableName,
      Item: transportableItem,
    });
    await this.#client.send(command);
  }

  async putJsonValue(
    params: Omit<PutValueParams, "item"> & {
      item: Pick<DynamoDBItem, "id"> & { value: Record<string, unknown> };
    }
  ) {
    await this.putStringValue({
      ...params,
      item: {
        id: params.item.id,
        value: JSON.stringify(params.item.value),
      },
    });
  }
}

export const dynamoDBMiddleware = (
  config?: DynamoDBClientConfig
): MiddlewareHandler => {
  return createMiddleware<Env>(async (c, next) => {
    const dynamoDB = new DynamoDBHelper(config);
    c.set("dynamoDB", dynamoDB);
    await next();
  });
};

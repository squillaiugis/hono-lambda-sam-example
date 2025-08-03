import { DynamoDB,AttributeValue } from "@aws-sdk/client-dynamodb";

export class DynamoDBHelper {
  constructor(private readonly dynamoDB: DynamoDB, private readonly tableName: string) {}
  
  async putItem(item: Record<string, AttributeValue>) {
    await this.dynamoDB.putItem({ TableName: this.tableName, Item: item });
  }

  async getItem(key: Record<string, AttributeValue>) {
    const result = await this.dynamoDB.getItem({
      TableName: this.tableName,
      Key: key,
    });
    return result.Item;
  }

  async updateItem(key: Record<string, AttributeValue>, updateExpression: string, expressionAttributeValues: Record<string, AttributeValue>,
    expressionAttributeNames: Record<string, string>
  ) {
    await this.dynamoDB.updateItem({
      TableName: this.tableName,
      Key: key,
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttributeValues,
      ExpressionAttributeNames: expressionAttributeNames,
    });
  }

  async deleteItem(key: Record<string, AttributeValue>) {
    await this.dynamoDB.deleteItem({
      TableName: this.tableName,
      Key: key,
    });
  }
}
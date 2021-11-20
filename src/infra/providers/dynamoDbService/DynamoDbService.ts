import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { DbService } from '../../DbService';
import { DynamoDbErrors } from '../../../shared/errors/DynamoDbErrors';

export class DynamoDbService extends DbService {
  constructor(private ddbClient: DocumentClient) {
    super();
  }

  async get(params: DocumentClient.GetItemInput): Promise<any> {
    try {
      const getRes = await this.ddbClient.get(params).promise();
      return getRes.Item;
    } catch (error: any) {
      throw new DynamoDbErrors(error, params);
    }
  }

  async put(params: DocumentClient.PutItemInput): Promise<any> {
    try {
      const putRes = await this.ddbClient.put(params).promise();
      return putRes.Attributes;
    } catch (error: any) {
      if (error.code === 'ConditionalCheckFailedException') {
        throw new DynamoDbErrors(error, params, 'ConditionalCheckFailedException');
      }
      throw new DynamoDbErrors(error, params);
    }
  }

  async update(params: DocumentClient.UpdateItemInput): Promise<any> {
    try {
      const updateRes = await this.ddbClient.update(params).promise();
      return updateRes.Attributes;
    } catch (error: any) {
      throw new DynamoDbErrors(error, params);
    }
  }

  async delete(params: DocumentClient.DeleteItemInput): Promise<any> {
    try {
      const deleteRes = await this.ddbClient.delete(params).promise();
      return deleteRes.Attributes;
    } catch (error: any) {
      throw new DynamoDbErrors(error, params);
    }
  }

  async scan(params: DocumentClient.ScanInput): Promise<any> {
    try {
      const scanRes = await this.ddbClient.scan(params).promise();
      return scanRes.Items;
    } catch (error: any) {
      throw new DynamoDbErrors(error, params);
    }
  }
}

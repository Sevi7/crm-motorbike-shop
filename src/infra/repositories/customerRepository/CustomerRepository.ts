import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { DynamoDbService } from '../../providers/dynamoDbService/DynamoDbService';
import { Customer } from '../../../domain/models/Customer';
import { customerFactoryFromDb } from '../customerFactoryFromDb';
import { AlreadyExistsError } from '../../../shared/errors/AlreadyExistsError';
import { DynamoDbErrors } from '../../../shared/errors/DynamoDbErrors';

const { DYNAMO_TABLE_NAME_CUSTOMER } = <
  {
    DYNAMO_TABLE_NAME_CUSTOMER: string;
  }
>process.env;

export class CustomerRepository {
  constructor(private ddbService: DynamoDbService) {}

  async put(customer: Customer): Promise<Customer> {
    const params: DocumentClient.PutItemInput = {
      TableName: DYNAMO_TABLE_NAME_CUSTOMER,
      Item: customer.toJson(),
      ConditionExpression: 'id <> :id',
      ExpressionAttributeValues: {
        ':id': customer.id,
      },
    };

    try {
      await this.ddbService.put(params);
      return customer;
    } catch (error: any) {
      if (error instanceof DynamoDbErrors && error.code === 'ConditionalCheckFailedException') {
        throw new AlreadyExistsError('CustomerAlreadyExists');
      }
      throw error;
    }
  }
}

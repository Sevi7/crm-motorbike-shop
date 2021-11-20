import { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { lambdaHandler } from '../../src/index';
import { dynamoDbService } from '../../src/infra/providers/dynamoDbService';

const { DYNAMO_TABLE_NAME_CUSTOMER } = <
  {
    DYNAMO_TABLE_NAME_CUSTOMER: string;
  }
>process.env;

test('list customers by available credit descending order', async () => {
  const routeKey = 'GET /customers';
  await dynamoDbService.put({
    TableName: DYNAMO_TABLE_NAME_CUSTOMER,
    Item: {
      id: '1',
      name: 'John',
      lastName: 'Doe',
      availableCredit: 5,
    },
  });
  await dynamoDbService.put({
    TableName: DYNAMO_TABLE_NAME_CUSTOMER,
    Item: {
      id: '2',
      name: 'Darla',
      lastName: 'Cory',
      availableCredit: 1,
    },
  });
  await dynamoDbService.put({
    TableName: DYNAMO_TABLE_NAME_CUSTOMER,
    Item: {
      id: '3',
      name: 'Vicky',
      lastName: 'Matilda',
      availableCredit: 3,
    },
  });

  const event = <APIGatewayProxyEventV2>{
    routeKey,
  };
  const res = <APIGatewayProxyStructuredResultV2>await lambdaHandler(event);
  expect(res.statusCode).toBe(200);
  expect(JSON.parse(res.body || '')).toEqual([
    {
      id: '1',
      name: 'John',
      lastName: 'Doe',
      availableCredit: 5,
    },
    {
      id: '3',
      name: 'Vicky',
      lastName: 'Matilda',
      availableCredit: 3,
    },
    {
      id: '2',
      name: 'Darla',
      lastName: 'Cory',
      availableCredit: 1,
    },
  ]);
});

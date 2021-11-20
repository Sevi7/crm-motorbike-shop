import { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { lambdaHandler } from '../../src/index';
import { dynamoDbService } from '../../src/infra/providers/dynamoDbService';

const { DYNAMO_TABLE_NAME_CUSTOMER } = <
  {
    DYNAMO_TABLE_NAME_CUSTOMER: string;
  }
>process.env;

describe('update customer', () => {
  const routeKey = 'PUT /customers/<id>';
  describe('update customer valid input', () => {
    test('customer exists', async () => {
      await dynamoDbService.put({
        TableName: DYNAMO_TABLE_NAME_CUSTOMER,
        Item: {
          id: '2a9dab47-02a8-4dfc-92c6-434c02d7eb71',
          name: 'John',
          lastName: 'Doe',
          email: 'john@doe.com',
          phoneNumber: '123456789',
          availableCredit: 0,
        },
      });

      const event = <APIGatewayProxyEventV2>(<unknown>{
        routeKey,
        pathParameters: {
          id: '2a9dab47-02a8-4dfc-92c6-434c02d7eb71',
        },
        body: JSON.stringify({
          email: 'johnny@doe.com',
        }),
      });
      const res = <APIGatewayProxyStructuredResultV2>await lambdaHandler(event);
      expect(res.statusCode).toBe(200);
      expect(JSON.parse(res.body || '')).toEqual({
        id: expect.any(String),
        name: 'John',
        lastName: 'Doe',
        email: 'johnny@doe.com',
        availableCredit: 0,
      });
    });

    test('customer does not exist', async () => {
      const event = <APIGatewayProxyEventV2>(<unknown>{
        routeKey,
        pathParameters: {
          id: '2a9dab47-02a8-4dfc-92c6-434c02d7eb71',
        },
        body: JSON.stringify({
          email: 'johnny@doe.com',
        }),
      });
      const res = <APIGatewayProxyStructuredResultV2>await lambdaHandler(event);
      expect(res.statusCode).toBe(404);
      expect(JSON.parse(res.body || '')).toEqual({
        message: 'Customer not found',
      });
    });
  });

  describe('update customer invalid input', () => {
    test('name cannot be updated', async () => {
      const event = <APIGatewayProxyEventV2>(<unknown>{
        routeKey,
        pathParameters: {
          id: '2a9dab47-02a8-4dfc-92c6-434c02d7eb71',
        },
        body: JSON.stringify({
          name: 'John',
        }),
      });
      const res = <APIGatewayProxyStructuredResultV2>await lambdaHandler(event);
      expect(res.statusCode).toBe(400);
      expect(JSON.parse(res.body || '')).toEqual({
        message: '"name" is not allowed',
      });
    });
  });
});

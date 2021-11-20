import { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { lambdaHandler } from '../../src/index';
import { dynamoDbService } from '../../src/infra/providers/dynamoDbService';

const { DYNAMO_TABLE_NAME_CUSTOMER } = <
  {
    DYNAMO_TABLE_NAME_CUSTOMER: string;
  }
>process.env;

describe('add credit customer', () => {
  const routeKey = 'POST /customers/<id>/credit';
  describe('add credit valid input', () => {
    test('customer exists', async () => {
      await dynamoDbService.put({
        TableName: DYNAMO_TABLE_NAME_CUSTOMER,
        Item: {
          id: '2a9dab47-02a8-4dfc-92c6-434c02d7eb71',
          name: 'John',
          lastName: 'Doe',
          email: 'john@doe.com',
          availableCredit: 0,
        },
      });

      const event = <APIGatewayProxyEventV2>(<unknown>{
        routeKey,
        pathParameters: {
          id: '2a9dab47-02a8-4dfc-92c6-434c02d7eb71',
        },
        body: JSON.stringify({
          amount: 12,
        }),
      });
      const res = <APIGatewayProxyStructuredResultV2>await lambdaHandler(event);
      expect(res.statusCode).toBe(200);
      expect(JSON.parse(res.body || '')).toEqual({
        id: '2a9dab47-02a8-4dfc-92c6-434c02d7eb71',
        name: 'John',
        lastName: 'Doe',
        email: 'john@doe.com',
        availableCredit: 12,
      });
    });

    test('customer does not exist', async () => {
      const event = <APIGatewayProxyEventV2>(<unknown>{
        routeKey,
        pathParameters: {
          id: '2a9dab47-02a8-4dfc-92c6-434c02d7eb71',
        },
        body: JSON.stringify({
          amount: 12,
        }),
      });
      const res = <APIGatewayProxyStructuredResultV2>await lambdaHandler(event);
      expect(res.statusCode).toBe(404);
      expect(JSON.parse(res.body || '')).toEqual({
        message: 'Customer not found',
      });
    });
  });

  describe('add credit invalid input', () => {
    test('amount cannot be negative', async () => {
      const event = <APIGatewayProxyEventV2>(<unknown>{
        routeKey,
        pathParameters: {
          id: '2a9dab47-02a8-4dfc-92c6-434c02d7eb71',
        },
        body: JSON.stringify({
          amount: -12,
        }),
      });
      const res = <APIGatewayProxyStructuredResultV2>await lambdaHandler(event);
      expect(res.statusCode).toBe(400);
      expect(JSON.parse(res.body || '')).toEqual({
        message: '"amount" must be greater than 0',
      });
    });
  });
});

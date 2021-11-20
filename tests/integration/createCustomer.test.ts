import { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { lambdaHandler } from '../../src/index';

describe('create customer', () => {
  const routeKey = 'POST /customers';
  test('create customer valid input', async () => {
    const event = <APIGatewayProxyEventV2>{
      routeKey,
      body: JSON.stringify({
        name: 'John',
        lastName: 'Doe',
        email: 'john@doe.com',
      }),
    };
    const res = <APIGatewayProxyStructuredResultV2>await lambdaHandler(event);
    expect(res.statusCode).toBe(201);
    expect(JSON.parse(res.body || '')).toEqual({
      id: expect.any(String),
      name: 'John',
      lastName: 'Doe',
      email: 'john@doe.com',
      availableCredit: 0,
    });
  });

  describe('create customer invalid input', () => {
    test('no lastName', async () => {
      const event = <APIGatewayProxyEventV2>{
        routeKey,
        body: JSON.stringify({
          name: 'John',
        }),
      };
      const res = <APIGatewayProxyStructuredResultV2>await lambdaHandler(event);
      expect(res.statusCode).toBe(400);
      expect(JSON.parse(res.body || '')).toEqual({
        message: '"lastName" is required',
      });
    });

    test('no email or phoneNumber ', async () => {
      const event = <APIGatewayProxyEventV2>{
        routeKey,
        body: JSON.stringify({
          name: 'John',
          lastName: 'Doe',
        }),
      };
      const res = <APIGatewayProxyStructuredResultV2>await lambdaHandler(event);
      expect(res.statusCode).toBe(400);
      expect(JSON.parse(res.body || '')).toEqual({
        message: '"value" must contain at least one of [email, phoneNumber]',
      });
    });
  });
});

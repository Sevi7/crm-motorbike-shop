import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';

export abstract class LambdaBaseController {
  abstract runImplementation(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2>;

  async run(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    try {
      return await this.runImplementation(event);
    } catch(error){
      console.error('FATAL', error);
      return this.fail();
    }
  }

  buildResponse(statusCode: number, body?: any): APIGatewayProxyResultV2 {
    return {
      isBase64Encoded: false,
      statusCode,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
  }

  ok(body?: any): APIGatewayProxyResultV2 {
    return this.buildResponse(200, body);
  }

  created(body?: any): APIGatewayProxyResultV2 {
    return this.buildResponse(201, body);
  }

  validationFailed(message?: string): APIGatewayProxyResultV2 {
    return this.buildResponse(400, { message });
  }

  methodNotAllowed(): APIGatewayProxyResultV2 {
    return this.buildResponse(405, { message: 'Method not allowed' });
  }

  fail(): APIGatewayProxyResultV2 {
    return this.buildResponse(500, { message: 'Internal server error' });
  }
}

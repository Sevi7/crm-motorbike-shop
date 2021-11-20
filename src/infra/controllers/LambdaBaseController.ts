import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { AlreadyExistsError } from '../../shared/errors/AlreadyExistsError';
import { DynamoDbErrors } from '../../shared/errors/DynamoDbErrors';

export abstract class LambdaBaseController {
  abstract runImplementation(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2>;

  async run(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    try {
      return await this.runImplementation(event);
    } catch (error) {
      if (error instanceof DynamoDbErrors) {
        console.error('FATAL DynamoDb Error', error);
        this.fail();
      }
      if (error instanceof AlreadyExistsError) {
        this.conflict();
      }
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

  conflict(message?: string): APIGatewayProxyResultV2 {
    return this.buildResponse(409, { message });
  }

  fail(): APIGatewayProxyResultV2 {
    return this.buildResponse(500, { message: 'Internal server error' });
  }
}

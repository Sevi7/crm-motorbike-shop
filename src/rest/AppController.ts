import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { LambdaBaseController } from '../infra/controllers/LambdaBaseController';
import { CreateCustomerController } from './createCustomer/CreateCustomerController';
import { GetCustomerController } from './getCustomer/GetCustomerController';

export class AppController extends LambdaBaseController {
  async runImplementation(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    if (event.requestContext.http.method === 'POST') {
      return new CreateCustomerController().run(event);
    }
    if (event.requestContext.http.method === 'GET') {
      return new GetCustomerController().run(event);
    }
    return this.methodNotAllowed();
  }
}

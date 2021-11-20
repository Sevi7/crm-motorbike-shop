import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { LambdaBaseController } from '../infra/controllers/LambdaBaseController';
import { CreateCustomerController } from './createCustomer/CreateCustomerController';
import { GetCustomerController } from './getCustomer/GetCustomerController';
import { UpdateCustomerController } from './updateCustomer/UpdateCustomerController';
import { DeleteCustomerController } from './deleteCustomer/DeleteCustomerController';

export class AppController extends LambdaBaseController {
  async runImplementation(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    if (event.requestContext.http.method === 'POST') {
      return new CreateCustomerController().run(event);
    }
    if (event.requestContext.http.method === 'GET') {
      return new GetCustomerController().run(event);
    }
    if (event.requestContext.http.method === 'PUT') {
      return new UpdateCustomerController().run(event);
    }
    if (event.requestContext.http.method === 'DELETE') {
      return new DeleteCustomerController().run(event);
    }
    return this.methodNotAllowed();
  }
}

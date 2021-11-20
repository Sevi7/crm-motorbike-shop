import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { LambdaBaseController } from '../infra/controllers/LambdaBaseController';
import { CreateCustomerController } from './createCustomer/CreateCustomerController';
import { GetCustomerController } from './getCustomer/GetCustomerController';
import { UpdateCustomerController } from './updateCustomer/UpdateCustomerController';
import { DeleteCustomerController } from './deleteCustomer/DeleteCustomerController';
import { AddCreditController } from './addCredit/AddCreditController';

export class AppController extends LambdaBaseController {
  async runImplementation(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    if (event.routeKey === 'POST /customers') {
      return new CreateCustomerController().run(event);
    }
    if (event.routeKey === 'GET /customers/<id>') {
      return new GetCustomerController().run(event);
    }
    if (event.routeKey === 'PUT /customers/<id>') {
      return new UpdateCustomerController().run(event);
    }
    if (event.routeKey === 'DELETE /customers/<id>') {
      return new DeleteCustomerController().run(event);
    }
    if (event.routeKey === 'POST /customers/<id>/credit') {
      return new AddCreditController().run(event);
    }
    return this.notFound('Route not found');
  }
}

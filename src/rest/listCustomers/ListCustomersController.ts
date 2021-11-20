import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { LambdaBaseController } from '../../infra/controllers/LambdaBaseController';
import { customerService } from '../../services/customerService';

export class ListCustomersController extends LambdaBaseController {
  async runImplementation(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    try {
      const customers = await customerService.listCustomersSortedByAvailableCredit();
      return this.ok(customers.map((customer) => customer.toJson()));
    } catch (error: any) {
      console.error('FATAL', error);
      return this.fail();
    }
  }
}

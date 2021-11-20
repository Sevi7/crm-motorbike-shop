import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { ValidationError } from 'joi';
import { LambdaBaseController } from '../../infra/controllers/LambdaBaseController';
import { addCreditConstraints } from './AddCreditConstraints';
import { customerService } from '../../services/customerService';
import { AddCreditDto } from './AddCreditDto';

export class AddCreditController extends LambdaBaseController {
  async runImplementation(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    try {
      const pathParameters = event.pathParameters || {};
      const body = event.body ? JSON.parse(event.body) : {};

      const { error, value: addCreditDto }: { error?: ValidationError; value: AddCreditDto } =
        addCreditConstraints.validate({ ...pathParameters, ...body });
      if (error) {
        return this.validationFailed(error.message);
      }

      const customer = await customerService.getById(addCreditDto.id);
      if (!customer) return this.notFound('Customer not found');

      customer.addCredit(addCreditDto.amount);

      const customerUpdatedDb = await customerService.update(customer);
      return this.ok(customerUpdatedDb.toJson());
    } catch (error: any) {
      console.error('FATAL', error);
      return this.fail();
    }
  }
}

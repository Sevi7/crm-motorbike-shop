import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { ValidationError } from 'joi';
import { LambdaBaseController } from '../../infra/controllers/LambdaBaseController';
import { getCustomerConstraints } from './GetCustomerConstraints';
import { customerService } from '../../services/customerService';
import { GetCustomerDto } from './GetCustomerDto';

export class GetCustomerController extends LambdaBaseController {
  async runImplementation(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    try {
      const { error, value: getCustomerDto }: { error?: ValidationError; value: GetCustomerDto } =
        getCustomerConstraints.validate(event.pathParameters || {});
      if (error) {
        return this.validationFailed(error.message);
      }

      const customer = await customerService.getById(getCustomerDto.id);
      if (!customer) return this.notFound('Customer not found');
      return this.ok(customer.toJson());
    } catch (error: any) {
      console.error('FATAL', error);
      return this.fail();
    }
  }
}

import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { ValidationError } from 'joi';
import { LambdaBaseController } from '../../infra/controllers/LambdaBaseController';
import { deleteCustomerConstraints } from './DeleteCustomerConstraints';
import { customerService } from '../../services/customerService';
import { DeleteCustomerDto } from './DeleteCustomerDto';

export class DeleteCustomerController extends LambdaBaseController {
  async runImplementation(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    try {
      const { error, value: deleteCustomerDto }: { error?: ValidationError; value: DeleteCustomerDto } =
        deleteCustomerConstraints.validate(event.pathParameters || {});
      if (error) {
        return this.validationFailed(error.message);
      }

      const customer = await customerService.deleteById(deleteCustomerDto.id);
      if (!customer) return this.notFound('Customer not found');
      return this.ok(customer.toJson());
    } catch (error: any) {
      console.error('FATAL', error);
      return this.fail();
    }
  }
}

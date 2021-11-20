import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { ValidationError } from 'joi';
import { LambdaBaseController } from '../../infra/controllers/LambdaBaseController';
import { updateCustomerConstraints } from './UpdateCustomerConstraints';
import { customerService } from '../../services/customerService';
import { UpdateCustomerDto } from './UpdateCustomerDto';
import { customerFactoryFromDto } from '../customerFactoryFromDto';
import { NotExistsError } from '../../shared/errors/NotExistsError';

export class UpdateCustomerController extends LambdaBaseController {
  async runImplementation(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    try {
      const pathParameters = event.pathParameters || {};
      const body = event.body ? JSON.parse(event.body) : {};

      const {
        error,
        value: updateCustomerDto,
      }: { error?: ValidationError; value: UpdateCustomerDto } = updateCustomerConstraints.validate(
        { ...pathParameters, ...body }
      );
      if (error) {
        return this.validationFailed(error.message);
      }

      const customer = await customerService.getById(updateCustomerDto.id);
      if (!customer) return this.notFound('Customer not found');

      customer.identityDocument = updateCustomerDto.identityDocument;
      customer.birthDate = updateCustomerDto.birthDate;
      customer.email = updateCustomerDto.email;
      customer.phoneNumber = updateCustomerDto.phoneNumber;
      customer.address = updateCustomerDto.address;
      customer.postalCode = updateCustomerDto.postalCode;
      customer.city = updateCustomerDto.city;
      customer.state = updateCustomerDto.state;
      customer.country = updateCustomerDto.country;

      const customerFromDb = await customerService.update(customer);
      return this.ok(customerFromDb.toJson());
    } catch (error: any) {
      if (error instanceof NotExistsError) {
        return this.notFound('Customer not found');
      }
      console.error('FATAL', error);
      return this.fail();
    }
  }
}

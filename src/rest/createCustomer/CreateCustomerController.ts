import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { ValidationError } from 'joi';
import { v4 as uuidv4 } from 'uuid';
import { LambdaBaseController } from '../../infra/controllers/LambdaBaseController';
import { createCustomerConstraints } from './CreateCustomerConstraints';
import { customerService } from '../../services/customerService';
import { CreateCustomerDto } from './CreateCustomerDto';
import { AlreadyExistsError } from '../../shared/errors/AlreadyExistsError';
import { Customer } from '../../domain/models/Customer';

const buildCustomerFromDto = (customerDto: CreateCustomerDto): Customer => {
  const { availableCredit, ...rest } = customerDto;
  return new Customer({
    id: uuidv4(),
    availableCredit: availableCredit || 0,
    ...rest,
  });
};

export class CreateCustomerController extends LambdaBaseController {
  async runImplementation(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    try {
      const body = event.body ? JSON.parse(event.body) : {};

      const {
        error,
        value: createCustomerDto,
      }: { error?: ValidationError; value: CreateCustomerDto } =
        createCustomerConstraints.validate(body);
      if (error) {
        return this.validationFailed(error.message);
      }

      const customer = buildCustomerFromDto(createCustomerDto);
      const customerFromDb = await customerService.create(customer);
      return this.created(customerFromDb.toJson());
    } catch (error: any) {
      if (error instanceof AlreadyExistsError) {
        return this.conflict('Customer already exists');
      }
      console.error('FATAL', error);
      return this.fail();
    }
  }
}

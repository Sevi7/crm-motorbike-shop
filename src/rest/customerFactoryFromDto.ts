import { Customer } from '../domain/models/Customer';
import { CreateCustomerDto } from './createCustomer/CreateCustomerDto';
import { v4 as uuidv4 } from 'uuid';

export const customerFactoryFromDto = {
  buildCustomerFromDto(customerDto: CreateCustomerDto): Customer {
    const { availableCredit, ...rest } = customerDto;
    return new Customer({
      id: uuidv4(),
      availableCredit: availableCredit || 0,
      ...rest,
    });
  },
};

import { CustomerService } from './CustomerService';
import { customerRepository } from '../../infra/repositories/customerRepository';

export const customerService = new CustomerService(customerRepository);

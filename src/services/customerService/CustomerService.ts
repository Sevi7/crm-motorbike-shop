import { Customer } from '../../domain/models/Customer';
import { CustomerRepository } from '../../infra/repositories/customerRepository/CustomerRepository';

export class CustomerService {
  constructor(private customerRepository: CustomerRepository) {}

  async put(customer: Customer): Promise<Customer> {
    return this.customerRepository.put(customer);
  }

  async getById(id: string): Promise<Customer | null> {
    return this.customerRepository.getById(id);
  }
}

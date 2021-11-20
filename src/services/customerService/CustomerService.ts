import { Customer } from '../../domain/models/Customer';
import { CustomerRepository } from '../../infra/repositories/customerRepository/CustomerRepository';

export class CustomerService {
  constructor(private customerRepository: CustomerRepository) {}

  async create(customer: Customer): Promise<Customer> {
    return this.customerRepository.create(customer);
  }

  async getById(id: string): Promise<Customer | null> {
    return this.customerRepository.getById(id);
  }

  async update(customer: Customer): Promise<Customer> {
    return this.customerRepository.update(customer);
  }
}

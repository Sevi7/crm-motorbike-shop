import { CustomerRepository } from './CustomerRepository';
import { dynamoDbService } from '../../providers/dynamoDbService';

export const customerRepository = new CustomerRepository(dynamoDbService);

import { Customer } from '../../src/domain/models/Customer';
import { GeneralError } from '../../src/shared/errors/GeneralError';

describe('addCredit Customer model method', () => {
  test('add credit positive amount', () => {
    const customer = new Customer({ id: '123', name: 'John', lastName: 'Doe', availableCredit: 0 });
    customer.addCredit(12);
    expect(customer.availableCredit).toEqual(12);
  });

  test('add credit negative amount', () => {
    const customer = new Customer({ id: '123', name: 'John', lastName: 'Doe', availableCredit: 0 });
    expect(() => customer.addCredit(-12)).toThrow(GeneralError);
    expect(() => customer.addCredit(-12)).toThrow('Amount cannot be negative');
  });

  test('add credit positive amount with decimals', () => {
    const customer = new Customer({ id: '123', name: 'John', lastName: 'Doe', availableCredit: 0 });
    customer.addCredit(12.23);
    expect(customer.availableCredit).toEqual(12.23);
  });

  test('add credit twice should add credit on top', () => {
    const customer = new Customer({ id: '123', name: 'John', lastName: 'Doe', availableCredit: 0 });
    customer.addCredit(12);
    customer.addCredit(18);
    expect(customer.availableCredit).toEqual(30);
  });
});

import { Customer } from '../../domain/models/Customer';

export const customerFactoryFromDb = {
  buildCustomerFromDb(customerDb: any): Customer {
    return new Customer({
      id: customerDb.id,
      name: customerDb.name,
      lastName: customerDb.lastName,
      identityDocument: customerDb.identityDocument,
      birthDate: customerDb.birthDate,
      email: customerDb.email,
      phoneNumber: customerDb.phoneNumber,
      address: customerDb.address,
      postalCode: customerDb.postalCode,
      city: customerDb.city,
      state: customerDb.state,
      country: customerDb.country,
      availableCredit: customerDb.availableCredit,
    });
  },
};

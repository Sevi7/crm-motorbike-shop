export interface CreateCustomerDto {
  name: string;
  lastName: string;
  identityDocument: string;
  birthDate: number;
  email: string;
  phoneNumber: string;
  address: string;
  postalCode: string;
  city: string;
  state: string;
  country: string;
  availableCredit: number;
}

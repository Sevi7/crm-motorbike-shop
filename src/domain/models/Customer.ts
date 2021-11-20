interface CustomerConstructorParams {
  id: string;
  name: string;
  lastName: string;
  identityDocument?: string;
  birthDate?: number;
  email?: string;
  phoneNumber?: string;
  address?: string;
  postalCode?: string;
  city?: string;
  state?: string;
  country?: string;
  availableCredit: number;
}

export class Customer {
  private _id: string;

  private _name: string;

  private _lastName: string;

  private _identityDocument?: string;

  private _birthDate?: number;

  private _email?: string;

  private _phoneNumber?: string;

  private _address?: string;

  private _postalCode?: string;

  private _city?: string;

  private _state?: string;

  private _country?: string;

  private _availableCredit: number;

  constructor(params: CustomerConstructorParams) {
    this._id = params.id;
    this._name = params.name;
    this._lastName = params.lastName;
    this._identityDocument = params.identityDocument;
    this._birthDate = params.birthDate;
    this._email = params.email;
    this._phoneNumber = params.phoneNumber;
    this._address = params.address;
    this._postalCode = params.postalCode;
    this._city = params.city;
    this._state = params.state;
    this._country = params.country;
    this._availableCredit = params.availableCredit;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get lastName() {
    return this._lastName;
  }

  get identityDocument() {
    return this._identityDocument;
  }

  set identityDocument(identityDocument: string | undefined) {
    this._identityDocument = identityDocument;
  }

  get birthDate() {
    return this._birthDate;
  }

  set birthDate(birthDate: number | undefined) {
    this._birthDate = birthDate;
  }

  get email() {
    return this._email;
  }

  set email(email: string | undefined) {
    this._email = email;
  }

  get phoneNumber() {
    return this._phoneNumber;
  }

  set phoneNumber(phoneNumber: string | undefined) {
    this._phoneNumber = phoneNumber;
  }

  get address() {
    return this._address;
  }

  set address(address: string | undefined) {
    this._address = address;
  }

  get postalCode() {
    return this._postalCode;
  }

  set postalCode(postalCode: string | undefined) {
    this._postalCode = postalCode;
  }

  get city() {
    return this._city;
  }

  set city(city: string | undefined) {
    this._city = city;
  }

  get state() {
    return this._state;
  }

  set state(state: string | undefined) {
    this._state = state;
  }

  get country() {
    return this._country;
  }

  set country(country: string | undefined) {
    this._country = country;
  }

  get availableCredit() {
    return this._availableCredit;
  }

  toJson() {
    return {
      id: this._id,
      name: this._name,
      lastName: this._lastName,
      identityDocument: this._identityDocument,
      birthDate: this._birthDate,
      email: this._email,
      phoneNumber: this._phoneNumber,
      address: this._address,
      postalCode: this._postalCode,
      city: this._city,
      state: this._state,
      country: this._country,
      availableCredit: this._availableCredit,
    };
  }
}

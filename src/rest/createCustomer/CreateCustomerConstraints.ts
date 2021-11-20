import Joi from 'joi';

export const createCustomerConstraints = Joi.object({
  name: Joi.string().required(),
  lastName: Joi.string().required(),
  identityDocument: Joi.string().alphanum(),
  birthDate: Joi.date().iso().cast('number'),
  email: Joi.string().email(),
  phoneNumber: Joi.string(),
  address: Joi.string(),
  postalCode: Joi.string(),
  city: Joi.string(),
  state: Joi.string(),
  country: Joi.string(),
  availableCredit: Joi.number().greater(0),
})
  .with('address', ['postalCode', 'city', 'country'])
  .xor('email', 'phoneNumber');

import Joi from 'joi';

export const updateCustomerConstraints = Joi.object({
  id: Joi.string().uuid().required(),
  identityDocument: Joi.string().alphanum(),
  birthDate: Joi.date().iso().cast('number'),
  email: Joi.string().email(),
  phoneNumber: Joi.string(),
  address: Joi.string(),
  postalCode: Joi.string(),
  city: Joi.string(),
  state: Joi.string(),
  country: Joi.string(),
})
  .with('address', ['postalCode', 'city', 'country'])
  .or('email', 'phoneNumber');

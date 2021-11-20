import Joi from 'joi';

export const deleteCustomerConstraints = Joi.object({
  id: Joi.string().uuid().required(),
});

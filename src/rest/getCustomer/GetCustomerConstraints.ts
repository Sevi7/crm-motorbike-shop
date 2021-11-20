import Joi from 'joi';

export const getCustomerConstraints = Joi.object({
  id: Joi.string().uuid().required(),
})

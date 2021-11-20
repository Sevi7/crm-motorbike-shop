import Joi from 'joi';

export const addCreditConstraints = Joi.object({
  id: Joi.string().uuid().required(),
  amount: Joi.number().greater(0).required(),
});

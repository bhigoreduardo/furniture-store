import { Joi } from 'express-validation'

// SAVE
export const save = {
  body: Joi.object({
    order: Joi.string().alphanum().length(24).required(),
    cartItem: Joi.string().alphanum().length(24).required(),
    description: Joi.string().required(),
    stars: Joi.number().required(),
  }),
}

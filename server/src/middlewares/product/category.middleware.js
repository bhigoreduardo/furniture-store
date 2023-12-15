import { Joi } from 'express-validation'

// SAVE
export const save = {
  body: Joi.object({
    parent: Joi.string().alphanum().length(24).allow('').optional(),
    name: Joi.string().required(),
    description: Joi.string().allow('').optional(),
    image: Joi.string().required(),
  }),
}

// UPDATE
export const update = {
  params: Joi.object({
    id: Joi.string().alphanum().length(24).required(),
  }),
  body: Joi.object({
    parent: Joi.string().alphanum().length(24).allow('').optional(),
    name: Joi.string().required(),
    description: Joi.string().allow('').optional(),
    image: Joi.string().required(),
    product: Joi.array().items(Joi.string().allow('')).optional(),
  }),
}

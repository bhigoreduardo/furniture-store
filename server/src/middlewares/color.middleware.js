import { Joi } from 'express-validation'

export const save = {
  body: Joi.object({
    name: Joi.string().required(),
    color: Joi.string().required(),
    description: Joi.string().allow('').optional(),
  }),
}

export const update = {
  params: Joi.object({
    id: Joi.string().alphanum().length(24).required(),
  }),
  body: Joi.object({
    name: Joi.string().required(),
    color: Joi.string().required(),
    description: Joi.string().allow('').optional(),
  }),
}

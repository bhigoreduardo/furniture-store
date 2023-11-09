import { Joi } from 'express-validation'

export const save = {
  body: Joi.object({
    name: Joi.string().min(2).max(200).required(),
    cpf: Joi.string().length(11).required(),
    email: Joi.string().email().required(),
    whatsApp: Joi.string().length(11).required(),
  }),
}

export const update = {
  body: Joi.object({
    name: Joi.string().min(2).max(200).optional(),
    cpf: Joi.string().length(11).optional(),
    whatsApp: Joi.string().length(11).optional(),
    address: Joi.object({
      street: Joi.string().required(),
      neighborhood: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      number: Joi.optional(),
      zipCode: Joi.string().required(),
      complement: Joi.optional(),
    }).optional(),
    image: Joi.string().allow('').optional(),
  }),
}

import { Joi } from 'express-validation'

// UPDATE
export const update = {
  body: Joi.object({
    _type: Joi.string().required(),
    name: Joi.string().min(2).max(200).optional(),
    email: Joi.string().email().optional(),
    whatsApp: Joi.string().length(11).optional(),
    cpf: Joi.string().length(11).optional(),
    image: Joi.string().allow('').optional(),
    address: Joi.object({
      street: Joi.string().required(),
      neighborhood: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      number: Joi.optional(),
      zipCode: Joi.string().required(),
      complement: Joi.optional(),
    }).optional(),
  }),
}

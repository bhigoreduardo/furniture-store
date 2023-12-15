import { Joi } from 'express-validation'

// UPDATE
export const update = {
  params: Joi.object({
    id: Joi.string().alphanum().length(24).required(),
  }),
  body: Joi.object({
    _type: Joi.string().required(),
    name: Joi.string().min(2).max(200).optional(),
    email: Joi.string().email().optional(),
    contactEmail: Joi.string().email().optional(),
    phone: Joi.string().length(10).optional(),
    whatsApp: Joi.string().length(11).optional(),
    cnpj: Joi.string().length(14).optional(),
    ie: Joi.string().optional(),
    clockAvailable: Joi.string().optional(),
    site: Joi.string().optional(),
    description: Joi.string().optional(),
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
    socialMedia: Joi.object({
      facebook: Joi.string().allow('').optional(),
      instagram: Joi.string().allow('').optional(),
      twitter: Joi.string().allow('').optional(),
      linkedin: Joi.string().allow('').optional(),
      pinterest: Joi.string().allow('').optional(),
      youtube: Joi.string().allow('').optional(),
    }).optional(),
  }),
}

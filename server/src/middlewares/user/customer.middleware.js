import { Joi } from 'express-validation'

// AUTH
export const signUp = {
  body: Joi.object({
    name: Joi.string().min(2).max(200).required(),
    cpf: Joi.string().length(11).required(),
    email: Joi.string().email().required(),
    whatsApp: Joi.string().length(11).required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
    repeatPassword: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
    terms: Joi.bool().required(),
  }),
}

export const confirmSignUp = {
  body: Joi.object({
    activatedToken: Joi.string().required(),
  }),
}

export const activatedToken = {
  body: Joi.object({
    email: Joi.string().email().required(),
  }),
}

// UPDATE
export const update = {
  body: Joi.object({
    _type: Joi.string().required(),
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

import { Joi } from 'express-validation'

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

export const signIn = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
  }),
}

export const generateRecoveryPassword = {
  body: Joi.object({
    email: Joi.string().email().required(),
  }),
}

export const recoveryPassword = {
  body: Joi.object({
    passwordResetToken: Joi.string().required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
    repeatPassword: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
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
    image: Joi.string().optional(),
  }),
}

export const changePassword = {
  body: Joi.object({
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
    repeatPassword: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
    newPassword: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
  }),
}

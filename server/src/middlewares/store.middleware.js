import { Joi } from 'express-validation'

export const signUp = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
    repeatPassword: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
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
    email: Joi.string().email().optional(),
    contactEmail: Joi.string().email().optional(),
    phone: Joi.string().length(10).optional(),
    whatsApp: Joi.string().length(11).optional(),
    cnpj: Joi.string().length(14).optional(),
    ie: Joi.string().optional(),
    clockAvailable: Joi.string().optional(),
    site: Joi.string().optional(),
    description: Joi.string().optional(),
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
    image: Joi.string().allow('').optional(),
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
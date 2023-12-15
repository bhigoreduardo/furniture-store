import { Joi } from 'express-validation'

// SAVE
export const save = {
  body: Joi.object({
    name: Joi.string().min(2).max(200).required(),
    email: Joi.string().email().required(),
    whatsApp: Joi.string().length(11).required(),
    address: Joi.object({
      street: Joi.string().required(),
      neighborhood: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      number: Joi.optional(),
      zipCode: Joi.string().required(),
      complement: Joi.optional(),
    }).required(),
    payment: Joi.object({
      method: Joi.string().alphanum().length(24).required(),
      availableInstallments: Joi.boolean().required(),
      cardName: Joi.string().optional().allow(''),
      cardNumber: Joi.number().optional().allow(''),
      cardDate: Joi.string().optional().allow(''),
      cardCvv: Joi.number().optional().allow(''),
      installments: Joi.number().optional().allow(''),
    }),
    cart: Joi.array()
      .items(
        Joi.object({
          product: Joi.string().alphanum().length(24).required(),
          color: Joi.string().alphanum().length(24).required(),
          quantity: Joi.number().required(),
        })
      )
      .required(),
    obs: Joi.string().optional().allow(''),
  }),
}

// UPDATE
export const changeStatus = {
  params: Joi.object({
    id: Joi.string().alphanum().length(24).required(),
  }),
  body: Joi.object({
    status: Joi.string().required(),
  }),
}

// SEARCH
export const findByCodeCustomers = {
  params: Joi.object({
    code: Joi.string().alphanum().length(8).required(),
  }),
}

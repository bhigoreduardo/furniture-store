import { Joi } from 'express-validation'

export const save = {
  body: Joi.object({
    image: Joi.string().required(),
    method: Joi.string().required(),
    availableInstallments: Joi.boolean().required(),
    infoInstallments: Joi.array()
      .items(
        Joi.object({
          installments: Joi.number().required(),
          fee: Joi.number().required(),
        })
      )
      .optional(),
  }),
}

export const update = {
  params: Joi.object({
    id: Joi.string().alphanum().length(24).required(),
  }),
  body: Joi.object({
    image: Joi.string().required(),
    method: Joi.string().required(),
    availableInstallments: Joi.boolean().required(),
    infoInstallments: Joi.array()
      .items(
        Joi.object({
          installments: Joi.number().required(),
          fee: Joi.number().required(),
        })
      )
      .optional(),
  }),
}

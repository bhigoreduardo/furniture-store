import { Joi } from 'express-validation'

// SAVE
export const save = {
  body: Joi.object({
    image: Joi.string().required(),
    method: Joi.string().required(),
    availableGateway: Joi.boolean().required(),
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

// UPDATE
export const update = {
  params: Joi.object({
    id: Joi.string().alphanum().length(24).required(),
  }),
  ...save,
}

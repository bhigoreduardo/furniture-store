import { Joi } from 'express-validation'

// SAVE
export const save = {
  body: Joi.object({
    name: Joi.string().required(),
    complement: Joi.string().optional().allow(''),
    discountType: Joi.string().required(),
    offerType: Joi.string().required(),
    offerValue: Joi.number().required(),
    offerPriceDates: Joi.array()
      .items(Joi.string().allow('').allow(null).optional())
      .optional(),
    status: Joi.boolean().required(),
    usageLimit: Joi.object({
      maxCart: Joi.number().optional().allow(null),
      minCart: Joi.number().optional().allow(null),
      maxCustomer: Joi.number().optional().allow(null),
    }).optional(),
    everyOne: Joi.boolean().required(),
    category: Joi.array()
      .items(Joi.string().alphanum().length(24).required())
      .optional(),
    brand: Joi.array()
      .items(Joi.string().alphanum().length(24).required())
      .optional(),
    product: Joi.array()
      .items(Joi.string().alphanum().length(24).required())
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

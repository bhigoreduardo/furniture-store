import { Joi } from 'express-validation'

export const save = {
  body: Joi.object({
    status: Joi.boolean().required(),
    name: Joi.string().required(),
    sku: Joi.string().allow('').optional(),
    code: Joi.string().allow('').optional(),
    description: Joi.object({
      overview: Joi.string().required(),
      otherInfos: Joi.array()
        .items(
          Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
          })
        )
        .optional(),
    }).required(),
    additional: Joi.object({
      detail: Joi.string().required(),
      otherInfos: Joi.array()
        .items(
          Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
          })
        )
        .optional(),
    }).required(),
    specification: Joi.array()
      .items(
        Joi.object({
          title: Joi.string().required(),
          description: Joi.string().required(),
        })
      )
      .required(),
    productData: Joi.object({
      inventory: Joi.object({
        manageStock: Joi.boolean().required(),
        stockStatus: Joi.boolean().required(),
        lowStockWarning: Joi.boolean().required(),
        info: Joi.array()
          .items(
            Joi.object({
              color: Joi.string().alphanum().length(24).required(),
              stock: Joi.number().required(),
              price: Joi.number().required(),
              offer: Joi.object({
                offerValue: Joi.number().required(),
                offerType: Joi.string().allow('').required(),
                offerPrice: Joi.number().required(),
                offerPriceDates: Joi.array()
                  .items(Joi.string().allow('').allow(null).optional())
                  .optional(),
              }).optional(),
              featured: Joi.boolean().required(),
            })
          )
          .required(),
      }).required(),
      shippingInfo: Joi.object({
        weight: Joi.number().required(),
        length: Joi.number().required(),
        width: Joi.number().required(),
        height: Joi.number().required(),
        fee: Joi.number().required(),
        timeDelivery: Joi.number().required(),
        isFree: Joi.boolean().required(),
      }).required(),
    }).required(),
    seoData: Joi.object({
      slug: Joi.string().required(),
      metaTitle: Joi.string().required(),
      metaDescription: Joi.string().allow('').optional(),
    }).required(),
    published: Joi.object({
      step: Joi.string().required(),
      visibility: Joi.string().required(),
    }).required(),
    category: Joi.array()
      .items(Joi.string().alphanum().length(24).required())
      .required(),
    brand: Joi.string().alphanum().length(24).required(),
    tags: Joi.array().items(Joi.string()).optional(),
    cover: Joi.string().required(),
    backCover: Joi.string().required(),
    gallery: Joi.array().items(Joi.string()).required(),
    video: Joi.string().allow('').optional(),
  }),
}

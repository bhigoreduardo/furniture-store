import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'

import { OfferTypeEnum } from './inventory.model.js'

const DiscountTypeEnum = {
  Coupon: 'coupon',
  Offer: 'offer',
}

const OfferSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Nome é obrigatório'] },
    complement: { type: String },
    discountType: {
      type: String,
      enum: DiscountTypeEnum,
      default: DiscountTypeEnum.Offer,
    },
    offerType: {
      type: String,
      enum: OfferTypeEnum,
      required: [true, 'Tipo da oferta é obrigatório'],
    },
    offerValue: {
      type: Number,
      required: [true, 'Valor do desconto é obrigatório'],
    },
    offerPriceDates: { type: [{ type: Date }] },
    status: { type: Boolean, default: true },
    usageLimit: {
      type: {
        maxCart: { type: Number, default: 0 },
        minCart: { type: Number, default: 0 },
        maxCustomer: { type: Number, default: 0 },
      },
      default: {},
      _id: false,
    },
  },
  { timestamps: true }
)

OfferSchema.plugin(mongoosePaginate)

export default mongoose.model('Offer', OfferSchema)

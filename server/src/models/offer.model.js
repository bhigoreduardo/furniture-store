import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'

import { DiscountEnum } from '../types/offer.type.js'
import { OfferEnum } from '../types/product.type.js'

const OfferSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Nome é obrigatório'] },
    complement: { type: String },
    discountType: {
      type: String,
      enum: DiscountEnum,
      default: DiscountEnum.Offer,
    },
    offerType: {
      type: String,
      enum: OfferEnum,
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
    everyOne: { type: Boolean, default: false },
    category: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
      default: [],
    },
    brand: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Brand' }],
      default: [],
    },
    product: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
      default: [],
    },
  },
  { timestamps: true }
)

OfferSchema.plugin(mongoosePaginate)

export default mongoose.model('Offer', OfferSchema)

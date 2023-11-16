import mongoose from 'mongoose'

const OfferTypeEnum = {
  Default: '',
  Percentage: 'percentage',
  Money: 'money',
}

const InventorySchema = new mongoose.Schema({
  color: { type: mongoose.Types.ObjectId, ref: 'Color' },
  stock: {
    type: Number,
    required: [true, 'Quantidade de estoque é obrigatório'],
  },
  price: { type: Number, required: [true, 'Preço é obrigatório'] },
  offer: {
    type: {
      offerValue: { type: Number },
      offerType: {
        type: String,
        enum: OfferTypeEnum,
        default: OfferTypeEnum.Default,
      },
      offerPrice: { type: Number },
      offerPriceDates: { type: [{ type: Date }] },
    },
    _id: false,
  },
  featured: {
    type: Boolean,
    default: true,
    required: [true, 'Pronta entrega é obrigatório'],
  },
})

export default mongoose.model('Inventory', InventorySchema)

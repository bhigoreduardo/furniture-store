import mongoose from 'mongoose'

const OfferTypeEnum = {
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
      offerValue: {
        type: Number,
        required: [true, 'Preço de desconto é obrigatório'],
      },
      offerType: {
        type: String,
        enum: OfferTypeEnum,
        required: [true, 'Tipo de desconto é obrigatório'],
      },
      offerPrice: { type: Number },
      offerPriceDates: {
        type: {
          createdAt: { type: Date, default: Date.now() },
          expiresIn: { type: Date },
        },
      },
    },
  },
  featured: { type: Boolean, default: true },
})

export default mongoose.model('Inventory', InventorySchema)

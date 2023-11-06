import mongoose from 'mongoose'

const StepEnumType = {
  Draft: 'draft',
  Completed: 'completed',
}
const VisibilityEnumType = {
  Private: 'private',
  Public: 'public',
}

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Nome é obrigatório'],
      unique: true,
    },
    sku: { type: String },
    code: { type: String },
    description: {
      type: {
        overview: {
          type: String,
          required: [true, 'Descrição é obrigatório '],
        },
        otherInfos: [{ title: String, description: String }],
      },
      required: [true, 'Descrição é obrigatório'],
    },
    additional: {
      type: {
        detail: {
          type: String,
          required: [true, 'Detalhe é obrigatório '],
        },
        otherInfos: [{ title: String, description: String }],
      },
      required: [true, 'Informação adicional é obrigatório'],
    },
    specification: {
      type: [{ title: String, description: String }],
      required: [true, 'Especificação é obrigatório'],
    },
    productData: {
      type: {
        media: { type: mongoose.Types.ObjectId, ref: 'Media' },
        inventory: {
          manageStock: { type: Boolean, default: true },
          stockStatus: { type: Boolean, default: true },
          lowStockWarning: { type: Boolean, default: true },
          info: { type: mongoose.Types.ObjectId, ref: 'Inventory' },
        },
        shippingInfo: {
          weight: { type: Number, required: [true, 'Peso é obrigatório'] },
          length: {
            type: Number,
            required: [true, 'Comprimento é obrigatório'],
          },
          width: { type: Number, required: [true, 'Largura é obrigatório'] },
          height: { type: Number, required: [true, 'Altura é obrigatório'] },
          fee: { type: Number, required: [true, 'Frete é obrigatório'] },
          timeDelivery: {
            type: Number,
            required: [true, 'Tempo de entrega é obrigatório'],
          },
          ifFree: { type: Boolean, default: false },
        },
      },
    },
    seoData: {
      type: {
        slug: {
          type: String,
          required: [true, 'Slug é obrigatório'],
          unique: true,
        },
        metaTitle: { type: String, required: [true, 'Título é obrigatório'] },
        metaDescription: { type: String },
      },
    },
    published: {
      type: {
        step: {
          type: String,
          enum: StepEnumType,
          default: StepEnumType.Completed,
        },
        visibility: {
          type: String,
          enum: VisibilityEnumType,
          default: VisibilityEnumType.Public,
        },
        publishedOn: { type: Date, default: Date.now() },
      },
    },
    category: { type: mongoose.Types.ObjectId, ref: 'Category' },
    brand: { type: mongoose.Types.ObjectId, ref: 'Brand' },
    tags: [{ type: String }],
    rangePrice: { type: { min: Number, max: Number, avg: Number } },
    status: { type: Boolean, default: true },
    // sales/amountSales/reviews/reviewsAvg
  },
  { timestamps: true }
)

export default mongoose.model('Product', ProductSchema)

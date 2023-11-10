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
      _id: false,
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
      _id: false,
    },
    specification: {
      type: [{ title: String, description: String }],
      required: [true, 'Especificação é obrigatório'],
      _id: false,
    },
    productData: {
      type: {
        media: { type: mongoose.Schema.Types.ObjectId, ref: 'Media' },
        inventory: {
          type: {
            manageStock: { type: Boolean, default: true },
            stockStatus: { type: Boolean, default: true },
            lowStockWarning: { type: Boolean, default: true },
            info: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Inventory' }],
          },
          required: [true, 'Inventório é obrigatório'],
          _id: false,
        },
        shippingInfo: {
          type: {
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
            isFree: {
              type: Boolean,
              default: false,
              required: [true, 'Frete gratís é obrigatório definir'],
            },
          },
          required: [true, 'Informação de entrega é obrigatório'],
          _id: false,
        },
      },
      _id: false,
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
      _id: false,
    },
    published: {
      type: {
        step: {
          type: String,
          enum: StepEnumType,
          default: StepEnumType.Completed,
          required: [true, 'Etapa de publicação é obrigatório'],
        },
        visibility: {
          type: String,
          enum: VisibilityEnumType,
          default: VisibilityEnumType.Public,
          required: [true, 'Visibilidade da publicação é obrigatório'],
        },
      },
      _id: false,
    },
    category: {
      type: [{ type: mongoose.Types.ObjectId, ref: 'Category' }],
      min: [1, 'Pelo menos 1 categoria é obrigatório'],
      required: [true, 'Categoria é obrigatório'],
    },
    brand: {
      type: mongoose.Types.ObjectId,
      ref: 'Brand',
      required: [true, 'Marca é obrigatório'],
    },
    tags: [{ type: String }],
    rangePrice: { type: { min: Number, max: Number, avg: Number }, _id: false },
    status: {
      type: Boolean,
      default: true,
      required: [true, 'Status do produto é obrigatório'],
    },
    // sales/amountSales/reviews/reviewsAvg
  },
  { timestamps: true }
)

export default mongoose.model('Product', ProductSchema)

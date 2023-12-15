import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'

const CategorySchema = new mongoose.Schema(
  {
    parent: { type: mongoose.Types.ObjectId, ref: 'Category' },
    name: {
      type: String,
      required: [true, 'Nome é obrigatório'],
      unique: [true, 'Nome já cadastrado'],
    },
    slug: {
      type: String,
      required: [true, 'Slug é obrigatório'],
      unique: [true, 'Slug já cadastrado'],
    },
    description: { type: String },
    image: { type: String, requied: [true, 'Image é obrigatório'] },
    products: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
      default: [],
    },
    spotlights: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
      default: [],
    },
    store: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    banner: {
      type: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: [true, 'Produto é obrigatório'],
          },
          shortDescription: {
            type: String,
            required: [true, 'Descrição breve é obrigatório'],
          },
          bagde: { type: String },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
)

CategorySchema.plugin(mongoosePaginate)

export default mongoose.model('Category', CategorySchema)

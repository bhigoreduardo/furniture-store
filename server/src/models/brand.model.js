import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'

const BrandSchema = new mongoose.Schema(
  {
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
    products: { type: [{ type: mongoose.Schema.Types.ObjectId }], default: [] },
  },
  { timestamps: true }
)

BrandSchema.plugin(mongoosePaginate)

export default mongoose.model('Brand', BrandSchema)

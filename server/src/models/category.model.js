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
    // products
    // spotlights
    // header
    // store
  },
  { timestamps: true }
)

CategorySchema.plugin(mongoosePaginate)

export default mongoose.model('Category', CategorySchema)

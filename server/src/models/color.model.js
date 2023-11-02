import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'

const ColorSchema = new mongoose.Schema(
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
    color: { type: String, required: [true, 'Cor é obrigatório'] },
    description: { type: String },
    // products
  },
  { timestamps: true }
)

ColorSchema.plugin(mongoosePaginate)

export default mongoose.model('Color', ColorSchema)

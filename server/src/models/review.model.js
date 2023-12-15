import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'

const ReviewSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Cliente é obrigatório'],
    },
    stars: {
      type: Number,
      max: 5,
      default: 1,
      required: [true, 'Avaliação é obrigatório'],
    },
    description: { type: String, required: [true, 'Descrição é obrigatório'] },
  },
  { timestamps: true }
)

ReviewSchema.plugin(mongoosePaginate)

export default mongoose.model('Review', ReviewSchema)

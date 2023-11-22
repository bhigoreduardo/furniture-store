import mongoose from 'mongoose'

const ReviewSchema = new mongoose.Schema(
  {
    customer: { type: String, required: [true, 'Cliente é obrigatório'] },
    image: { type: String },
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

export default mongoose.model('Review', ReviewSchema)

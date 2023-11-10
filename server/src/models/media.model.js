import mongoose from 'mongoose'

const MediaSchema = new mongoose.Schema({
  cover: { type: String, required: [true, 'Capa frente é obrigatório'] },
  backCover: { type: String, required: [true, 'Capa verso é obrigatório'] },
  gallery: {
    type: [{ type: String }],
    min: [2, 'Mínimo 2 images'],
    required: [true, 'Galeria é obrigatório'],
  },
  video: { type: String },
})

export default mongoose.model('Media', MediaSchema)

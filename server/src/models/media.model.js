import mongoose from 'mongoose'

const MediaSchema = new mongoose.Schema({
  covers: [
    { type: { imageURL: String, main: { type: Boolean, default: false } } },
  ],
  gallery: [{ type: String }],
  video: [{ type: String }],
})

export default mongoose.model('Media', MediaSchema)

import mongoose from 'mongoose'

const PaymentSchema = new mongoose.Schema({
  image: { type: String, required: [true, 'Imagem é obrigatório'] },
  method: {
    type: String,
    required: [true, 'Método é obrigatório'],
    unique: true,
  },
  availableInstallments: { type: Boolean, default: false },
  infoInstallments: {
    type: [{ installments: { type: String }, fee: { type: String } }],
  },
})

export default mongoose.model('Payment', PaymentSchema)

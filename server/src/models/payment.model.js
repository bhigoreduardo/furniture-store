import mongoose from 'mongoose'

const PaymentSchema = new mongoose.Schema({
  image: { type: String, required: [true, 'Imagem é obrigatório'] },
  method: {
    type: String,
    required: [true, 'Método é obrigatório'],
    unique: true,
  },
  availableGateway: { type: Boolean, default: false },
  availableInstallments: { type: Boolean, default: false },
  infoInstallments: {
    type: [
      { installments: { type: Number }, fee: { type: Number }, _id: false },
    ],
  },
})

export default mongoose.model('Payment', PaymentSchema)

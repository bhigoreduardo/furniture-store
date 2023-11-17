import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'

export const StatusEnumType = {
  Created: 'created',
  Pending: 'pending',
  Paid: 'paid',
  Canceled: 'canceled',
  Progress: 'progress',
  Traffic: 'traffic',
  Delivered: 'delivered',
}

const OrderSchema = new mongoose.Schema(
  {
    customer: {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: [true, 'Cliente é obrigatório'],
      },
      name: {
        type: String,
        required: [true, 'Nome é obrigatório'],
        min: [2, 'Nome deve possuir pelo menos 2 caracteres'],
        max: [200, 'Nome deve possuir até 200 caracteres'],
      },
      email: {
        type: String,
        required: [true, 'Email é obrigatório'],
        match: [/\S+@\S+\.\S+/, 'Informe email válido'],
        lowercase: true,
      },
      whatsApp: {
        type: String,
        required: [true, 'Celular é obrigatório'],
        min: 11,
        max: 11,
      },
    },
    code: { type: String, required: [true, 'Código do pedido é obrigatório'] },
    cart: {
      type: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: [true, 'Produto é obrigatório'],
          },
          color: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Color',
            required: [true, 'Cor é orbrigatório'],
          },
          name: { type: String, required: [true, 'Nome é obrigatório'] },
          cover: { type: String },
          price: {
            type: Number,
            required: [true, 'Valor unitário é obrigatório'],
          },
          regularPrice: {
            type: Number,
            required: [true, 'Valor unitário é obrigatório'],
          },
          fee: { type: Number, required: [true, 'Frete é obrigatório'] },
          timeDelivery: {
            type: Number,
            required: [true, 'Tempo de entrega é obrigatório'],
          },
          quantity: {
            type: Number,
            default: 1,
            required: [true, 'Quantidade é obrigatório'],
          },
          subAmount: {
            type: Number,
            default: 0,
            required: [true, 'Sub total é obrigatório'],
          },
          stars: { type: Number, max: 5, default: 0 },
          reviewd: { type: Boolean, default: false },
        },
      ],
    },
    address: {
      type: {
        street: { type: String, required: [true, 'Rua é obrigatório'] },
        neighborhood: {
          type: String,
          required: [true, 'Bairro é obrigatório'],
        },
        city: { type: String, required: [true, 'Cidade é obrigatório'] },
        state: { type: String, required: [true, 'Estado é obrigatório'] },
        number: { type: String },
        zipCode: { type: String, required: [true, 'CEP é obrigatório'] },
        complement: { type: String },
      },
      required: true,
      _id: false,
    },
    payment: {
      type: {
        method: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Payment',
          required: [true, 'Método pagamento é obrigatório'],
        },
        fee: { type: Number, default: 0 },
        amount: {
          type: Number,
          required: [true, 'Total pedido é obrigatório'],
        },
        cartQuantity: {
          type: Number,
          required: [true, 'Quantidade de itens é obrigatório'],
        },
      },
      required: true,
      _id: false,
    },
    status: [
      {
        history: {
          type: String,
          enum: StatusEnumType,
          required: [true, 'Status do pedido é obrigatório'],
        },
        dateTime: { type: Date, default: Date.now() },
        _id: false,
      },
    ],
    obs: { type: String },
  },
  { timestamps: true }
)

OrderSchema.plugin(mongoosePaginate)

export default mongoose.model('Order', OrderSchema)

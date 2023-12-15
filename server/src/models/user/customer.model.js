import mongoose from 'mongoose'
import crypto from 'crypto'
import mongoosePaginate from 'mongoose-paginate'

import { extend } from '../../utils/helper.js'
import UserSchema from './user.model.js'

const CustomerSchema = extend(UserSchema, {
  cpf: {
    type: String,
    required: [true, 'CPF é obrigatório'],
    unique: [true, 'CPF já cadastrado'],
    min: 11,
    max: 11,
  },
  terms: { type: Boolean, required: [true, 'Termos é obrigatório'] },
  activated: {
    type: {
      activatedToken: String,
      activatedTokenExpire: Date,
      activatedChangedAt: Date,
    },
    _id: false,
  },
  chatStatus: { type: Boolean, default: false },
  historyAvailable: { type: Boolean, default: true },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  amountSpend: { type: Number, default: 0 },
})

CustomerSchema.methods.generateActivatedToken = function () {
  const activatedToken = crypto.randomBytes(16).toString('hex')

  this.activated = {
    activatedToken: crypto
      .createHash('sha256')
      .update(activatedToken)
      .digest('hex'),
    activatedTokenExpire: Date.now() + 5 * 60 * 1000, // 5 minutes
    activatedChangedAt: undefined,
  }
  return this.activated
}
CustomerSchema.methods.confirmActivatedToken = function () {
  this.activated = {
    activatedToken: undefined,
    activatedTokenExpire: undefined,
    activatedChangedAt: Date.now(),
  }
  this.activatedStatus = true
}
CustomerSchema.methods.sendPublic = function () {
  return {
    _id: this._id,
    _type: this._type,
    name: this.name,
    email: this.email,
    whatsApp: this.whatsApp,
    image: this.image,
    address: this.address,
    cpf: this.cpf,
    terms: this.terms,
    chatStatus: this.chatStatus,
    historyAvailable: this.historyAvailable,
    orders: this.orders,
    amountSpend: this.amountSpend,
    status: this.status,
    createdAt: this.createdAt,
  }
}
CustomerSchema.methods.sendAuth = function () {
  return {
    user: this.sendPublic(),
    token: this.generateToken(),
  }
}

CustomerSchema.plugin(mongoosePaginate)

export default mongoose.model('Customer', CustomerSchema)

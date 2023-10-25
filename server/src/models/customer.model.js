import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

import config from '../config/index.js'

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Nome é obrigatório'], min: [2, 'Nome deve possuir ao 2 caracteres'], max: [200, 'Nome deve possuir até 200 caracteres'] },
  email: { type: String, required: [true, 'Email é obrigatório'], match: [/\S+@\S+\.\S+/, 'Informe email válido'], lowercase: true, unique: [true, 'Email já cadastrado'] },
  phone: { type: String, required: [true, 'Celular é obrigatório'], unique: [true, 'Celular já cadastrado'], min: 11, max: 11 },
  image: { type: String },
  address: {
    type: {
      street: { type: String, required: [true, 'Rua é obrigatório'] },
      neighborhood: { type: String, required: [true, 'Bairro é obrigatório'] },
      city: { type: String, required: [true, 'Cidade é obrigatório'] },
      state: { type: String, required: [true, 'Estado é obrigatório'] },
      number: { type: String },
      zipCode: { type: String, required: [true, 'CEP é obrigatório'] },
      complement: { type: String },
    },
    _id: false,
  },
  terms: { type: Boolean, required: [true, 'Termos é obrigatório'] },
  status: { type: Boolean, default: true },
  activated: {
    type: {
      activatedStatus: Boolean,
      activatedToken: String,
      activatedTokenExpire: Date,
      activatedChangedAt: Date,
    },
    default: {
      activatedStatus: false,
    },
    _id: false,
  },
  password: {
    type: {
      salt: { type: String },
      hash: { type: String },
    },
    default: {},
    required: [true, 'Senha é obrigatório'],
    _id: false,
  },
  recoveryPassword: {
    type: {
      passwordResetToken: String,
      passwordResetExpires: Date,
      passwordChangedAt: Date,
    },
    default: {},
    _id: false,
  },
  // chatStatus,
  // orders,
  // amountSpend,
  // favorits,
  // history,
  // compare,
}, { timestamps: true })

CustomerSchema.methods.setPassword = async function (password) {
  this.password.salt = crypto.randomBytes(16).toString('hex')
  this.password.hash = crypto
    .pbkdf2Sync(password, this.password.salt, 10000, 512, 'sha512')
    .toString('hex')
}
CustomerSchema.methods.generateActivatedToken = function () {
  const activatedToken = crypto.randomBytes(16).toString('hex')

  this.activated.activatedToken = crypto
    .createHash('sha256')
    .update(activatedToken)
    .digest('hex')
  this.activated.activatedTokenExpire = Date.now() + 5 * 60 * 1000 // 5 minutes
  return this.activated
}
CustomerSchema.methods.confirmActivatedToken = function () {
  this.activated = {
    activatedStatus: true,
    activatedToken: undefined,
    activatedTokenExpire: undefined,
    activatedChangedAt: Date.now(),
  }
}
CustomerSchema.methods.validatePassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.password.salt, 10000, 512, 'sha512')
    .toString('hex')
  return hash === this.password.hash
}
CustomerSchema.methods.generateToken = function () {
  const today = new Date()
  const exp = new Date(today)
  exp.setDate(today.getDate() + 15)

  return jwt.sign(
    {
      id: this._id,
      exp: parseFloat(exp.getTime() / 1000, 10),
    },
    config.SERVER_JWT_SECRET
  )
}
CustomerSchema.methods.sendAuth = function () {
  return {
    user: {
      _id: this._id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      image: this.image,
      address: this.address,
      terms: this.terms,
      status: this.status,
    },
    token: this.generateToken(),
  }
}
CustomerSchema.methods.generateRecoveryPassword = function () {
  const resetToken = crypto.randomBytes(16).toString('hex')

  this.recoveryPassword.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')
  this.recoveryPassword.passwordResetExpires = Date.now() + 10 * 60 * 1000 // 10 minutes
  return this.recoveryPassword
}
CustomerSchema.methods.clearRecoveryPassword = function () {
  this.recoveryPassword = {
    passwordResetToken: undefined,
    passwordResetExpires: undefined,
    passwordChangedAt: Date.now(),
  }
  return this.recoveryPassword
}

export default mongoose.model('Customer', CustomerSchema)

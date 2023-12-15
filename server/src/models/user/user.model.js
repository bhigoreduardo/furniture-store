import mongoose from 'mongoose'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'

import config from '../../config/index.js'
import { UserEnum } from '../../types/user.type.js'

const UserSchema = new mongoose.Schema({
  _type: {
    type: String,
    enum: UserEnum,
    default: UserEnum.Customer,
  },
  name: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    min: [2, 'Nome deve possuir ao 2 caracteres'],
    max: [200, 'Nome deve possuir até 200 caracteres'],
  },
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
    match: [/\S+@\S+\.\S+/, 'Informe email válido'],
    lowercase: true,
    unique: [true, 'Email já cadastrado'],
  },
  whatsApp: {
    type: String,
    required: [true, 'WhatsApp é obrigatório'],
    unique: [true, 'WhatsApp já cadastrado'],
    min: 11,
    max: 11,
  },
  image: { type: String },
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
    _id: false,
  },
  password: {
    type: {
      salt: { type: String },
      hash: { type: String },
    },
    default: {},
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
  status: { type: Boolean, default: true },
  activatedStatus: { type: Boolean, default: false },
})

UserSchema.methods.setPassword = async function (password) {
  this.password.salt = crypto.randomBytes(16).toString('hex')
  this.password.hash = crypto
    .pbkdf2Sync(password, this.password.salt, 10000, 512, 'sha512')
    .toString('hex')
}
UserSchema.methods.validatePassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.password.salt, 10000, 512, 'sha512')
    .toString('hex')
  return hash === this.password.hash
}
UserSchema.methods.generateToken = function () {
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
UserSchema.methods.generateRecoveryPassword = function () {
  const resetToken = crypto.randomBytes(16).toString('hex')

  this.recoveryPassword.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')
  this.recoveryPassword.passwordResetExpires = Date.now() + 10 * 60 * 1000 // 10 minutes
  return this.recoveryPassword
}
UserSchema.methods.clearRecoveryPassword = function () {
  this.recoveryPassword = {
    passwordResetToken: undefined,
    passwordResetExpires: undefined,
    passwordChangedAt: Date.now(),
  }
  return this.recoveryPassword
}

export default UserSchema

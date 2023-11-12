import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

import config from '../config/index.js'

const StoreSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Nome é obrigatório'] },
    email: {
      type: String,
      required: [true, 'Email é obrigatório'],
      match: [/\S+@\S+\.\S+/, 'Informe email válido'],
      lowercase: true,
      unique: [true, 'Email já cadastrado'],
    },
    contactEmail: {
      type: String,
      required: [true, 'Email é obrigatório'],
      match: [/\S+@\S+\.\S+/, 'Informe email válido'],
      lowercase: true,
      unique: [true, 'Email já cadastrado'],
    },
    phone: {
      type: String,
      min: 11,
      max: 11,
    },
    whatsApp: {
      type: String,
      required: [true, 'Celular é obrigatório'],
      unique: [true, 'WhatsApp já cadastrado'],
      min: 11,
      max: 11,
    },
    image: { type: String },
    cnpj: { type: String },
    ie: { type: String },
    clockAvailable: { type: String },
    site: { type: String },
    description: { type: String },
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
    socialMedia: {
      type: {
        facebook: { type: String },
        instagram: { type: String },
        twitter: { type: String },
        linkedin: { type: String },
        pinterest: { type: String },
        youtube: { type: String },
      },
      _id: false,
    },
    status: { type: Boolean, default: false },
    available: { type: Boolean, default: false },
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
  },
  { timestamps: true }
)

StoreSchema.methods.setPassword = async function (password) {
  this.password.salt = crypto.randomBytes(16).toString('hex')
  this.password.hash = crypto
    .pbkdf2Sync(password, this.password.salt, 10000, 512, 'sha512')
    .toString('hex')
}
StoreSchema.methods.validatePassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.password.salt, 10000, 512, 'sha512')
    .toString('hex')
  return hash === this.password.hash
}
StoreSchema.methods.generateToken = function () {
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
StoreSchema.methods.sendAuth = function () {
  return {
    user: {
      _id: this._id,
      name: this.name,
      email: this.email,
      contactEmail: this.contactEmail,
      phone: this.phone,
      whatsApp: this.whatsApp,
      image: this.image,
      cnpj: this.cnpj,
      ie: this.ie,
      clockAvailable: this.clockAvailable,
      site: this.site,
      description: this.description,
      address: this.address,
      socialMedia: this.socialMedia,
      status: this.status,
      available: this.available,
    },
    token: this.generateToken(),
  }
}
StoreSchema.methods.sendPublic = function () {
  return {
    _id: this._id,
      name: this.name,
      email: this.email,
      contactEmail: this.contactEmail,
      phone: this.phone,
      whatsApp: this.whatsApp,
      image: this.image,
      cnpj: this.cnpj,
      ie: this.ie,
      clockAvailable: this.clockAvailable,
      site: this.site,
      description: this.description,
      address: this.address,
      socialMedia: this.socialMedia,
      status: this.status,
      available: this.available,
  }
}
StoreSchema.methods.generateRecoveryPassword = function () {
  const resetToken = crypto.randomBytes(16).toString('hex')

  this.recoveryPassword.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')
  this.recoveryPassword.passwordResetExpires = Date.now() + 10 * 60 * 1000 // 10 minutes
  return this.recoveryPassword
}
StoreSchema.methods.clearRecoveryPassword = function () {
  this.recoveryPassword = {
    passwordResetToken: undefined,
    passwordResetExpires: undefined,
    passwordChangedAt: Date.now(),
  }
  return this.recoveryPassword
}

export default mongoose.model('Store', StoreSchema)

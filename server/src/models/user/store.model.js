import mongoose from 'mongoose'

import { extend } from '../../utils/helper.js'
import UserSchema from './user.model.js'

const StoreSchema = extend(UserSchema, {
  contactEmail: {
    type: String,
    match: [/\S+@\S+\.\S+/, 'Informe email válido'],
    lowercase: true,
  },
  phone: {
    type: String,
    min: 11,
    max: 11,
  },
  cnpj: { type: String },
  ie: { type: String },
  clockAvailable: { type: String },
  site: { type: String },
  description: { type: String },
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
  available: { type: Boolean, default: false },
})

StoreSchema.methods.sendPublic = function () {
  return {
    _id: this._id,
    _type: this._type,
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
    available: this.available,
  }
}
StoreSchema.methods.sendAuth = function () {
  return {
    user: this.sendPublic(),
    token: this.generateToken(),
  }
}

export default mongoose.model('Store', StoreSchema)

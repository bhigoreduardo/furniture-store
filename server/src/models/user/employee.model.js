import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'

import { extend } from '../../utils/helper.js'
import UserSchema from './user.model.js'

export const EmployeeSchema = extend(UserSchema, {
  cpf: {
    type: String,
    required: [true, 'CPF é obrigatório'],
    unique: [true, 'CPF já cadastrado'],
    min: 11,
    max: 11,
  },
  chatStatus: { type: Boolean, default: false },
})

EmployeeSchema.methods.sendPublic = function () {
  return {
    _id: this._id,
    _type: this._type,
    name: this.name,
    email: this.email,
    whatsApp: this.whatsApp,
    image: this.image,
    address: this.address,
    cpf: this.cpf,
    chatStatus: this.chatStatus,
    status: this.status,
  }
}
EmployeeSchema.methods.sendAuth = function () {
  return {
    user: this.sendPublic(),
    token: this.generateToken(),
  }
}

EmployeeSchema.plugin(mongoosePaginate)

export default mongoose.model('Employee', EmployeeSchema)

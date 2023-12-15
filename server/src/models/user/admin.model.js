import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'

import { extend } from '../../utils/helper.js'
import { EmployeeSchema } from './employee.model.js'

const AdminSchema = extend(EmployeeSchema, {})

AdminSchema.plugin(mongoosePaginate)

export default mongoose.model('Admin', AdminSchema)

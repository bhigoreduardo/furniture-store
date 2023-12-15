import { filterSorted } from '../../utils/format.js'
import EmployeeModel from '../../models/user/employee.model.js'

// SEARCH
export const search = async (req, res) => {
  const query = req.query
  const page = Number(query.page) || 1
  const limit = Number(query.perPage) || 10
  const filter = {
    ...(query.search && {
      $or: [
        { name: { $regex: query.search, $options: 'i' } },
        { email: { $regex: query.search, $options: 'i' } },
        { cpf: { $regex: query.search, $options: 'i' } },
        { whatsApp: { $regex: query.search, $options: 'i' } },
        { 'address.street': { $regex: query.search, $options: 'i' } },
        { 'address.neighborhood': { $regex: query.search, $options: 'i' } },
        { 'address.city': { $regex: query.search, $options: 'i' } },
        { 'address.state': { $regex: query.search, $options: 'i' } },
        { 'address.zipCode': { $regex: query.search, $options: 'i' } },
        { 'address.complement': { $regex: query.search, $options: 'i' } },
      ],
    }),
    ...(query.chatStatus && { chatStatus: query.chatStatus }),
    ...(query.status && { status: query.status }),
  }
  const finded = await EmployeeModel.paginate(filter, {
    page,
    limit,
    sort: filterSorted(query.priority),
  })
  finded.docs = finded?.docs.map((item) => item.sendPublic())
  return res.status(200).json(finded)
}

export const findById = async (req, res) => {
  const finded = await EmployeeModel.findOne({ _id: req.params.id })
  return res.status(200).json(finded.sendPublic())
}

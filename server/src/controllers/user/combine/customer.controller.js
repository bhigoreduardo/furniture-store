import CustomerModel from '../../../models/user/customer.model.js'
import OrderModel from '../../../models/order.model.js'

// ORDERS
export const orderSearch = async (req, res) => {
  const query = req.query
  const page = Number(query.page) || 1
  const limit = Number(query.perPage) || 10
  const filter = {
    ...(query.search && {
      $or: [
        { 'customer.name': { $regex: query.search, $options: 'i' } },
        { 'customer.email': { $regex: query.search, $options: 'i' } },
        { 'customer.whatsApp': { $regex: query.search, $options: 'i' } },
        { code: { $regex: query.search, $options: 'i' } },
        { 'address.street': { $regex: query.search, $options: 'i' } },
        { 'address.neighborhood': { $regex: query.search, $options: 'i' } },
        { 'address.city': { $regex: query.search, $options: 'i' } },
        { 'address.state': { $regex: query.search, $options: 'i' } },
        { 'address.zipCode': { $regex: query.search, $options: 'i' } },
        { 'address.complement': { $regex: query.search, $options: 'i' } },
      ],
    }),
    // ...(query.orderStatus && { $or: [] }),
    ...((query.startDate || query.endDate) && {
      createdAt: {
        ...(query.startDate && { $gte: query.startDate }),
        ...(query.endDate && { $lte: query.endDate }),
      },
    }),
  }
  const finded = await OrderModel.paginate(
    { 'customer.user': req.params.id, ...filter },
    {
      page,
      limit,
      select: '_id customer code status payment createdAt',
      populate: [
        { path: 'customer.user', select: 'image' },
        {
          path: 'payment',
          populate: [{ path: 'method', select: '_id image method' }],
        },
      ],
    }
  )
  return res.status(200).json(finded)
}

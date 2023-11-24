import mongoose from 'mongoose'
// import Stripe from 'stripe'

import ProductModel from '../models/product.model.js'
import PaymentModel from '../models/payment.model.js'
import OrderModel, { StatusEnumType } from '../models/order.model.js'
import InventoryModel from '../models/inventory.model.js'
import CustomerModel from '../models/customer.model.js'
import ColorModel from '../models/color.model.js'
import ErrorHandler from '../utils/ErrorHandler.js'

export const save = async (req, res) => {
  const {
    name,
    email,
    whatsApp,
    address,
    cart,
    payment: { method, availableInstallments },
  } = req.body

  const payment = await PaymentModel.findById(method)
  if (payment.availableInstallments !== availableInstallments)
    throw new ErrorHandler('Forma de pagamento inválido', 422)

  const uniqueIds = [...new Set(cart.map((item) => item.product))]
  const products = await Promise.all(
    uniqueIds.map(
      async (item) =>
        await ProductModel.findById(item.toString())
          .select('_id name productData')
          .populate(['productData.inventory.info', 'productData.media'])
    )
  )

  const items = await Promise.all(
    cart.map(async (item) => {
      const product = products.find((i) => i._id.toString() === item.product)
      const inventory = product.productData.inventory.info.find(
        (i) => i.color.toString() === item.color
      )
      const quantity = item.quantity
      const price = inventory?.offer?.offerPrice || inventory.price
      const { fee, timeDelivery, isFree } = product.productData.shippingInfo
      const subAmount = isFree ? price * quantity : (price + fee) * quantity

      await InventoryModel.findByIdAndUpdate(inventory._id, {
        $inc: { stock: -quantity },
      })

      await ProductModel.findByIdAndUpdate(product._id, {
        $inc: {
          sales: quantity,
          amountSales: subAmount,
        },
      })

      const color = await ColorModel.findById(inventory.color)

      return {
        product: product._id,
        color: inventory.color,
        bg: color.color,
        colorName: color.name,
        name: product.name,
        cover: product.productData.media.cover,
        price,
        regularPrice: inventory.price,
        fee: fee * quantity,
        timeDelivery,
        quantity,
        subAmount,
        stars: 0,
        reviewd: false,
      }
    })
  )

  let fee = 0
  if (availableInstallments) {
    const infoInstallments = payment.infoInstallments.find(
      (item) =>
        Number(item.installments) === Number(req.body.payment.installments)
    )
    fee = infoInstallments.fee
  }
  const amountCart = items.reduce((acc, cur) => acc + cur.subAmount, 0)
  const amount = amountCart * (1 + fee / 100)
  const cartQuantity = cart.reduce((acc, cur) => acc + cur.quantity, 0)

  const order = await OrderModel.create({
    customer: {
      user: req.userId,
      name,
      email,
      whatsApp,
    },
    code: new mongoose.Types.ObjectId().toString().slice(16),
    cart: items,
    address,
    payment: { method, fee, amount, cartQuantity },
    status: [
      { history: StatusEnumType.Created },
      { history: StatusEnumType.Pending },
    ],
    obs: req.body.obs,
  })

  await CustomerModel.findByIdAndUpdate(req.userId, {
    $push: { orders: order },
    $inc: { amountSpend: amount },
  })

  // enviar notificação da compra para loja
  // enviar notificação da compra para cliente
  // enviar o pagamento para o gateway (available)
  // if (payment.availableGateway) {
  //   const {
  //     payment: { cardName, cardNumber, cardDate, cardCvv },
  //   } = req.body
  //   const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY)
  //   const session = await stripe.checkout.sessions.create({
  //     shipping_address_collection: { allowed_countries: ['BR'] },
  //     payment_method_types: ['card'],
  //     mode: 'payment',
  //     success_url: process.env.CLIENT_URL + '/compra-concluida',
  //     cancel_url: process.env.CLIENT_URL + '/compra-falhou',

  //     name: cardName,
  //     number: cardNumber,

  //     amount_total: amount,
  //     customer_email: email,
  //     customer_details: {},
  //     metadata: {
  //       orderId: order._id.toString(),
  //     },
  //   })
  //   return res.status(201).json({
  //     success: true,
  //     message: 'Pedido criado com sucesso',
  //     url: session.url,
  //   })
  // }

  return res
    .status(201)
    .json({ success: true, message: 'Pedido criado com sucesso' })
}

export const search = async (req, res) => {
  const query = req.query
  const page = Number(query.page) || 0
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
        // ...(typeof query.search === 'number' && {
        //   'payment.method': { $regex: Number(query.search), $options: 'i' },
        //   'payment.fee': { $regex: Number(query.search), $options: 'i' },
        //   'payment.amount': { $regex: Number(query.search), $options: 'i' },
        // }),
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
  const finded = await OrderModel.paginate(filter, {
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
    sort: { createdAt: -1 },
  })
  return res.status(200).json(finded)
}

export const searchCustomers = async (req, res) => {
  const query = req.query
  const page = Number(query.page) || 0
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

export const findById = async (req, res) => {
  const finded = await OrderModel.findById(req.params.id)
  return res.status(200).json(finded)
}

export const updateStatus = async (req, res) => {
  await OrderModel.findByIdAndUpdate(req.params.id, {
    $push: { status: { history: req.body.status } },
  })
  return res.status(200).json({ success: true, message: 'Pedido atualizado' })
}

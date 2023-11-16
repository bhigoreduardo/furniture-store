import mongoose from 'mongoose'
// import Stripe from 'stripe'

import ProductModel from '../models/product.model.js'
import PaymentModel from '../models/payment.model.js'
import OrderModel, { StatusEnumType } from '../models/order.model.js'
import InventoryModel from '../models/inventory.model.js'
import ErrorHandler from '../utils/ErrorHandler.js'

export const save = async (req, res) => {
  const {
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

      return {
        product: product._id,
        color: inventory.color,
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

  await OrderModel.create({
    customer: req.userId,
    code: new mongoose.Types.ObjectId().toString().slice(16),
    cart: items,
    address,
    payment: { method, fee, amount },
    status: [{ history: StatusEnumType.Created }],
    obs: req.body.obs,
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

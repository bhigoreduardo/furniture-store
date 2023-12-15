import ErrorHandler from '../middlewares/ErrorHandler.js'
import ReviewModel from '../models/review.model.js'
import OrderModel from '../models/order.model.js'
import ProductModel from '../models/product/product.model.js'

// SAVE
export const save = async (req, res) => {
  const { order, cartItem, description } = req.body
  const stars = Number(req.body.stars)

  const findedOrder = await OrderModel.findOne({
    _id: order,
    'customer.user': req.userId,
  })
  if (!findedOrder) throw new ErrorHandler('Pedido não cadastrado', 500)

  findedOrder.cart = await Promise.all(
    findedOrder?.cart?.map(async (item) => {
      if (item._id.toString() === cartItem) {
        if (item.reviewd) throw new ErrorHandler('Produto já avaliado', 400)

        const findedProduct = await ProductModel.findById(item.product)
        if (!findedProduct)
          throw new ErrorHandler('Produto não cadastrado', 400)

        const review = await ReviewModel.create({
          customer: req.userId,
          stars,
          description,
        })
        item.review = review
        item.reviewd = true

        const reviewsAmount = findedProduct?.reviewsAvg?.amount + stars
        const reviewsLength = findedProduct?.reviews?.length + 1
        const reviewsAvg =
          reviewsLength > 0 ? Math.round(reviewsAmount / reviewsLength) : 0
        const starAmount = findedProduct?.reviewsAvg?.starAmount

        switch (stars) {
          case 1:
            starAmount['oneStar'] = starAmount?.oneStar + 1
            break
          case 2:
            starAmount['twoStar'] = starAmount?.twoStar + 1
            break
          case 3:
            starAmount['threeStar'] = starAmount?.threeStar + 1
            break
          case 4:
            starAmount['fourStar'] = starAmount?.fourStar + 1
            break
          case 5:
            starAmount['fiveStar'] = starAmount?.fiveStar + 1
            break
        }
        await ProductModel.findByIdAndUpdate(item.product, {
          $push: { reviews: review },
          reviewsAvg: {
            amount: reviewsAmount,
            avg: reviewsAvg,
            starAmount,
          },
        })
      }

      return item
    })
  )

  await findedOrder.save()
  return res.status(200).json({ success: true, message: 'Produto avaliado' })
}

import express from 'express'

import { useError } from '../../../middlewares/ErrorHandler.js'
import upload from '../../../config/multer.js'

import auth from './user/auth.route.js'
import store from './user/store.route.js'
import admin from './user/admin.route.js'
import employee from './user/employee.route.js'
import customer from './user/customer.route.js'
import color from './product/color.route.js'
import brand from './product/brand.route.js'
import category from './product/category.route.js'
import product from './product/product.route.js'
import payment from './payment.route.js'
import offer from './offer.route.js'
import order from './order.route.js'
import review from './review.route.js'

const router = express.Router()

router.post(
  '/save-image',
  upload.single('image'),
  useError(async (req, res) => {
    return res.status(201).json({
      success: true,
      message: 'Imagem salva com sucesso',
      image: req.body.image,
    })
  })
)

router.use('/auth', auth)
router.use('/stores', store)
router.use('/admins', admin)
router.use('/employees', employee)
router.use('/customers', customer)
router.use('/colors', color)
router.use('/brands', brand)
router.use('/categories', category)
router.use('/products', product)
router.use('/payments', payment)
router.use('/offers', offer)
router.use('/orders', order)
router.use('/reviews', review)

export default router

import express from 'express'

import { useError } from '../../../utils/ErrorHandler.js'
import upload from '../../../config/multer.js'

import customer from './customer.route.js'
import store from './store.route.js'
import category from './category.route.js'
import color from './color.route.js'
import brand from './brand.route.js'
import user from './user.route.js'
import product from './product.route.js'
import payment from './payment.route.js'
import order from './order.route.js'

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

router.use('/customers', customer)
router.use('/stores', store)
router.use('/categories', category)
router.use('/colors', color)
router.use('/brands', brand)
router.use('/users', user)
router.use('/products', product)
router.use('/payments', payment)
router.use('/orders', order)

export default router

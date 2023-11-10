import { validate } from 'express-validation'
import express from 'express'

import { useError } from '../../../utils/ErrorHandler.js'
import * as productMiddleware from '../../../middlewares/product.middleware.js'
import * as productController from '../../../controllers/product.controller.js'
import upload from '../../../config/multer.js'

const router = express.Router()

router.post(
  '/save-image',
  upload.single('image'),
  useError(productController.saveImage)
)
router.post(
  '/',
  validate(productMiddleware.save),
  productController.save
)

export default router

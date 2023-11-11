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
router.put(
  '/:id',
  // useError(userAuth),
  // useError(adminAuth),
  // validate(categoryMiddleware.update),
  useError(productController.update)
)
router.post('/', validate(productMiddleware.save), productController.save)
router.get('/search', useError(productController.search))
router.get('/:id', useError(productController.findById))
router.delete(
  '/:id',
  // useError(userAuth),
  // useError(adminAuth),
  useError(productController.remove)
)

export default router

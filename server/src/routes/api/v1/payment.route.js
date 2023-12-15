import express from 'express'
import { validate } from 'express-validation'

import { useError } from '../../../middlewares/ErrorHandler.js'
import upload from '../../../config/multer.js'
import * as authMiddleware from '../../../middlewares/user/auth.middleware.js'
import * as paymentMiddleware from '../../../middlewares/payment.middleware.js'
import * as paymentController from '../../../controllers/payment.controller.js'

const router = express.Router()

// SAVE
router.post(
  '/',
  useError(authMiddleware.userAuth),
  useError(authMiddleware.storeAuth),
  upload.single('image'),
  validate(paymentMiddleware.save),
  useError(paymentController.save)
)

// UPDATE
router.put(
  '/:id',
  useError(authMiddleware.userAuth),
  useError(authMiddleware.storeAuth),
  upload.single('image'),
  validate(paymentMiddleware.update),
  useError(paymentController.update)
)

// SEARCH
router.get('/', paymentController.findAll)

// REMOVE
router.delete(
  '/:id',
  useError(authMiddleware.userAuth),
  useError(authMiddleware.storeAuth),
  useError(paymentController.remove)
)

export default router

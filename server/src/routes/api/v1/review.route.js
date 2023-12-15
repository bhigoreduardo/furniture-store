import { validate } from 'express-validation'
import express from 'express'

import { useError } from '../../../middlewares/ErrorHandler.js'
import * as authMiddleware from '../../../middlewares/user/auth.middleware.js'
import * as reviewMiddleware from '../../../middlewares/review.middleware.js'
import * as reviewController from '../../../controllers/review.controller.js'

const router = express.Router()

// SAVE
router.post(
  '/',
  useError(authMiddleware.userAuth),
  useError(authMiddleware.customerAuth),
  validate(reviewMiddleware.save),
  useError(reviewController.save)
)

export default router

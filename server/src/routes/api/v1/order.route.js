import express from 'express'

import { useError } from '../../../utils/ErrorHandler.js'
import { userAuth, customerAuth } from '../../../middlewares/auth.middleware.js'
import * as orderController from '../../../controllers/order.controller.js'

const router = express.Router()

router.post(
  '/',
  useError(userAuth),
  useError(customerAuth),
  useError(orderController.save)
)

export default router

import express from 'express'

import { useError } from '../../../../../middlewares/ErrorHandler.js'
import * as authMiddleware from '../../../../../middlewares/user/auth.middleware.js'
import * as customerController from '../../../../../controllers/user/combine/customer.controller.js'

const router = express.Router()

// ORDERS
router.get(
  '/:id/orders/search',
  useError(authMiddleware.userAuth),
  useError(authMiddleware.employeeAdminStoreAuth),
  useError(customerController.orderSearch)
)

export default router

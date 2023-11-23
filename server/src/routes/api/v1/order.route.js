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
router.patch('/update-status/:id', useError(orderController.updateStatus))
router.get('/search', useError(orderController.search))
router.get('/customers/:id/search', useError(orderController.searchCustomers))
router.get('/:id', useError(orderController.findById))

export default router

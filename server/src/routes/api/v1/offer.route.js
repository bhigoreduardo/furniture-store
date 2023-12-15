import { validate } from 'express-validation'
import express from 'express'

import { useError } from '../../../middlewares/ErrorHandler.js'
import * as authMiddleware from '../../../middlewares/user/auth.middleware.js'
import * as offerMiddleware from '../../../middlewares/offer.middleware.js'
import * as offerController from '../../../controllers/offer.controller.js'

const router = express.Router()

// SAVE
router.post(
  '/',
  useError(authMiddleware.userAuth),
  useError(authMiddleware.employeeAdminStoreAuth),
  validate(offerMiddleware.save),
  useError(offerController.save)
)

// UPDATE
router.put(
  '/:id',
  useError(authMiddleware.userAuth),
  useError(authMiddleware.employeeAdminStoreAuth),
  validate(offerMiddleware.update),
  useError(offerController.update)
)

// SEARCH
router.get('/search', useError(offerController.search))

// REMOVE
router.delete(
  '/:id',
  useError(authMiddleware.userAuth),
  useError(authMiddleware.employeeAdminStoreAuth),
  useError(offerController.remove)
)

export default router

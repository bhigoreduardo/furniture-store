import express from 'express'
import { validate } from 'express-validation'

import { useError } from '../../../../middlewares/ErrorHandler.js'
import upload from '../../../../config/multer.js'
import * as authMiddleware from '../../../../middlewares/user/auth.middleware.js'
import * as authController from '../../../../controllers/user/auth.controller.js'
import * as storeMiddleware from '../../../../middlewares/user/store.middleware.js'
import * as storeController from '../../../../controllers/user/store.controller.js'

const router = express.Router()

// UPDATE
router.patch(
  '/change-password',
  useError(authMiddleware.userAuth),
  useError(authMiddleware.storeAuth),
  validate(authMiddleware.changePassword),
  useError(authController.changePassword)
)
router.patch(
  '/toggle-available',
  useError(authMiddleware.userAuth),
  useError(authMiddleware.storeAuth),
  useError(storeController.toggleAvailable)
)
router.patch(
  '/:id',
  useError(authMiddleware.userAuth),
  useError(authMiddleware.storeAuth),
  upload.single('image'),
  validate(storeMiddleware.update),
  useError(authController.update)
)

// PUBLIC
router.get('/', useError(storeController.find))

export default router

import express from 'express'
import { validate } from 'express-validation'

import { useError } from '../../../../middlewares/ErrorHandler.js'
import upload from '../../../../config/multer.js'
import * as authMiddleware from '../../../../middlewares/user/auth.middleware.js'
import * as authController from '../../../../controllers/user/auth.controller.js'
import * as adminMiddleware from '../../../../middlewares/user/admin.middleware.js'
import * as adminController from '../../../../controllers/user/admin.controller.js'

const router = express.Router()

// UPDATE
router.patch(
  '/change-password',
  useError(authMiddleware.userAuth),
  useError(authMiddleware.adminAuth),
  validate(authMiddleware.changePassword),
  useError(authController.changePassword)
)
router.patch(
  '/:id/toggle-status',
  useError(authMiddleware.userAuth),
  useError(authMiddleware.storeAuth),
  useError(authController.toggleStatus)
)
router.patch(
  '/:id',
  useError(authMiddleware.userAuth),
  useError(authMiddleware.adminStoreAuth),
  upload.single('image'),
  validate(adminMiddleware.update),
  useError(authController.update)
)

// SEARCH
router.get(
  '/search',
  useError(authMiddleware.userAuth),
  useError(authMiddleware.storeAuth),
  useError(adminController.search)
)
router.get(
  '/:id',
  useError(authMiddleware.userAuth),
  useError(authMiddleware.storeAuth),
  useError(adminController.findById)
)

export default router

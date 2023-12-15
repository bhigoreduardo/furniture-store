import express from 'express'
import { validate } from 'express-validation'

import { useError } from '../../../../middlewares/ErrorHandler.js'
import upload from '../../../../config/multer.js'
import * as authMiddleware from '../../../../middlewares/user/auth.middleware.js'
import * as authController from '../../../../controllers/user/auth.controller.js'
import * as employeeMiddleware from '../../../../middlewares/user/employee.middleware.js'
import * as employeeController from '../../../../controllers/user/employee.controller.js'

const router = express.Router()

// UPDATE
router.patch(
  '/change-password',
  useError(authMiddleware.userAuth),
  useError(authMiddleware.employeeAuth),
  validate(authMiddleware.changePassword),
  useError(authController.changePassword)
)
router.patch(
  '/:id/toggle-status',
  useError(authMiddleware.userAuth),
  useError(authMiddleware.adminStoreAuth),
  useError(authController.toggleStatus)
)
router.patch(
  '/:id',
  useError(authMiddleware.userAuth),
  useError(authMiddleware.employeeAdminStoreAuth),
  upload.single('image'),
  validate(employeeMiddleware.update),
  useError(authController.update)
)

// SEARCH
router.get(
  '/search',
  useError(authMiddleware.userAuth),
  useError(authMiddleware.adminStoreAuth),
  useError(employeeController.search)
)
router.get(
  '/:id',
  useError(authMiddleware.userAuth),
  useError(authMiddleware.adminStoreAuth),
  useError(employeeController.findById)
)

export default router

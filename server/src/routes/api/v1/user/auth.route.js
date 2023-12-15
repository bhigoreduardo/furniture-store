import express from 'express'
import { validate } from 'express-validation'

import { useError } from '../../../../middlewares/ErrorHandler.js'
import * as authMiddleware from '../../../../middlewares/user/auth.middleware.js'
import * as authController from '../../../../controllers/user/auth.controller.js'

const router = express.Router()

// AUTH
router.post(
  '/save',
  useError(authMiddleware.userAuth),
  useError(authMiddleware.adminStoreAuth),
  validate(authMiddleware.save),
  useError(authController.save)
)
router.post(
  '/sign-up',
  validate(authMiddleware.signUp),
  useError(authController.signUp)
)
router.post(
  '/sign-in',
  validate(authMiddleware.signIn),
  useError(authController.signIn)
)

// RECOVERY
router.post(
  '/generate-recovery-password',
  validate(authMiddleware.generateRecoveryPassword),
  useError(authController.generateRecoveryPassword)
)
router.post(
  '/recovery-password',
  validate(authMiddleware.recoveryPassword),
  useError(authController.recoveryPassword)
)

export default router

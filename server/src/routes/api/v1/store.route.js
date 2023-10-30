import express from 'express'
import { validate } from 'express-validation'

import { useError } from '../../../utils/ErrorHandler.js'
import * as storeMiddleware from '../../../middlewares/store.middleware.js'
import * as storeController from '../../../controllers/store.controller.js'

const router = express.Router()

router.post(
  '/sign-up',
  validate(storeMiddleware.signUp),
  useError(storeController.signUp)
)
router.post(
  '/sign-in',
  validate(storeMiddleware.signIn),
  useError(storeController.signIn)
)
router.post(
  '/generate-recovery-password',
  validate(storeMiddleware.generateRecoveryPassword),
  useError(storeController.generateRecoveryPassword)
)
router.post(
  '/recovery-password',
  validate(storeMiddleware.recoveryPassword),
  useError(storeController.recoveryPassword)
)

export default router

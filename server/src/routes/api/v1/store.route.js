import express from 'express'
import { validate } from 'express-validation'

import { useError } from '../../../utils/ErrorHandler.js'
import { adminAuth, userAuth } from '../../../middlewares/auth.middleware.js'
import * as storeMiddleware from '../../../middlewares/store.middleware.js'
import * as storeController from '../../../controllers/store.controller.js'
import upload from '../../../config/multer.js'

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
router.put(
  '/update',
  useError(userAuth),
  useError(adminAuth),
  upload.single('image'),
  validate(storeMiddleware.update),
  useError(storeController.update)
)
router.patch(
  '/change-password',
  useError(userAuth),
  useError(adminAuth),
  validate(storeMiddleware.changePassword),
  useError(storeController.changePassword)
)
router.patch(
  '/toggle-available',
  useError(userAuth),
  useError(adminAuth),
  useError(storeController.toggleAvailable)
)

export default router

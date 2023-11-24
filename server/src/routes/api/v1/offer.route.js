import express from 'express'

import { useError } from '../../../utils/ErrorHandler.js'
import { adminAuth, userAuth } from '../../../middlewares/auth.middleware.js'
import * as offerController from '../../../controllers/offer.controller.js'

const router = express.Router()

router.post(
  '/',
  useError(userAuth),
  useError(adminAuth),
  useError(offerController.save)
)
router.get(
  '/search',
  useError(userAuth),
  useError(adminAuth),
  useError(offerController.search)
)

export default router

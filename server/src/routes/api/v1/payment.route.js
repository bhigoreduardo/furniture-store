import express from 'express'

import { useError } from '../../../utils/ErrorHandler.js'
import * as paymentController from '../../../controllers/payment.controller.js'
import upload from '../../../config/multer.js'

const router = express.Router()

router.post('/', upload.single('image'), useError(paymentController.save))
router.put('/:id', upload.single('image'), useError(paymentController.update))
router.get('/', paymentController.findAll)
router.delete('/:id', useError(paymentController.remove))

export default router

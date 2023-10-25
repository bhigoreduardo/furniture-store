import express from 'express'

import customer from './customer.route.js'

const router = express.Router()

router.use('/customers', customer)

export default router

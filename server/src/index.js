import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import path from 'path'
import { fileURLToPath } from 'url'
import colors from 'colors'

import { errors } from './middlewares/ErrorHandler.js'
import config from './config/index.js'
import connectWithRetry from './config/mongo.js'
import routes from './routes/index.js'

/* CONST */
const serverPort = config.SERVER_PORT
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/* START */
const app = express()

/* CONFIGURATIONS */
app.disable('x-powered-by')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan('common'))
// app.use(bodyParser.urlencoded({ limit: 1.5 * 1024 * 1024, extended: true }))
// app.use(bodyParser.json({ limit: 1.5 * 1024 * 1024, extended: true }))

/* MONGOOSE SETUP */
connectWithRetry()

/* PUBLIC ROUTES */
app.use('/api/v1/public', express.static(path.join(__dirname, './public')))
app.use(
  '/api/v1/public/images',
  express.static(path.join(__dirname, './public/images'))
)

/* ROUTES */
app.use('/', routes)

/* ERRORS */
app.use(errors)

/* LISTEN */
app.listen(serverPort, () => {
  console.log(`Server on: http://localhost:${serverPort || 3000}`.bgCyan.white)
})

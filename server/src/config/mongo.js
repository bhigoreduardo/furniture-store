import mongoose from 'mongoose'

import config from './index.js'

const mongoUri = `mongodb://${config.MONGO_USER}:${config.MONGO_PASS}@${config.MONGO_IP}:${config.MONGO_PORT}/${config.MONGO_DB}?authSource=admin`
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true }

export default function connectWithRetry() {
  mongoose.set('strictQuery', true)
  mongoose
    .connect(mongoUri, mongoOptions)
    .then(() => console.log(`Conneted to Mongo`.bgMagenta.white))
    .catch((err) => {
      console.log(`${err} did not connect`.bgRed.white)
      setTimeout(connectWithRetry, 5000)
    })
}

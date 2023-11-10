import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import ErrorHandler from './ErrorHandler.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const removeServerImage = (image) => {
  const pathfile = path.join(__dirname, '../public/images/' + image)
  fs.unlink(pathfile, function (err) {
    if (err) throw new ErrorHandler('Falha na remoção da imagem', 500)
  })
}

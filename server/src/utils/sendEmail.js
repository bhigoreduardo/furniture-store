import nodemailer from 'nodemailer'

import config from '../config/index.js'
import configEmail from '../config/email.js'

const transporter = nodemailer.createTransport(configEmail)
const clientURL =
  config.NODE_ENV === 'dev'
    ? `${config.CLIENT_URL}:${config.CLIENT_PORT}`
    : config.CLIENT_URL

const infoEmail = (emailInfo) => {
  return `
  <html lang="pt-BR">
  <head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" />
  </head>
  <body class="container d-flex flex-column gap-4">
  <article>
  <h3 class="card-title">${emailInfo.title}</h3>
  <h6 class="">Olá ${emailInfo.name}</h6>
  <p class="text-body-secondary">${emailInfo.shortDescription}</p>
  <a href="${clientURL}${emailInfo.endPoint}">${emailInfo.title}</a>
  <p class="text-body-secondary">
    Obs.: Se recebeu este e-mail sem solicitar, apenas o ignore e contacte o
    administrador.
  </p>
  <p class="text-body-secondary">
    Atenciosamente, <span class="lead">${config.COMPANY_NAME}</span>
  </p>
  </article>
  <div class="d-flex flex-column gap-1">
  <small class="text-body-secondary">
    ${config.COMPANY_NAME} respeita a sua privacidade. Para obter mais
    informações, consulte nossa <a href="">Política de privacidade</a>.
  </small>
  <small class="text-body-secondary">
    &copy; Copyright ${new Date().getFullYear()} ${config.COMPANY_NAME} | 
    Todos direitos reservados.
  </small>
  </div>
  </body>
  </html>
  `
}
export const sendInfoEmail = async (emailInfo, cb) => {
  const emailOptions = {
    from: `naoresponder@${config.CLIENT_URL}`,
    to: emailInfo.email,
    subject: `${emailInfo.title} - ${config.COMPANY_NAME}`,
    html: infoEmail(emailInfo),
  }

  transporter.sendMail(emailOptions, (err, info) => {
    if (err) return cb(emailInfo.message.fail)
    return cb(null, emailInfo.message.success)
  })
}

import nodemailer from 'nodemailer'

import config from '../config/index.js'
import configEmail from '../config/email.js'

const transporter = nodemailer.createTransport(configEmail)
const clientURL =
  config.NODE_ENV === 'dev'
    ? `${config.CLIENT_URL}:${config.CLIENT_PORT}`
    : config.CLIENT_URL

export const activatedTokenEmail = async (user, activatedToken, cb) => {
  const message = `
  <html lang="pt-BR">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
      />
    </head>
    <body class="container d-flex flex-column gap-4">
      <article>
        <h3 class="card-title">Ativação da conta</h3>
        <h6 class="">Olá ${user.name}</h6>
        <p class="text-body-secondary">
          Acesse o link abaixo para ativar sua conta.
        </p>
        <a href="${clientURL}/confirmar-conta?token=${activatedToken}">
          Ativar conta: ${clientURL}/confirmar-conta?token=${activatedToken}
        </a>
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
          © Copyright 2023 ${config.COMPANY_NAME}, Todos direitos reservados.
        </small>
      </div>
    </body>
  </html>
  `

  const emailOptions = {
    from: `naoresponder@${config.CLIENT_URL}`,
    to: user.email,
    subject: `Ativar conta - ${config.COMPANY_NAME}`,
    html: message,
  }

  transporter.sendMail(emailOptions, (err, info) => {
    if (err)
      return cb(
        'Falha no envio do email para ativar sua conta, entre em contato com o administrador'
      )
    return cb(null, 'Verifique seu email, para ativar sua conta')
  })
}

export const generateRecoveryPasswordEmail = async (
  user,
  recoveryPassword,
  cb
) => {
  const message = `
  <html lang="pt-BR">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
      />
    </head>
    <body class="container d-flex flex-column gap-4">
      <article>
        <h3 class="card-title">Recuperar Senha</h3>
        <h6 class="">Olá ${user.name}</h6>
        <p class="text-body-secondary">
          Acesse o link abaixo para redefinir sua senha.
        </p>
        <a href="${clientURL}/redefinir-senha?token=${recoveryPassword.passwordResetToken}">
          Redefinir senha: ${clientURL}/redefinir-senha?token=${recoveryPassword.passwordResetToken}
        </a>
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
          © Copyright 2023 ${config.COMPANY_NAME}, Todos direitos reservados.
        </small>
      </div>
    </body>
  </html>
  `

  const emailOptions = {
    from: `naoresponder@${config.CLIENT_URL}`,
    to: user.email,
    subject: `Redefinir senha - ${config.COMPANY_NAME}`,
    html: message,
  }

  transporter.sendMail(emailOptions, (err, info) => {
    if (err)
      return cb(
        'Falha no envio do email para recuperar senha, entre em contato com o administrador'
      )
    return cb(null, 'Verifique seu email, para recuperar sua senha')
  })
}

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
    <h1 style="text-align: center">Ativação da conta</h1>
    <br />
    <p>
        Acesse o link abaixo para ativar sua conta.
    </p>
    <a href="${clientURL}/confirmar-conta?token=${activatedToken}">
      Ativar conta: ${clientURL}/confirmar-conta?token=${activatedToken}
    </a>
    <br /><br /><hr />
    <p>
        Obs.: Se recebeu este e-mail sem solicitar, apenas o ignore e contacte o administrador.
    </p>
    <br />
    <p>Atenciosamente, ${config.COMPANY_NAME}</p>
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
    <h1 style="text-align: center">Recuperar Senha</h1>
    <br />
    <p>
        Acesse o link abaixo para redefinir sua senha.
    </p>
    <a href="${clientURL}/redefinir-senha?token=${recoveryPassword.passwordResetToken}">
      Redefinir senha: ${clientURL}/redefinir-senha?token=${recoveryPassword.passwordResetToken}
    </a>
    <br /><br /><hr />
    <p>
        Obs.: Se recebeu este e-mail sem solicitar, apenas o ignore e contacte o administrador.
    </p>
    <br />
    <p>Atenciosamente, ${config.COMPANY_NAME}</p>
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

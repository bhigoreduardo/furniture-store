import config from "./index.js"

export default {
  host: config.SMTP_EMAIL_HOST,
  port: config.SMTP_EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
      user: config.SMTP_EMAIL_USER,
      pass: config.SMTP_EMAIL_PASS
  }
}
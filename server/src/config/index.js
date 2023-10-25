export default {
  COMPANY_NAME: process.env.COMPANY_NAME || 'Furniture',
  NODE_ENV: process.env.NODE_ENV || 'dev',
  
  MONGO_IP: process.env.MONGO_IP || 'mongo',
  MONGO_PORT: process.env.MONGO_PORT || 27017,
  MONGO_USER: process.env.MONGO_USER,
  MONGO_PASS: process.env.MONGO_PASS,
  MONGO_DB: process.env.MONGO_DB,

  CLIENT_URL: process.env.CLIENT_URL,
  CLIENT_PORT: process.env.CLIENT_PORT,

  SERVER_URL: process.env.SERVER_URL,
  SERVER_PORT: process.env.SERVER_PORT,
  SERVER_JWT_SECRET: process.env.SERVER_JWT_SECRET,
  SERVER_ACTIVATED_SECRET: process.env.SERVER_ACTIVATED_SECRET,
  SERVER_BEARER_TOKEN: process.env.SERVER_BEARER_TOKEN || 'Furniture',

  SMTP_EMAIL_HOST: process.env.SMTP_EMAIL_HOST,
  SMTP_EMAIL_PORT: process.env.SMTP_EMAIL_PORT,
  SMTP_EMAIL_USER: process.env.SMTP_EMAIL_USER,
  SMTP_EMAIL_PASS: process.env.SMTP_EMAIL_PASS,
}

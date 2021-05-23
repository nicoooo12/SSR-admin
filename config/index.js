require('dotenv').config();

module.exports = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3001,
  apiUrl: process.env.API_URL,
  apiKeyToken: process.env.API_KEY_TOKEN,
  sessionSecret: process.env.SESSION_SECRET,
  socketUser: process.env.USER_SOCKET,
  socketPassword: process.env.PASSWORD_SOCKET,
  pagoNumeroCuenta: process.env.PAGO_NUMERO_CUENTA,
  pagoRut: process.env.PAGO_RUT,
  pagoTitular: process.env.PAGO_TITULAR,
  pagoBanco: process.env.PAGO_BANCO,
};

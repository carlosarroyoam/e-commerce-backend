const jwt = require('jsonwebtoken');
const config = require('../../config');

/**
 * @param {object} payload
 * @param {string} password
 * @return {string | jwt.JwtPayload} The signed token.
 */
function sign({ subject, userRole }, password) {
  const payload = {
    sub: subject,
    userRole,
  };

  const options = {
    expiresIn: config.JWT.EXPIRES_IN,
    issuer: config.APP.NAME,
  };

  const token = jwt.sign(payload, config.JWT.SECRET_KEY + password, options);

  return token;
}

/**
 *
 * @param {object} payload
 * @return {string | jwt.JwtPayload} The signed token.
 */
function signRefresh({ subject }) {
  const payload = {
    sub: subject,
  };

  const options = {
    expiresIn: config.JWT.REFRESH_EXPIRES_IN,
    issuer: config.APP.NAME,
  };

  const token = jwt.sign(payload, config.JWT.REFRESH_SECRET_KEY, options);

  return token;
}

/**
 * @param {object} payload
 * @param {string} password
 * @return {string | jwt.JwtPayload} The signed token.
 */
function signPasswordRecoveryToken({ subject }, password) {
  const payload = {
    sub: subject,
  };

  const options = {
    expiresIn: config.JWT.PASSWORD_RECOVERY_EXPIRES_IN,
    issuer: config.APP.NAME,
  };

  const token = jwt.sign(payload, config.JWT.PASSWORD_RECOVERY_SECRET_KEY + password, options);

  return token;
}

/**
 * @param {string} accessToken
 * @param {string} password
 * @return {string | jwt.JwtPayload} The decoded token.
 */
function verify(accessToken, password) {
  const decoded = jwt.verify(accessToken, config.JWT.SECRET_KEY + password);

  return decoded;
}

/**
 * @param {string} refreshToken
 * @return {string | jwt.JwtPayload} The decoded token.
 */
function verifyRefresh(refreshToken) {
  const decoded = jwt.verify(refreshToken, config.JWT.REFRESH_SECRET_KEY);

  return decoded;
}

/**
 * @param {string} accessToken
 * @param {string} password
 * @return {string | jwt.JwtPayload} The decoded token.
 */
function verifyPasswordRecoveryToken(accessToken, password) {
  const decoded = jwt.verify(accessToken, config.JWT.PASSWORD_RECOVERY_SECRET_KEY + password);

  return decoded;
}

/**
 * @param {string} accessToken
 * @return {string | jwt.JwtPayload} The decoded token.
 */
function decode(accessToken) {
  const decoded = jwt.decode(accessToken, { complete: false });

  return decoded;
}

module.exports = {
  sign,
  signRefresh,
  signPasswordRecoveryToken,
  verify,
  verifyRefresh,
  verifyPasswordRecoveryToken,
  decode,
};

const jwt = require('jsonwebtoken');
const config = require('../../../config');

/**
 * @param {object} payload
 * @param {string} password
 * @return {Promise} The signed token
 */
async function sign({ subject, userRole }, password) {
  const payload = {
    sub: subject,
    userRole,
  };

  const options = {
    expiresIn: config.JWT.EXPIRES_IN,
    issuer: config.APP.NAME,
  };

  const token = await jwt.sign(payload, config.JWT.SECRET_KEY + password, options);

  return token;
}

/**
 *
 * @param {object} payload
 * @return {Promise} The signed token
 */
async function signRefresh({ subject }) {
  const payload = {
    sub: subject,
  };

  const options = {
    expiresIn: config.JWT.REFRESH_EXPIRES_IN,
    issuer: config.APP.NAME,
  };

  const token = await jwt.sign(payload, config.JWT.REFRESH_SECRET_KEY, options);

  return token;
}

/**
 * @param {object} payload
 * @param {string} password
 * @return {Promise} The signed token
 */
async function signPasswordRecoveryToken({ subject }, password) {
  const payload = {
    sub: subject,
  };

  const options = {
    expiresIn: config.JWT.PASSWORD_RECOVERY_EXPIRES_IN,
    issuer: config.APP.NAME,
  };

  const token = await jwt.sign(
    payload,
    config.JWT.PASSWORD_RECOVERY_SECRET_KEY + password,
    options
  );

  return token;
}

/**
 * @param {string} accessToken
 * @param {string} password
 * @return {Promise} The decoded token
 */
async function verify(accessToken, password) {
  const decoded = await jwt.verify(accessToken, config.JWT.SECRET_KEY + password);

  return decoded;
}

/**
 * @param {string} refreshToken
 * @return {Promise} The decoded token
 */
async function verifyRefresh(refreshToken) {
  const decoded = await jwt.verify(refreshToken, config.JWT.REFRESH_SECRET_KEY);

  return decoded;
}

/**
 * @param {string} accessToken
 * @param {string} password
 * @return {Promise} The decoded token
 */
async function verifyPasswordRecoveryToken(accessToken, password) {
  const decoded = jwt.verify(accessToken, config.JWT.PASSWORD_RECOVERY_SECRET_KEY + password);

  return decoded;
}

/**
 * @param {string} accessToken
 * @return {Promise} The decoded token
 */
async function decode(accessToken) {
  const decoded = await jwt.decode(accessToken, { complete: false });

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

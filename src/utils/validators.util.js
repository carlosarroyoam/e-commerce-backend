const { body, param, query } = require('express-validator');
const stringUtils = require('./string.utils');

const passwordSchema = (parameterName) =>
  body(parameterName)
    .trim()
    .isLength({ min: 8, max: 16 })
    .withMessage(`The ${parameterName} must be between 8 and 16 characters`);

const resourceId = (parameterName) =>
  param(parameterName)
    .trim()
    .isInt()
    .withMessage(`The ${parameterName} must be an integer value`)
    .toInt();

const refreshToken = body('refresh_token')
  .trim()
  .isJWT()
  .withMessage('The refresh_token format is invalid');

const browserFingerprint = body('browser_fingerprint')
  .trim()
  .toLowerCase()
  .isUUID(4)
  .withMessage('The browser_fingerprint format is invalid');

const firstName = body('first_name')
  .trim()
  .customSanitizer((value) => stringUtils.capitalizeWords(value))
  .isAlpha('es-ES', { ignore: '\\s\\.' })
  .withMessage('The first_name contains invalid characters')
  .isLength({ min: 5, max: 50 })
  .withMessage('The first_name must be between 5 and 50 characters');

const lastName = body('last_name')
  .trim()
  .customSanitizer((value) => stringUtils.capitalizeWords(value))
  .isAlpha('es-ES', { ignore: '\\s\\.' })
  .withMessage('The last_name contains invalid characters')
  .isLength({ min: 5, max: 50 })
  .withMessage('The last_name must be between 5 and 50 characters');

const email = body('email')
  .trim()
  .toLowerCase()
  .isLength({ min: 5, max: 64 })
  .withMessage('The email must be between 5 and 64 characters')
  .isEmail()
  .withMessage('The email format is invalid');

const password = passwordSchema('password');

const currentPassword = passwordSchema('current_password');

const newPassword = passwordSchema('new_password');

const confirmPassword = (passwordParameterName) =>
  body('confirm_password')
    .trim()
    .isLength({ min: 8, max: 16 })
    .withMessage('The confirm_password must be between 8 and 16 characters')
    .custom((value, { req }) => {
      // eslint-disable-next-line security/detect-object-injection
      if (value !== req.body[passwordParameterName]) {
        throw new Error(`The confirm_password does not match ${passwordParameterName}`);
      }

      return true;
    });

const skip = query('skip')
  .trim()
  .isInt()
  .withMessage('The skip parameter must be an integer value')
  .toInt()
  .optional();

const search = query('search')
  .trim()
  .isAlpha('es-ES', { ignore: '\\s\\.' })
  .withMessage('The search contains invalid characters');

module.exports = {
  resourceId,
  refreshToken,
  browserFingerprint,
  firstName,
  lastName,
  email,
  password,
  currentPassword,
  newPassword,
  confirmPassword,
  skip,
  search,
};

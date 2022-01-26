/* eslint-disable security/detect-object-injection */
/* eslint-disable security/detect-non-literal-fs-filename */

const { body, param, query } = require('express-validator');
const stringUtils = require('./string.utils');

const passwordSchema = (parameterName) =>
  body(parameterName)
    .trim()
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage(`The ${parameterName} is required`)
    .isLength({ min: 8, max: 16 })
    .withMessage(`The ${parameterName} must be between 8 and 16 characters`);

const resourceId = (parameterName) =>
  param(parameterName)
    .trim()
    .isInt()
    .withMessage(`The ${parameterName} must be an integer value`)
    .toInt();

const resourceIdInBody = (parameterName) =>
  body(parameterName)
    .trim()
    .isInt()
    .withMessage(`The ${parameterName} must be an integer value`)
    .toInt();

const skip = query('skip')
  .trim()
  .isInt({ min: 0 })
  .withMessage('The skip parameter must be an integer value and greater or equals than 0')
  .toInt()
  .optional();

const limit = query('limit')
  .trim()
  .isInt({ min: 1, max: 100 })
  .withMessage('The limit parameter must be an integer value and between 1 and 100')
  .toInt()
  .optional();

const sort = (validValues) =>
  query('sort')
    .trim()
    .isAlpha('es-ES', { ignore: '-_' })
    .withMessage('The sort contains invalid characters')
    .isLength({ min: 2, max: 25 })
    .withMessage('The sort must be between 2 and 25 characters')
    .isIn(validValues)
    .withMessage(`The sort must be one of [${validValues.join(', ')}]`)
    .optional();

const userStatus = query('status')
  .trim()
  .isIn(['active', 'inactive'])
  .withMessage(`The status must be one of ['active', 'inactive']`)
  .optional();

const search = query('search')
  .trim()
  .isAlpha('es-ES', { ignore: '\\s\\.' })
  .withMessage('The search contains invalid characters')
  .isLength({ min: 1, max: 50 })
  .withMessage('The search must be between 1 and 50 characters')
  .optional();

const refreshToken = body('refresh_token')
  .trim()
  .exists({ checkNull: true, checkFalsy: true })
  .withMessage('The refresh_token is required')
  .isJWT()
  .withMessage('The refresh_token format is invalid');

const browserFingerprint = body('device_fingerprint')
  .trim()
  .exists({ checkNull: true, checkFalsy: true })
  .withMessage('The device_fingerprint is required')
  .toLowerCase()
  .isUUID(4)
  .withMessage('The device_fingerprint format is invalid');

const firstName = body('first_name')
  .trim()
  .exists({ checkNull: true, checkFalsy: true })
  .withMessage('The first_name is required')
  .customSanitizer((value) => stringUtils.capitalizeWords(value))
  .isAlpha('es-ES', { ignore: '\\s\\.' })
  .withMessage('The first_name contains invalid characters')
  .isLength({ min: 5, max: 50 })
  .withMessage('The first_name must be between 5 and 50 characters');

const lastName = body('last_name')
  .trim()
  .exists({ checkNull: true, checkFalsy: true })
  .withMessage('The last_name is required')
  .customSanitizer((value) => stringUtils.capitalizeWords(value))
  .isAlpha('es-ES', { ignore: '\\s\\.' })
  .withMessage('The last_name contains invalid characters')
  .isLength({ min: 5, max: 50 })
  .withMessage('The last_name must be between 5 and 50 characters');

const email = body('email')
  .trim()
  .exists({ checkNull: true, checkFalsy: true })
  .withMessage('The email is required')
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
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage(`The ${passwordParameterName} is required`)
    .isLength({ min: 8, max: 16 })
    .withMessage('The confirm_password must be between 8 and 16 characters')
    .custom((value, { req }) => {
      if (value !== req.body[passwordParameterName]) {
        throw new Error(`The confirm_password does not match ${passwordParameterName}`);
      }

      return true;
    });

const street_name = body('street_name')
  .trim()
  .exists({ checkNull: true, checkFalsy: true })
  .withMessage('The street_name is required')
  .isLength({ min: 5, max: 64 })
  .withMessage('The street_name must be between 5 and 64 characters');

const street_number = body('street_number')
  .trim()
  .exists({ checkNull: true, checkFalsy: true })
  .withMessage('The street_number is required')
  .isLength({ min: 1, max: 5 })
  .withMessage('The street_number must be between 1 and 5 characters');

const sublocality = body('sublocality')
  .trim()
  .exists({ checkNull: true, checkFalsy: true })
  .withMessage('The sublocality is required')
  .isLength({ min: 5, max: 45 })
  .withMessage('The sublocality must be between 5 and 45 characters');

const locality = body('locality')
  .trim()
  .exists({ checkNull: true, checkFalsy: true })
  .withMessage('The locality is required')
  .isLength({ min: 5, max: 45 })
  .withMessage('The locality must be between 5 and 45 characters');

const state = body('state')
  .trim()
  .exists({ checkNull: true, checkFalsy: true })
  .withMessage('The state is required')
  .isLength({ min: 5, max: 45 })
  .withMessage('The state must be between 5 and 45 characters');

const postal_code = body('postal_code')
  .trim()
  .exists({ checkNull: true, checkFalsy: true })
  .withMessage('The postal_code is required')
  .isLength({ min: 5, max: 5 })
  .withMessage('The postal_code must be 5 characters');

module.exports = {
  resourceId,
  resourceIdInBody,
  sort,
  skip,
  limit,
  search,
  userStatus,
  refreshToken,
  browserFingerprint,
  firstName,
  lastName,
  email,
  password,
  currentPassword,
  newPassword,
  confirmPassword,
  street_name,
  street_number,
  sublocality,
  locality,
  state,
  postal_code,
};

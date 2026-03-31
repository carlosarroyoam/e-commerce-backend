import { body, param, query } from 'express-validator';

/**
 * @typedef {object} NumericValidatorOptions
 * @property {boolean} [required=true]
 * @property {number} [min]
 * @property {number} [max]
 */

/**
 * @typedef {object} TextValidatorOptions
 * @property {boolean} [required=true]
 * @property {number} [min]
 * @property {number} [max]
 * @property {RegExp} [pattern]
 * @property {string} [message]
 */

/**
 * @typedef {object} EmailValidatorOptions
 * @property {boolean} [required=true]
 * @property {number} [min]
 * @property {number} [max]
 * @property {string} [message]
 */

/**
 * @typedef {object} PasswordValidatorOptions
 * @property {boolean} [required=true]
 * @property {number} [min]
 * @property {number} [max]
 * @property {string} [message]
 */

/**
 * @typedef {object} EnumValidatorOptions
 * @property {boolean} [required=false]
 * @property {string} [message]
 */

/**
 * Creates a reusable resource validator for a field.
 *
 * @param {'body' | 'query' | 'param'} location
 * @param {string} parameterName
 * @param {{ format?: 'id' | 'uuid', required?: boolean, min?: number }} [options]
 * @returns {*}
 */
const resourceValue = (location, parameterName, { format = 'id', required = true, min } = {}) => {
  const resolver = { body, query, param }[location];
  let validator = resolver(parameterName).trim();

  if (!required) {
    validator = validator.optional();
  }

  if (format === 'uuid') {
    return validator.isUUID(4).withMessage(`The ${parameterName} format is invalid`);
  }

  if (min !== undefined) {
    return validator
      .isInt({ min })
      .withMessage(
        `The ${parameterName} must be an integer value and greater or equals than ${min}`
      )
      .toInt();
  }

  return validator
    .isNumeric({ no_symbols: true })
    .withMessage(`The ${parameterName} must be a numeric value`)
    .toInt();
};

/**
 * Creates a reusable numeric validator for a field.
 *
 * @param {'body' | 'query' | 'param'} location
 * @param {string} parameterName
 * @param {NumericValidatorOptions & { kind?: 'integer' | 'float' }} [options]
 * @returns {*}
 */
const numericValue = (
  location,
  parameterName,
  { required = true, min, max, kind = 'integer' } = {}
) => {
  const resolver = { body, query, param }[location];
  let validator = resolver(parameterName);

  if (!required) {
    validator = validator.optional();
  }

  if (location !== 'param') {
    validator = validator.trim();
  }

  if (required) {
    validator = validator
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage(`The ${parameterName} is required`);
  }

  const range = max === undefined ? { min } : { min, max };
  const rangeMessage =
    max === undefined ? ` and greater or equals than ${min}` : ` and between ${min} and ${max}`;

  if (kind === 'float') {
    return validator
      .isFloat(range)
      .withMessage(`The ${parameterName} must be a numeric value${rangeMessage}`)
      .toFloat();
  }

  return validator
    .isInt(range)
    .withMessage(`The ${parameterName} must be an integer value${rangeMessage}`)
    .toInt();
};

/**
 * Creates a text validator for a field.
 *
 * @param {'body' | 'query' | 'param'} location
 * @param {string} parameterName
 * @param {TextValidatorOptions} [options]
 * @returns {*}
 */
const textValue = (
  location,
  parameterName,
  { required = true, min = 1, max = 255, pattern, message } = {}
) => {
  const resolver = { body, query, param }[location];
  let validator = resolver(parameterName).trim();

  if (!required) {
    validator = validator.optional();
  }

  if (required) {
    validator = validator
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage(`The ${parameterName} is required`);
  }

  validator = validator
    .isLength({ min, max })
    .withMessage(`The ${parameterName} must be between ${min} and ${max} characters`);

  if (pattern) {
    validator = validator
      .matches(pattern)
      .withMessage(message || `The ${parameterName} contains invalid characters`);
  }

  return validator;
};

/**
 * Creates a validator for a field that must match one of the allowed values.
 *
 * @param {'body' | 'query' | 'param'} location
 * @param {string} parameterName
 * @param {string[]} validValues
 * @param {EnumValidatorOptions} [options]
 * @returns {*}
 */
const enumValue = (location, parameterName, validValues, { required = false, message } = {}) => {
  const resolver = { body, query, param }[location];
  let validator = resolver(parameterName).trim();

  if (!required) {
    validator = validator.optional();
  }

  if (required) {
    validator = validator
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage(`The ${parameterName} is required`);
  }

  return validator
    .isIn(validValues)
    .withMessage(message || `The ${parameterName} must be one of [${validValues.join(', ')}]`);
};

/**
 * Creates a reusable email validator for a field.
 *
 * @param {'body' | 'query' | 'param'} location
 * @param {string} parameterName
 * @param {EmailValidatorOptions} [options]
 * @returns {*}
 */
const emailValue = (
  location,
  parameterName,
  { required = true, min = 5, max = 64, message } = {}
) => {
  const resolver = { body, query, param }[location];
  let validator = resolver(parameterName).trim().toLowerCase();

  if (!required) {
    validator = validator.optional();
  }

  if (required) {
    validator = validator
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage(`The ${parameterName} is required`);
  }

  return validator
    .isLength({ min, max })
    .withMessage(`The ${parameterName} must be between ${min} and ${max} characters`)
    .isEmail()
    .withMessage(message || `The ${parameterName} format is invalid`);
};

/**
 * Creates a numeric identifier validator for a route parameter.
 *
 * @param {string} parameterName
 * @returns {*}
 */
const resourceId = (parameterName) => resourceValue('param', parameterName);

/**
 * Creates a UUID v4 validator for a route parameter.
 *
 * @param {string} parameterName
 * @returns {*}
 */
const resourceUuid = (parameterName) => resourceValue('param', parameterName, { format: 'uuid' });

/**
 * Creates a numeric identifier validator for a body field.
 *
 * @param {string} parameterName
 * @returns {*}
 */
const resourceIdInBody = (parameterName) => resourceValue('body', parameterName);

/**
 * Creates an optional numeric identifier validator for a query parameter.
 *
 * @param {string} parameterName
 * @returns {*}
 */
const resourceIdInQuery = (parameterName) =>
  resourceValue('query', parameterName, { required: false, min: 1 });

/**
 * Creates a UUID v4 validator for a body field.
 *
 * @param {string} parameterName
 * @returns {*}
 */
const resourceUuidInBody = (parameterName) =>
  resourceValue('body', parameterName, { format: 'uuid' });

/**
 * Creates a UUID v4 validator for a query parameter.
 *
 * @param {string} parameterName
 * @returns {*}
 */
const resourceUuidInQuery = (parameterName) =>
  resourceValue('query', parameterName, { format: 'uuid' });

/**
 * Creates an integer validator for a body field.
 *
 * @param {string} parameterName
 * @param {NumericValidatorOptions} [options]
 * @returns {*}
 */
const integerInBody = (parameterName, options = {}) =>
  numericValue('body', parameterName, { min: 1, ...options, kind: 'integer' });

/**
 * Creates an integer validator for a query parameter.
 *
 * @param {string} parameterName
 * @param {NumericValidatorOptions} [options]
 * @returns {*}
 */
const integerInQuery = (parameterName, options = {}) =>
  numericValue('query', parameterName, { min: 1, ...options, kind: 'integer' });

/**
 * Creates a numeric validator for a body field.
 *
 * @param {string} parameterName
 * @param {NumericValidatorOptions} [options]
 * @returns {*}
 */
const numberInBody = (parameterName, options = {}) =>
  numericValue('body', parameterName, { min: 0, ...options, kind: 'float' });

/**
 * Creates a numeric validator for a query parameter.
 *
 * @param {string} parameterName
 * @param {NumericValidatorOptions} [options]
 * @returns {*}
 */
const numberInQuery = (parameterName, options = {}) =>
  numericValue('query', parameterName, { min: 0, ...options, kind: 'float' });

/**
 * Creates a text validator for a body field.
 *
 * @param {string} parameterName
 * @param {TextValidatorOptions} [options]
 * @returns {*}
 */
const textInBody = (parameterName, options = {}) =>
  textValue('body', parameterName, { min: 1, max: 255, ...options });

/**
 * Creates an optional text validator for a query parameter.
 *
 * @param {string} parameterName
 * @param {Omit<TextValidatorOptions, 'required'>} [options]
 * @returns {*}
 */
const textInQuery = (parameterName, options = {}) =>
  textValue('query', parameterName, { required: false, min: 1, max: 50, ...options });

/**
 * Creates a validator for a body field that must match one of the allowed values.
 *
 * @param {string} parameterName
 * @param {string[]} validValues
 * @param {EnumValidatorOptions} [options]
 * @returns {*}
 */
const enumInBody = (parameterName, validValues, options = {}) =>
  enumValue('body', parameterName, validValues, { required: true, ...options });

/**
 * Creates an optional validator for a query parameter that must match one of the allowed values.
 *
 * @param {string} parameterName
 * @param {string[]} validValues
 * @param {EnumValidatorOptions} [options]
 * @returns {*}
 */
const enumInQuery = (parameterName, validValues, options = {}) =>
  enumValue('query', parameterName, validValues, options);

/**
 * Creates a UUID v4 validator for a body field.
 *
 * @param {string} parameterName
 * @returns {*}
 */
const uuidInBody = (parameterName) => resourceValue('body', parameterName, { format: 'uuid' });

/**
 * Creates a UUID v4 validator for a query parameter.
 *
 * @param {string} parameterName
 * @returns {*}
 */
const uuidInQuery = (parameterName) => resourceValue('query', parameterName, { format: 'uuid' });

/**
 * Creates an array validator for a body field.
 *
 * @param {string} parameterName
 * @param {{ min?: number }} [options]
 * @returns {*}
 */
const arrayInBody = (parameterName, { min = 1 } = {}) =>
  body(parameterName)
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage(`The ${parameterName} is required`)
    .isArray({ min })
    .withMessage(
      `The ${parameterName} must be an array with at least ${min} item${min === 1 ? '' : 's'}`
    );

/**
 * Creates an email validator for a body field.
 *
 * @param {string} parameterName
 * @param {EmailValidatorOptions} [options]
 * @returns {*}
 */
const emailInBody = (parameterName, options = {}) =>
  emailValue('body', parameterName, { min: 5, max: 64, ...options });

/**
 * Creates a password validator for a body field.
 *
 * @param {string} [parameterName='password']
 * @param {PasswordValidatorOptions} [options]
 * @returns {*}
 */
const passwordInBody = (parameterName = 'password', options = {}) =>
  textValue('body', parameterName, {
    min: 8,
    max: 32,
    ...options,
    message: options.message || `The ${parameterName} contains invalid characters`,
  });

/**
 * Creates a confirmation password validator for a body field.
 *
 * @param {string} passwordParameterName
 * @param {string} [confirmationParameterName]
 * @returns {*}
 */
const confirmPassword = (passwordParameterName, confirmationParameterName) =>
  body(confirmationParameterName)
    .trim()
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage(`The ${confirmationParameterName} is required`)
    .isLength({ min: 8, max: 32 })
    .withMessage(`The ${confirmationParameterName} must be between 8 and 32 characters`)
    .custom((value, { req }) => {
      if (value !== req.body[passwordParameterName]) {
        throw new Error(`The ${confirmationParameterName} does not match ${passwordParameterName}`);
      }

      return true;
    });

/**
 * Validates the required email body field.
 *
 * @type {*}
 */
const email = (parameterName) => emailInBody(parameterName);

/**
 * Validates the required password body field.
 *
 * @type {*}
 */
const password = (parameterName) => passwordInBody(parameterName);

/**
 * Validates search query in query parameters.
 *
 * @type {*}
 */
const search = query('search')
  .trim()
  .isAlphanumeric('es-ES', { ignore: '\\s\\.\\+\\-' })
  .withMessage('The search contains invalid characters')
  .isLength({ min: 1, max: 50 })
  .withMessage('The search must be between 1 and 50 characters')
  .optional();

/**
 * Validates page in query parameters.
 *
 * @type {*}
 */
const page = query('page')
  .trim()
  .isInt({ min: 1 })
  .withMessage('The page parameter must be an integer value and greater or equals than 1')
  .toInt()
  .optional();

/**
 * Validates page in query parameters.
 *
 * @type {*}
 */
const size = query('size')
  .trim()
  .isInt({ min: 1, max: 100 })
  .withMessage('The size parameter must be an integer value and between 1 and 100')
  .toInt()
  .optional();

/**
 * Validates sort in query parameters.
 *
 * @type {*}
 */
const sort = (validValues, options = {}) => enumValue('query', 'sort', validValues, options);

export default {
  resourceId,
  resourceIdInQuery,
  resourceIdInBody,
  resourceUuid,
  resourceUuidInBody,
  resourceUuidInQuery,
  uuidInBody,
  uuidInQuery,
  integerInBody,
  integerInQuery,
  numberInBody,
  numberInQuery,
  textInBody,
  textInQuery,
  enumInBody,
  enumInQuery,
  arrayInBody,
  email,
  password,
  confirmPassword,
  search,
  page,
  size,
  sort,
};

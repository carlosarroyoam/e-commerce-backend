const { body, param } = require('express-validator');
const sanitizers = require('../../../utils/sanitizers.utils');

module.exports = [
  param('adminId')
    .trim()
    .isInt()
    .withMessage('The adminId must be an integer'),

  body('first_name')
    .trim()
    .customSanitizer((value) => sanitizers.capitalizeWords(value))
    .isLength({ min: 5, max: 50 })
    .withMessage('The email must be between 5 and 50 characters'),

  body('last_name')
    .trim()
    .customSanitizer((value) => sanitizers.capitalizeWords(value))
    .isLength({ min: 5, max: 50 })
    .withMessage('The email must be between 5 and 50 characters'),

  body('email')
    .trim()
    .toLowerCase()
    .isEmail()
    .withMessage('The email format is invalid')
    .isLength({ min: 5, max: 128 })
    .withMessage('The email must be between 5 and 128 characters'),

  body('password')
    .trim()
    .isLength({ min: 8, max: 16 })
    .withMessage('The password must be between 8 and 16 characters'),

  body('is_super')
    .trim()
    .toBoolean()
    .isBoolean()
    .withMessage('The is_super must be a boolean value'),
];

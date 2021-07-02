/* eslint-disable security/detect-non-literal-fs-filename */

const { body } = require('express-validator');

module.exports = [
  body('email')
    .trim()
    .toLowerCase()
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('The email is required')
    .isEmail()
    .withMessage('The email format is invalid')
    .isLength({ min: 5, max: 128 })
    .withMessage('The email must be between 5 and 128 characters'),

  body('password')
    .trim()
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('The password is required')
    .isLength({ min: 8, max: 16 })
    .withMessage('The password must be between 8 and 16 characters'),
];

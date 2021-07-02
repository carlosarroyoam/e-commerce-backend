/* eslint-disable security/detect-non-literal-fs-filename */

const { param } = require('express-validator');

module.exports = [
  param('adminId')
    .trim()
    .toInt()
    .isInt()
    .withMessage('The adminId must be an integer value'),
];

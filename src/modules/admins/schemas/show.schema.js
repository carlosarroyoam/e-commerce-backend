/* eslint-disable security/detect-non-literal-fs-filename */

const { param } = require('express-validator');

module.exports = [
  param('adminId')
    .trim()
    .isInt()
    .toInt()
    .withMessage('The adminId must be an integer value'),
];

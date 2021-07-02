/* eslint-disable security/detect-non-literal-fs-filename */

const { param } = require('express-validator');

module.exports = [
  param('userId')
    .trim()
    .isInt()
    .toInt()
    .withMessage('The userId must be an integer value'),
];

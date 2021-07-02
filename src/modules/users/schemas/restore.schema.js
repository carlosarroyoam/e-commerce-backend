/* eslint-disable security/detect-non-literal-fs-filename */

const { param } = require('express-validator');

module.exports = [
  param('userId')
    .trim()
    .toInt()
    .exists({ checkNull: true, checkFalsy: true })
    .isInt()
    .withMessage('The userId must be an integer value'),
];

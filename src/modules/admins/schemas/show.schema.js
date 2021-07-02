const { param } = require('express-validator');

module.exports = [
  param('adminId')
    .trim()
    .toInt()
    .isInt()
    .withMessage('The adminId must be an integer value'),
];

const { param } = require('express-validator');

module.exports = [
  param('adminId')
    .trim()
    .isInt()
    .toInt()
    .withMessage('The adminId must be an integer value'),
];

const { query } = require('express-validator');

module.exports = [
  query('skip')
    .trim()
    .isInt()
    .toInt()
    .withMessage('The skip parameter must be an integer value'),
];

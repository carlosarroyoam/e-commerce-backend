const { query } = require('express-validator');

module.exports = [
    query('skip')
        .trim()
        .default(0)
        .isInt()
        .withMessage('The skip parameter must be an integer value')
        .toInt(),
];

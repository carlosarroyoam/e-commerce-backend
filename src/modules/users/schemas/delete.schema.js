const { param } = require('express-validator');

module.exports = [
    param('userId')
        .trim()
        .isInt()
        .withMessage('The userId must be an integer value')
        .toInt(),
];

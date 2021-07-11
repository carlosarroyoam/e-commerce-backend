const { param } = require('express-validator');

module.exports = [
    param('adminId')
        .trim()
        .isInt()
        .withMessage('The adminId must be an integer value')
        .toInt(),
];

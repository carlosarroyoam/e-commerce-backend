/* eslint-disable security/detect-non-literal-fs-filename */

const { body } = require('express-validator');
const stringUtils = require('../../../utils/string.utils');

module.exports = [
    body('first_name')
        .whitelist('A-zÀ-ú\\s\\.')
        .trim()
        .customSanitizer((value) => stringUtils.capitalizeWords(value))
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage('The first_name is required')
        .isLength({ min: 5, max: 50 })
        .withMessage('The first_name must be between 5 and 50 characters'),

    body('last_name')
        .whitelist('A-zÀ-ú\\s\\.')
        .trim()
        .customSanitizer((value) => stringUtils.capitalizeWords(value))
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage('The last_name is required')
        .isLength({ min: 5, max: 50 })
        .withMessage('The last_name must be between 5 and 50 characters'),

    body('email')
        .trim()
        .toLowerCase()
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage('The email is required')
        .isLength({ min: 5, max: 64 })
        .withMessage('The email must be between 5 and 64 characters')
        .isEmail()
        .withMessage('The email format is invalid'),

    body('password')
        .trim()
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage('The password is required')
        .isLength({ min: 8, max: 16 })
        .withMessage('The password must be between 8 and 16 characters'),

    body('password_confirm')
        .trim()
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage('The password_confirm is required')
        .isLength({ min: 8, max: 16 })
        .withMessage('The password_confirm must be between 8 and 16 characters')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error(
                    'The password confirmation does not match password'
                );
            }

            return true;
        }),
];

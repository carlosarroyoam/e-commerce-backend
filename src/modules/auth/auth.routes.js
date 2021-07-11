const { Router } = require('express');
const validateRequestMiddleware = require('../core/middlewares/validateRequest.middleware');
const loginSchema = require('./schemas/login.schema');
const refreshTokenSchema = require('./schemas/refreshtoken.schema');
const Fingerprint = require('express-fingerprint');

const fingerPrintMiddleware = Fingerprint({
    parameters: [
        Fingerprint.useragent,
        Fingerprint.acceptHeaders,
        Fingerprint.geoip,
    ],
});

module.exports = ({ authController }) => {
    const router = Router();

    router.post(
        '/login',
        validateRequestMiddleware(loginSchema),
        fingerPrintMiddleware,
        authController.login.bind(authController)
    );

    router.post(
        '/refresh-token',
        validateRequestMiddleware(refreshTokenSchema),
        fingerPrintMiddleware,
        authController.refreshToken.bind(authController)
    );

    return router;
};

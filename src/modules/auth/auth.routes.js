const { Router } = require('express');
const validateRequestMiddleware = require('../core/middlewares/validateRequest.middleware');
const loginSchema = require('./schemas/login.schema');
const logoutSchema = require('./schemas/logout.schema');
const refreshTokenSchema = require('./schemas/refreshtoken.schema');

module.exports = ({ authController, verifyTokenMiddleware }) => {
    const router = Router();

    router.post(
        '/login',
        validateRequestMiddleware(loginSchema),
        authController.login.bind(authController)
    );

    router.post(
        '/logout',
        validateRequestMiddleware(logoutSchema),
        authController.logout.bind(authController)
    );

    router.post(
        '/refresh-token',
        validateRequestMiddleware(refreshTokenSchema),
        authController.refreshToken.bind(authController)
    );

    return router;
};

const {
  asClass, asFunction, asValue,
} = require('awilix');

const AuthRoutes = require('./auth.routes');
const AuthController = require('./auth.controller');
const AuthService = require('./auth.service');
const AuthRepository = require('./auth.repository');
const AuthDao = require('./auth.dao');
const UserNotFoundError = require('./errors/userNotFound.error');
const UnauthorizedError = require('./errors/unauthorizedError.error');
const ForbiddenError = require('./errors/forbiddenError.error');
const VerifyTokenMiddleware = require('./middlewares/verifyToken.middleware');

module.exports = {
  authRoutes: asFunction(AuthRoutes).singleton(),
  authController: asClass(AuthController).singleton(),
  authService: asClass(AuthService).singleton(),
  authRepository: asClass(AuthRepository).singleton(),
  authDao: asValue(AuthDao),
  authErrors: asValue({
    UserNotFoundError,
    UnauthorizedError,
    ForbiddenError,
  }),
  verifyTokenMiddleware: asFunction(VerifyTokenMiddleware).singleton(),
};

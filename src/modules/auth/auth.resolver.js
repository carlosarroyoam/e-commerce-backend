const {
  asClass, asFunction,
} = require('awilix');

const AuthRoutes = require('./auth.routes');
const AuthController = require('./auth.controller');
const AuthService = require('./auth.service');
const AuthRepository = require('./repositories/auth.repository');
const AuthDao = require('./dao/auth.dao');

module.exports = {
  authRoutes: asFunction(AuthRoutes).singleton(),
  authController: asClass(AuthController).singleton(),
  authService: asClass(AuthService).singleton(),
  authRepository: asClass(AuthRepository).singleton(),
  authDao: asClass(AuthDao).singleton(),
};

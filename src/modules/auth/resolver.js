const {
  asClass,
} = require('awilix');

const AuthController = require('./auth.controller');
const AuthService = require('./auth.service');
const AuthRepository = require('./repositories/auth.repository');
const AuthDao = require('./dao/auth.dao');

module.exports = {
  authController: asClass(AuthController).singleton(),
  authService: asClass(AuthService).singleton(),
  authRepository: asClass(AuthRepository).singleton(),
  authDao: asClass(AuthDao).singleton(),
};

const {
  asClass, asFunction, asValue,
} = require('awilix');

const UserRoutes = require('./user.routes');
const UserController = require('./user.controller');
const UserService = require('./user.service');
const UserRepository = require('./user.repository');
const UserDao = require('./user.dao');
const UserMapper = require('./mappers/user.mapper');
const UserErrors = require('./errors');

module.exports = {
  userRoutes: asFunction(UserRoutes).singleton(),
  userController: asClass(UserController).singleton(),
  userService: asClass(UserService).singleton(),
  userRepository: asClass(UserRepository).singleton(),
  userDao: asClass(UserDao).singleton(),
  userMapper: asClass(UserMapper).singleton(),
  userErrors: asValue(UserErrors),
};

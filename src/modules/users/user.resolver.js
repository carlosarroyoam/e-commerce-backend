const {
  asClass, asFunction, asValue,
} = require('awilix');

const UserRoutes = require('./user.routes');
const UserController = require('./user.controller');
const UserService = require('./user.service');
const UserRepository = require('./user.repository');
const UserDao = require('./user.dao');
const UserMapper = require('./mappers/user.mapper');
const UserNotFoundError = require('./errors/userNotFound.error');

module.exports = {
  userRoutes: asFunction(UserRoutes).singleton(),
  userController: asClass(UserController).singleton(),
  userService: asClass(UserService).singleton(),
  userRepository: asClass(UserRepository).singleton(),
  userDao: asValue(UserDao),
  userMapper: asClass(UserMapper).singleton(),
  userErrors: asValue({ UserNotFoundError }),
};

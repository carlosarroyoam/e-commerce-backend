const {
  asClass,
} = require('awilix');

const UserController = require('./user.controller');
const UserService = require('./user.service');
const UserRepository = require('./repositories/user.repository');
const UserDao = require('./dao/user.dao');
const UserMapper = require('./mappers/user.mapper');

module.exports = {
  userController: asClass(UserController).singleton(),
  userService: asClass(UserService).singleton(),
  userRepository: asClass(UserRepository).singleton(),
  userDao: asClass(UserDao).singleton(),
  userMapper: asClass(UserMapper).singleton(),
};

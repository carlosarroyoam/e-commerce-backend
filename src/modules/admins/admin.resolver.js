const {
  asClass, asFunction, asValue,
} = require('awilix');

const AdminRoutes = require('./admin.routes');
const AdminController = require('./admin.controller');
const AdminService = require('./admin.service');
const AdminRepository = require('./admin.repository');
const AdminDao = require('./admin.dao');
const AdminMapper = require('./mappers/admin.mapper');
const UserNotFoundError = require('./errors/userNotFound.error');
const EmailAlreadyTakenError = require('./errors/emailAlreadyTakenError.error');

module.exports = {
  adminRoutes: asFunction(AdminRoutes).singleton(),
  adminController: asClass(AdminController).singleton(),
  adminService: asClass(AdminService).singleton(),
  adminRepository: asClass(AdminRepository).singleton(),
  adminDao: asClass(AdminDao).singleton(),
  adminMapper: asClass(AdminMapper).singleton(),
  adminErrors: asValue({
    UserNotFoundError,
    EmailAlreadyTakenError,
  }),
};

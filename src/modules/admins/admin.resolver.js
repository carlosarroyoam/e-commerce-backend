const {
  asClass, asFunction,
} = require('awilix');

const AdminRoutes = require('./admin.routes');
const AdminController = require('./admin.controller');
const AdminService = require('./admin.service');
const AdminRepository = require('./repositories/admin.repository');
const AdminDao = require('./dao/admin.dao');
const AdminMapper = require('./mappers/admin.mapper');

module.exports = {
  adminRoutes: asFunction(AdminRoutes).singleton(),
  adminController: asClass(AdminController).singleton(),
  adminService: asClass(AdminService).singleton(),
  adminRepository: asClass(AdminRepository).singleton(),
  adminDao: asClass(AdminDao).singleton(),
  adminMapper: asClass(AdminMapper).singleton(),
};

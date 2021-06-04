const {
  asClass, asFunction, asValue, createContainer,
} = require('awilix');

const container = createContainer();

const Server = require('./server');
const DatabaseConnection = require('../lib/mysql/connection');
const Logger = require('../lib/winston/logger');
const BcryptHashing = require('../lib/bcrypt');
const JsonWebToken = require('../lib/jwt');

const AuthController = require('../modules/auth/auth.controller');
const UserController = require('../modules/users/user.controller');
const AdminController = require('../modules/admins/admin.controller');

const AuthService = require('../modules/auth/auth.service');
const UserService = require('../modules/users/user.service');
const AdminService = require('../modules/admins/admin.service');

const AuthRepository = require('../modules/auth/repositories/auth.repository');
const UserRepository = require('../modules/users/repositories/user.repository');
const AdminRepository = require('../modules/admins/repositories/admin.repository');

const AuthDao = require('../modules/auth/dao/auth.dao');
const UserDao = require('../modules/users/dao/user.dao');
const AdminDao = require('../modules/admins/dao/admin.dao');

const UserMapper = require('../modules/users/mappers/user.mapper');
const AdminMapper = require('../modules/admins/mappers/admin.mapper');

const RootRoute = require('./routes/root.routes');
const DefaultRoute = require('./routes/default.routes');
const AuthRoutes = require('../modules/auth/auth.routes');
const UserRoutes = require('../modules/users/user.routes');
const AdminRoutes = require('../modules/admins/admin.routes');

const VerifyJwt = require('./middlewares/verifyJwt.middleware');
const Validate = require('./middlewares/validate.middleware');

const Routes = require('./router');
const Config = require('../config');
const Exceptions = require('../errors');
const StringUtils = require('../utils/string.utils');

container
  // App
  .register({
    server: asClass(Server).singleton(),
  })
  // Config
  .register({
    config: asValue(Config),
  })
  // Database connection
  .register({
    dbConnection: asClass(DatabaseConnection).singleton(),
  })
  // Logger
  .register({
    logger: asClass(Logger).singleton(),
  })
  // Bcrypt
  .register({
    bcrypt: asClass(BcryptHashing).singleton(),
  })
  // JsonWebToken
  .register({
    jsonwebtoken: asClass(JsonWebToken).singleton(),
  })
  // Router
  .register({
    router: asFunction(Routes).singleton(),
  })
  // Routes
  .register({
    rootRoute: asFunction(RootRoute).singleton(),
    defaultRoute: asFunction(DefaultRoute).singleton(),
    authRoutes: asFunction(AuthRoutes).singleton(),
    userRoutes: asFunction(UserRoutes).singleton(),
    adminRoutes: asFunction(AdminRoutes).singleton(),
  })
  // Middlewares
  .register({
    validateMiddleware: asFunction(Validate).singleton(),
    verifyJwtMiddleware: asFunction(VerifyJwt).singleton(),
  })
  // Controllers
  .register({
    authController: asClass(AuthController).singleton(),
    userController: asClass(UserController).singleton(),
    adminController: asClass(AdminController).singleton(),
  })
  // Services
  .register({
    authService: asClass(AuthService).singleton(),
    userService: asClass(UserService).singleton(),
    adminService: asClass(AdminService).singleton(),
  })
  // Repositories
  .register({
    authRepository: asClass(AuthRepository).singleton(),
    userRepository: asClass(UserRepository).singleton(),
    adminRepository: asClass(AdminRepository).singleton(),
  })
  // Dao
  .register({
    authDao: asClass(AuthDao).singleton(),
    userDao: asClass(UserDao).singleton(),
    adminDao: asClass(AdminDao).singleton(),
  })
  // Mappers
  .register({
    userMapper: asClass(UserMapper).singleton(),
    adminMapper: asClass(AdminMapper).singleton(),
  })
  // Exceptions
  .register({
    exceptions: asValue(Exceptions),
  })
  // Utils
  .register({
    stringUtils: asValue(StringUtils),
  });

module.exports = container;

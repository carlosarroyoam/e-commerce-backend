const {
  asClass, asFunction, asValue, createContainer,
} = require('awilix');

const container = createContainer();

const Server = require('./server');
const DatabaseConnection = require('../lib/mysql/connection');
const Logger = require('../lib/winston/logger');
const BcryptHashing = require('../lib/bcrypt');
const JsonWebToken = require('../lib/jwt');

const {
  AuthController, UserController, AdminController, BookController,
} = require('./controllers');

const {
  AuthService, UserService, AdminService, BookService,
} = require('../services');

const { UserRepository, BookRepository } = require('../dal/repositories');

const { UserDao, AdminDao } = require('../dal/dao');

const { UserMapper, AdminMapper } = require('../mappers');

const RootRoute = require('./routes/root.routes');
const DefaultRoute = require('./routes/default.routes');
const AuthRoutes = require('./routes/auth.routes');
const UserRoutes = require('./routes/user.routes');
const AdminRoutes = require('./routes/admin.routes');
const BookRoutes = require('./routes/book.routes');

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
    bookRoutes: asFunction(BookRoutes).singleton(),
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
    bookController: asClass(BookController).singleton(),
  })
  // Services
  .register({
    authService: asClass(AuthService).singleton(),
    userService: asClass(UserService).singleton(),
    adminService: asClass(AdminService).singleton(),
    bookService: asClass(BookService).singleton(),
  })
  // Repositories
  .register({
    userRepository: asClass(UserRepository).singleton(),
    bookRepository: asClass(BookRepository).singleton(),
  })
  // Dao
  .register({
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

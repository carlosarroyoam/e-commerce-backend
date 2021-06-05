const {
  asClass, asFunction, asValue, createContainer,
} = require('awilix');

const container = createContainer();

const Server = require('./server');
const DatabaseConnection = require('../lib/mysql/connection');
const Logger = require('../lib/winston/logger');
const BcryptHashing = require('../lib/bcrypt');
const JsonWebToken = require('../lib/jwt');

const AuthModule = require('../modules/auth/auth.resolver');
const UserModule = require('../modules/users/user.resolver');
const AdminModule = require('../modules/admins/admin.resolver');

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
  // Modules
  .register(AuthModule)
  .register(UserModule)
  .register(AdminModule)
  // Exceptions
  .register({
    exceptions: asValue(Exceptions),
  })
  // Utils
  .register({
    stringUtils: asValue(StringUtils),
  });

module.exports = container;

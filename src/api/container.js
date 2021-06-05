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

const VerifyJwt = require('./middlewares/verifyJwt.middleware');
const Validate = require('./middlewares/validate.middleware');

const Router = require('./router');
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
  // Libraries
  .register({
    dbConnection: asClass(DatabaseConnection).singleton(),
    logger: asClass(Logger).singleton(),
    bcrypt: asClass(BcryptHashing).singleton(),
    jsonwebtoken: asClass(JsonWebToken).singleton(),
  })
  // Router
  .register({
    router: asFunction(Router).singleton(),
  })
  // Routes
  .register({
    rootRoute: asFunction(RootRoute).singleton(),
    defaultRoute: asFunction(DefaultRoute).singleton(),
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

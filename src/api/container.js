const { asFunction, asValue, createContainer } = require('awilix');

const container = createContainer();

const Server = require('./server');
const DatabaseConnectionPool = require('../shared/lib/mysql/connectionPool');
const Logger = require('../shared/lib/winston/logger');
const BcryptHashing = require('../shared/lib/bcrypt');
const JsonWebToken = require('../shared/lib/jwt');

const Shared = require('../shared/shared.resolver');
const AuthModule = require('../modules/auth/auth.resolver');
const UserModule = require('../modules/users/user.resolver');
const AdminModule = require('../modules/admins/admin.resolver');

const Router = require('./router');
const Config = require('../config');
const StringUtils = require('../shared/utils/string.utils');

container
  // App
  .register({
    server: asFunction(Server).singleton(),
  })
  // Config
  .register({
    config: asValue(Config),
  })
  // Router
  .register({
    router: asFunction(Router).singleton(),
  })
  // Libraries
  .register({
    dbConnectionPool: asValue(DatabaseConnectionPool),
    logger: asValue(Logger),
    bcrypt: asValue(BcryptHashing),
    jsonwebtoken: asValue(JsonWebToken),
  })
  // Utils
  .register({
    stringUtils: asValue(StringUtils),
  })
  // Modules
  .register(Shared)
  .register(AuthModule)
  .register(UserModule)
  .register(AdminModule);

module.exports = container;

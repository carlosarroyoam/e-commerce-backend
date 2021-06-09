const {
  asClass, asFunction, asValue, createContainer,
} = require('awilix');

const container = createContainer();

const Server = require('./server');
const DatabaseConnection = require('../lib/mysql/connection');
const Logger = require('../lib/winston/logger');
const BcryptHashing = require('../lib/bcrypt');
const JsonWebToken = require('../lib/jwt');

const CoreModule = require('../modules/core/core.resolver');
const AuthModule = require('../modules/auth/auth.resolver');
const UserModule = require('../modules/users/user.resolver');
const AdminModule = require('../modules/admins/admin.resolver');

const Router = require('./router');
const Config = require('../config');
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
  // Router
  .register({
    router: asFunction(Router).singleton(),
  })
  // Libraries
  .register({
    dbConnection: asClass(DatabaseConnection).singleton(),
    logger: asClass(Logger).singleton(),
    bcrypt: asClass(BcryptHashing).singleton(),
    jsonwebtoken: asClass(JsonWebToken).singleton(),
  })
  // Utils
  .register({
    stringUtils: asValue(StringUtils),
  })
  // Modules
  .register(CoreModule)
  .register(AuthModule)
  .register(UserModule)
  .register(AdminModule);

module.exports = container;

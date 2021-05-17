const {
  asClass, asFunction, asValue, createContainer,
} = require('awilix');

const container = createContainer();

const StartUp = require('./startup');
const Server = require('./server');
const DatabaseConnection = require('../lib/mysql/connection');

const { UserController, BookController } = require('./controllers');

const { UserService, BookService } = require('../services');

const { UserRepository, BookRepository } = require('../dal/repositories');

const { UserDao } = require('../dal/dao');

const { UserMapper } = require('../mappers');

const RootRoute = require('./routes/root.routes');
const DefaultRoute = require('./routes/default.routes');
const UserRoutes = require('./routes/user.routes');
const BookRoutes = require('./routes/book.routes');

const Routes = require('./routes');
const Config = require('../config/environments');
const Exceptions = require('../exceptions');

container
  // App
  .register({
    app: asClass(StartUp).singleton(),
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
  // Router
  .register({
    router: asFunction(Routes).singleton(),
  })
  // Routes
  .register({
    rootRoute: asFunction(RootRoute).singleton(),
    defaultRoute: asFunction(DefaultRoute).singleton(),
    userRoutes: asFunction(UserRoutes).singleton(),
    bookRoutes: asFunction(BookRoutes).singleton(),
  })
  // Controllers
  .register({
    userController: asClass(UserController).singleton(),
    bookController: asClass(BookController).singleton(),
  })
  // Services
  .register({
    userService: asClass(UserService).singleton(),
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
  })
  // Mappers
  .register({
    userMapper: asClass(UserMapper).singleton(),
  })
  // Exceptions
  .register({
    exceptions: asValue(Exceptions),
  });

module.exports = container;

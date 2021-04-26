const {
  asClass, asFunction, asValue, createContainer,
} = require('awilix');

const container = createContainer();

const StartUp = require('./startup');
const Server = require('./server');

const { UserController, BookController } = require('./controllers/index');

// const {UserService, BookService} = require('./services/index');

const RootRoute = require('./routes/root/root.routes');
const DefaultRoute = require('./routes/default/default.routes');
const UserRoutes = require('./routes/users/user.routes');
const BookRoutes = require('./routes/books/book.routes');

const Routes = require('./routes');
const Config = require('../config/environments');

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
  });
// Services
// .register({
//     userService: asClass(UserService).singleton(),
//     bookService: asClass(BookService).singleton(),
// });

module.exports = container;

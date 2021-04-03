const { asClass, asFunction, asValue, createContainer } = require('awilix');
const container = createContainer();

const StartUp = require('./startup');
const Server = require('./server');

const UserController = require('./controllers/user.controller');
const BookController = require('./controllers/book.controller');

const UserRoutes = require('./routes/user.routes');
const BookRoutes = require('./routes/book.routes');

const Routes = require('./routes');
const Config = require('../config/environments');

container
    .register({
        app: asClass(StartUp).singleton(),
        server: asClass(Server).singleton(),
    })
    .register({
        UserController: asClass(UserController).singleton(),
        BookController: asClass(BookController).singleton(),
    })
    .register({
        router: asFunction(Routes).singleton(),
    })
    .register({
        config: asValue(Config)
    })
    .register({
        UserRoutes: asFunction(UserRoutes).singleton(),
        BookRoutes: asFunction(BookRoutes).singleton(),
    });

module.exports = container;
const {
  asFunction,
} = require('awilix');

const RootRoute = require('./routes/root.routes');
const DefaultRoute = require('./routes/default.routes');
const ValidateRequestMiddleware = require('./middlewares/validateRequest.middleware');

module.exports = {
  rootRoute: asFunction(RootRoute).singleton(),
  defaultRoute: asFunction(DefaultRoute).singleton(),
  validateRequestMiddleware: asFunction(ValidateRequestMiddleware).singleton(),
};

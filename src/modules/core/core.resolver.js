const {
  asFunction, asValue,
} = require('awilix');

const RootRoute = require('./routes/root.routes');
const DefaultRoute = require('./routes/default.routes');
const ValidateRequestMiddleware = require('./middlewares/validateRequest.middleware');
const BadRequestError = require('./errors/badRequest.error');

module.exports = {
  rootRoute: asFunction(RootRoute).singleton(),
  defaultRoute: asFunction(DefaultRoute).singleton(),
  validateRequestMiddleware: asFunction(ValidateRequestMiddleware).singleton(),
  commonErrors: asValue({
    BadRequestError,
  }),
};

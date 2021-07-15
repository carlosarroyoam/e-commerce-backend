const { asFunction, asValue } = require('awilix');

const RootRoute = require('./routes/root.routes');
const DefaultRoute = require('./routes/default.routes');
const UnprocessableEntity = require('./errors/unprocessableEntity.error');

module.exports = {
  rootRoute: asFunction(RootRoute).singleton(),
  defaultRoute: asFunction(DefaultRoute).singleton(),
  commonErrors: asValue({
    UnprocessableEntity,
  }),
};

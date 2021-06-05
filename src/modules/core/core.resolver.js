const {
  asFunction,
} = require('awilix');

const RootRoute = require('./routes/default.routes');
const DefaultRoute = require('./routes/root.routes');

module.exports = {
  rootRoute: asFunction(RootRoute).singleton(),
  defaultRoute: asFunction(DefaultRoute).singleton(),
};

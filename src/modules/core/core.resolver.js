const {
  asFunction,
} = require('awilix');

const RootRoute = require('./routes/root.routes');
const DefaultRoute = require('./routes/default.routes');

module.exports = {
  rootRoute: asFunction(RootRoute).singleton(),
  defaultRoute: asFunction(DefaultRoute).singleton(),
};

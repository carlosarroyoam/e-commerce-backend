const info = require('./info');
const servers = require('./servers');
const components = require('./components');
const tags = require('./tags');
const admins = require('./paths/admins');
const auth = require('./paths/auth');
const users = require('./paths/users');

module.exports = {
  ...info,
  ...servers,
  ...tags,
  paths: {
    ...auth,
    ...users,
    ...admins,
  },
  ...components,
};

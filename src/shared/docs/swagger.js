const info = require('./info');
const servers = require('./servers');
const components = require('./components');
const tags = require('./tags');
const paths = require('./paths');

module.exports = {
  ...info,
  ...servers,
  ...tags,
  ...paths,
  ...components,
};

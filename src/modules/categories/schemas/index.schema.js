const validators = require('../../../shared/utils/validators.util');

module.exports = [
  validators.sort(['id', '-id', 'title', '-title']),
  validators.skip,
  validators.limit,
];

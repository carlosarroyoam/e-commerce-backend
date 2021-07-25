const validators = require('../../../shared/utils/validators.util');

module.exports = [
  validators.sort([
    'id',
    '-id',
    'first_name',
    '-first_name',
    'last_name',
    '-last_name',
    'email',
    '-email',
  ]),
  validators.userStatus,
  validators.skip,
  validators.search,
];

const validators = require('../../../common/utils/validators.util');

module.exports = [
	validators.sort(['id', '-id', 'title', '-title']),
	validators.userStatus,
	validators.skip,
	validators.limit,
	validators.search,
];

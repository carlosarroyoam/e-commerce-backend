import validators from '../../../common/utils/validators.util.js';

export default [
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
	validators.limit,
	validators.search,
];

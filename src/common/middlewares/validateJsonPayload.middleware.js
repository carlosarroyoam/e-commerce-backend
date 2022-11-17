const sharedErrors = require('../errors');

module.exports = () => async (error, request, response, next) => {
	// @ts-ignore
	if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
		const badRequestError = new sharedErrors.BadRequestError('The JSON payload is malformed');

		return next(badRequestError);
	}

	next(error);
};

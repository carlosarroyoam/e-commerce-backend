const { Router } = require('express');
const sharedErrors = require('../errors/index');

module.exports = () => {
	// eslint-disable-next-line new-cap
	const router = Router();

	router.all('*', (request, response, next) => {
		const route = request.originalUrl;
		const notFoundError = new sharedErrors.ResourceNotFoundError(
			`The ${route} route was not found on this server`
		);

		return next(notFoundError);
	});

	return router;
};

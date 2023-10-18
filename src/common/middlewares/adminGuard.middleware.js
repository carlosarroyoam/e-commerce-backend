import sharedErrors from '#common/errors/index.js';
import userRoles from '#modules/auth/roles.js';

export default async (request, response, next) => {
	const { user } = request;

	if (user?.role !== userRoles.admin.type) {
		const forbiddenError = new sharedErrors.ForbiddenError(
			'The user has not permission to perform this action'
		);

		return next(forbiddenError);
	}

	next();
};

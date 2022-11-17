const BadRequestError = require('./badRequest.error');
const EmailAlreadyTakenError = require('./emailAlreadyTakenError.error');
const ForbiddenError = require('./forbiddenError.error');
const UnauthorizedError = require('./unauthorizedError.error');
const UnprocessableEntityError = require('./unprocessableEntity.error');
const UserNotFoundError = require('./userNotFound.error');
const ResourceNotFoundError = require('./resourceNotFound.error');
const InternalServerError = require('./internalServerError.error');

module.exports = {
	BadRequestError,
	EmailAlreadyTakenError,
	ForbiddenError,
	UnauthorizedError,
	UnprocessableEntityError,
	UserNotFoundError,
	ResourceNotFoundError,
	InternalServerError,
};

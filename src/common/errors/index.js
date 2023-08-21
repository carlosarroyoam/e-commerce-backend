import BadRequestError from '#common/errors/badRequest.error.js';
import EmailAlreadyTakenError from '#common/errors/emailAlreadyTakenError.error.js';
import ForbiddenError from '#common/errors/forbiddenError.error.js';
import UnauthorizedError from '#common/errors/unauthorizedError.error.js';
import UnprocessableEntityError from '#common/errors/unprocessableEntity.error.js';
import UserNotFoundError from '#common/errors/userNotFound.error.js';
import ResourceNotFoundError from '#common/errors/resourceNotFound.error.js';
import InternalServerError from '#common/errors/internalServerError.error.js';

export default {
	BadRequestError,
	EmailAlreadyTakenError,
	ForbiddenError,
	UnauthorizedError,
	UnprocessableEntityError,
	UserNotFoundError,
	ResourceNotFoundError,
	InternalServerError,
};

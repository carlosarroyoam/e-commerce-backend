import BadRequestError from './badRequest.error.js';
import EmailAlreadyTakenError from './emailAlreadyTakenError.error.js';
import ForbiddenError from './forbiddenError.error.js';
import UnauthorizedError from './unauthorizedError.error.js';
import UnprocessableEntityError from './unprocessableEntity.error.js';
import UserNotFoundError from './userNotFound.error.js';
import ResourceNotFoundError from './resourceNotFound.error.js';
import InternalServerError from './internalServerError.error.js';

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

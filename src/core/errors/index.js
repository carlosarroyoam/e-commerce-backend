import BadRequestError from '#core/errors/badRequest.error.js';
import EmailAlreadyTakenError from '#core/errors/emailAlreadyTakenError.error.js';
import ForbiddenError from '#core/errors/forbiddenError.error.js';
import UnauthorizedError from '#core/errors/unauthorizedError.error.js';
import UnprocessableEntityError from '#core/errors/unprocessableEntity.error.js';
import UserNotFoundError from '#core/errors/userNotFound.error.js';
import ResourceNotFoundError from '#core/errors/resourceNotFound.error.js';
import InternalServerError from '#core/errors/internalServerError.error.js';

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

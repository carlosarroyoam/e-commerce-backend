const BadRequest = require('./badRequest.error');
const EmailAlreadyTakenError = require('./emailAlreadyTakenError.error');
const ForbiddenError = require('./forbiddenError.error');
const UnauthorizedError = require('./unauthorizedError.error');
const UnprocessableEntity = require('./unprocessableEntity.error');
const UserNotFoundError = require('./userNotFound.error');

module.exports = {
  BadRequest,
  EmailAlreadyTakenError,
  ForbiddenError,
  UnauthorizedError,
  UnprocessableEntity,
  UserNotFoundError,
};

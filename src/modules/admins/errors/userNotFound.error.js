/**
 * Error thrown when a user is not found.
 */
class UserNotFoundError extends Error {
  constructor() {
    super('User not found');
    this.name = 'Not found';
    this.status = 404;
  }
}

module.exports = UserNotFoundError;

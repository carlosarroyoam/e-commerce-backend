/**
 * Error thrown when a user cannot be authenticated.
 */
class UnauthorizedError extends Error {
  constructor({ email }) {
    super(`Failed to authorize user with email: ${email}`);
    this.name = 'Unauthorized';
    this.status = 401;
  }
}

module.exports = UnauthorizedError;

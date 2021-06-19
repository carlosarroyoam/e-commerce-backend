/**
 * Error thrown when a user request is malformed.
 */
class InternalServerError extends Error {
  constructor({ message }) {
    super(message);
    this.name = 'Internal server error';
    this.status = 500;
  }
}

module.exports = InternalServerError;

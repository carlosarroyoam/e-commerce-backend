/**
 * Error thrown when a user request is malformed.
 */
class BadRequestError extends Error {
  constructor() {
    super('Bad request');
    this.name = 'Unauthorized';
    this.status = 400;
  }
}

module.exports = BadRequestError;

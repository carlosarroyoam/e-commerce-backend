/**
 * Error thrown when a Resource is not found.
 */
class ResourceNotFoundError extends Error {
  constructor({ resourceName }) {
    super(`Resource ${resourceName} not found`);
    this.name = 'Not found';
    this.status = 404;
  }
}

module.exports = ResourceNotFoundError;

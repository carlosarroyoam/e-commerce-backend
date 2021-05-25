class NoResourcesInDatabaseError extends Error {
  constructor({ resourceName }) {
    super(`Resource ${resourceName} not found`);
    this.status = 404;
  }
}

module.exports = NoResourcesInDatabaseError;

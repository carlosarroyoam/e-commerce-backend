/**
 * Error thrown when a user cannot be authenticated.
 */
class ForbiddenError extends Error {
    /**
     * Constructor for ForbiddenError.
     *
     * @param {object} data
     */
    constructor({ message }) {
        super(message || "You don't have access to this resource");
        this.name = "Forbidden";
        this.status = 403;
    }
}

module.exports = ForbiddenError;

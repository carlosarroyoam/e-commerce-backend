/**
 * Error thrown when a user cannot be authenticated.
 */
class UnauthorizedError extends Error {
    /**
     * Constructor for UnauthorizedError.
     *
     * @param {object} data
     */
    constructor({ message, email }) {
        super(message || `Failed to authorize user with the email: ${email}`);
        this.name = 'Unauthorized';
        this.status = 401;
    }
}

module.exports = UnauthorizedError;

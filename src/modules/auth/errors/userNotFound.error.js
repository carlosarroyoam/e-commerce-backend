/**
 * Error thrown when a user is not found.
 */
class UserNotFoundError extends Error {
    /**
     * Constructor for UserNotFoundError.
     *
     * @param {object} data
     */
    constructor({ email }) {
        super(`User with the email: ${email} was not found`);
        this.name = 'Not found';
        this.status = 404;
    }
}

module.exports = UserNotFoundError;

/**
 * Error thrown when a user request has validation errors.
 */
class UnprocessableEntity extends Error {
    /**
     * Constructor for UnprocessableEntityError.
     *
     * @param {object} data
     */
    constructor({ message = 'The request data is not valid', errors }) {
        super(message);
        this.name = 'Unprocessable entity';
        this.status = 422;
        this.errors = errors;
    }
}

module.exports = UnprocessableEntity;

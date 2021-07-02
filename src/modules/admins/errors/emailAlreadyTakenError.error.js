/**
 * Error throw when someone tries to register with a
 * taken email address.
 */
class EmailAlreadyTakenError extends Error {
    /**
     * Constructor for EmailAlreadyTakenError.
     *
     * @param {object} data
     */
    constructor({ email }) {
        super(`The email address: ${email} is already in use`);
        this.name = "Email not available";
        this.status = 302;
    }
}

module.exports = EmailAlreadyTakenError;

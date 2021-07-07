/**
 * Auth controller class.
 */
class AuthController {
    /**
     * Constructor for AuthController.
     *
     * @param {*} dependencies The dependencies payload
     */
    constructor({ authService }) {
        this.authService = authService;
    }

    /**
     * Handles incoming request from the /auth/login endpoint
     *
     * @param {*} request
     * @param {*} response
     * @param {*} next
     */
    async login(request, response, next) {
        try {
            const { email, password } = request.body;

            const auth = await this.authService.login({ email, password });

            response.send({
                message: 'Ok',
                data: auth,
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Handles incoming request from the /auth/refresh_token endpoint
     *
     * @param {*} request
     * @param {*} response
     * @param {*} next
     */
    async refreshToken(request, response, next) {
        try {
            const { refresh_token } = request.body;

            const refreshToken = await this.authService.refreshToken({ refresh_token });

            response.send({
                message: 'Ok',
                data: refreshToken,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = AuthController;

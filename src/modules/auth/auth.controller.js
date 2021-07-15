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
            const { email, password, browser_fingerprint } = request.body;
            const user_agent = request.headers['user-agent'];

            const auth = await this.authService.login({
                email,
                password,
                browser_fingerprint,
                user_agent,
            });

            response.send({
                message: 'Ok',
                data: auth,
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Handles incoming request from the /auth/logout endpoint
     *
     * @param {*} request
     * @param {*} response
     * @param {*} next
     */
    async logout(request, response, next) {
        try {
            const { refresh_token, user_id } = request.body;

            await this.authService.logout({
                refresh_token,
                user_id,
            });

            response.status(204).send();
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
            const { refresh_token, browser_fingerprint } = request.body;

            const refreshToken = await this.authService.refreshToken({
                refresh_token,
                browser_fingerprint,
            });

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

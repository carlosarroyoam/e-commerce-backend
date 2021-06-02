/**
 * Admin controller
 */
class AuthController {
  constructor({ authService }) {
    this._authService = authService;
  }

  /**
   * Handles incoming request from the /admin endpoint
   *
   * @param {*} request
   * @param {*} response
   * @param {*} next
   */
  async login(request, response, next) {
    try {
      const { email, password } = request.body;

      const auth = await this._authService.login({ email, password });

      response.send({
        message: 'Ok',
        data: auth,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;

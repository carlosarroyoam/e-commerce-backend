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
      response.send({
        message: 'Ok',
        data: [],
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;

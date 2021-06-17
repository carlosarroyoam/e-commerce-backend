/**
 * User controller
 */
class UserController {
  constructor({ userService, userMapper }) {
    this._userService = userService;
    this._userMapper = userMapper;
  }

  /**
   * Handles incoming request from the /user endpoint
   *
   * @param {*} request
   * @param {*} response
   * @param {*} next
   */
  async index(request, response, next) {
    try {
      const users = await this._userService.findAll();

      const usersDto = users.map((user) => this._userMapper.toDto(user));

      response.send({
        message: 'Ok',
        data: usersDto,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles incoming request from the /user/:id endpoint
   *
   * @param {*} request
   * @param {*} response
   * @param {*} next
   */
  async show(request, response, next) {
    try {
      const { id } = request.params;

      const user = await this._userService.find(id);
      const userDto = this._userMapper.toDto(user);

      response.send({
        message: 'Ok',
        data: userDto,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles incoming request from the /user/:id endpoint
   *
   * @param {*} request
   * @param {*} response
   * @param {*} next
   */
  async destroy(request, response, next) {
    try {
      const { id } = request.params;

      const userDeletedId = await this._userService.delete(id);

      response.send({
        message: 'Deleted',
        data: {
          userDeletedId,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles incoming request from the /user/:id/restore endpoint
   *
   * @param {*} request
   * @param {*} response
   * @param {*} next
   */
  async restore(request, response, next) {
    try {
      const { id } = request.params;

      const userRestoredId = await this._userService.restore(id);

      response.send({
        message: 'Restored',
        data: {
          userRestoredId,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;

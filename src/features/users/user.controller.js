import userService from '#features/users/user.service.js';

/**
 * UserController class.
 */
class UserController {
  /**
   * Handles incoming request from the /user endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async index(request, response, next) {
    try {
      const { page, size, sort, status, search } = request.query;

      const result = await userService.findAll({
        page,
        size,
        sort,
        status,
        search,
      });

      response.status(200).json({
        items: result.items,
        pagination: result.pagination,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles incoming request from the /users/:user_id endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async show(request, response, next) {
    try {
      const { user_id } = request.params;

      const userById = await userService.findById(user_id);

      response.status(200).json({
        ...userById,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles incoming request from the /users/:user_id endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async destroy(request, response, next) {
    try {
      const { user_id } = request.params;
      const { id: auth_user_id } = request.user;

      await userService.deleteById(user_id, auth_user_id);

      response.status(204).end();
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles incoming request from the /users/:user_id/restore endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async restore(request, response, next) {
    try {
      const { user_id } = request.params;
      const { id: auth_user_id } = request.user;

      await userService.restore(user_id, auth_user_id);

      response.status(204).end();
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles incoming request from the /users/:user_id/change-password endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async changePassword(request, response, next) {
    try {
      const { user_id } = request.params;
      const { current_password, new_password } = request.body;
      const { id: auth_user_id } = request.user;

      await userService.changePassword(
        {
          user_id,
          current_password,
          new_password,
        },
        auth_user_id
      );

      response.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();

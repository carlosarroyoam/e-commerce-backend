/**
 * User controller
 */
class UserController {
  constructor({ userService }) {
    this._userService = userService;
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

      if (users.length < 1) {
        response.status(404).send({
          message: 'No users registered',
        });

        return;
      }

      response.send({
        message: 'Ok',
        data: users,
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

      if (user.length < 1) {
        response.status(404).send({
          message: 'User was not found',
        });

        return;
      }

      response.send({
        message: 'Ok',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles incoming request from the /user endpoint
   *
   * @param {*} request
   * @param {*} response
   * @param {*} next
   */
  async store(request, response, next) {
    try {
      const user = request.body;

      const createdUser = await this._userService.store(user);

      response.status(201).send({
        message: 'Created',
        data: {
          createdUser,
        },
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
  async update(request, response, next) {
    try {
      const userId = request.params.id;
      const user = request.body;

      const updatedUser = await this._userService.update(userId, user);

      response.send({
        message: 'Updated',
        data: {
          updatedUser,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;

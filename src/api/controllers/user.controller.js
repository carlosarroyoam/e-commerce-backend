class UserController {
  constructor({ userService }) {
    this._userService = userService;
  }

  async index(request, response, next) {
    try {
      const users = await this._userService.findAll();

      if (users.length < 1) {
        response.status(404).send({
          message: 'No users registered',
        });
      }

      response.send({
        message: 'Ok',
        data: users,
      });
    } catch (error) {
      next(error);
    }
  }

  async show(request, response, next) {
    try {
      const { id } = request.params;

      const user = await this._userService.find(id);

      if (user.length < 1) {
        response.status(404).send({
          message: 'User was not found',
        });
      }

      response.send({
        message: 'Ok',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  // TODO change for corresponding method
  async store(request, response, next) {
    try {
      const user = await this._userService.findAll();

      response.send({
        message: 'Created',
        data: {
          user,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;

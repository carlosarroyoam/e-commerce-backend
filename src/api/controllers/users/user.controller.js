class UserController {
  constructor({ userService }) {
    this._userService = userService;
  }

  async index(request, response, next) {
    const users = await this._userService.findAll();

    if (users instanceof Error) {
      return next(new Error('Error occurred while retrieving users'));
    }

    return response.send({
      status: 200,
      message: 'Ok',
      data: users,
    });
  }

  async show(request, response, next) {
    const { id } = request.params;

    const user = await this._userService.find(id);

    if (user instanceof Error) {
      return next(new Error(`Error occurred while retrieving user with id: ${id}`));
    }

    if (user.length < 1) {
      return response.status(404).send({
        status: 404,
        message: 'User was not found',
      });
    }

    return response.send({
      status: 200,
      message: 'Ok',
      data: user,
    });
  }

  // TODO change for corresponding method
  async store(request, response, next) {
    const user = await this._userService.findAll();

    if (user instanceof Error) {
      return next(new Error('Error occurred while storing user'));
    }

    return response.send({
      status: 201,
      message: 'Created',
      data: {
        user,
      },
    });
  }
}

module.exports = UserController;

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

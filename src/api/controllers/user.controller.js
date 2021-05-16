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
      console.error(error.message);

      if (error.sqlMessage) {
        next(new Error('Error while retrieving users'));
        return;
      }

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
      console.error(error.message);

      if (error.sqlMessage) {
        next(new Error('Error while retrieving user'));
        return;
      }

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
      const { first_name, last_name, email } = request.body;

      const createdUser = await this._userService.store({ first_name, last_name, email });
      const createdUserDto = this._userMapper.toDto(createdUser);

      response.status(201).send({
        message: 'Created',
        data: {
          createdUserDto,
        },
      });
    } catch (error) {
      console.error(error.message);

      if (error.sqlMessage) {
        next(new Error('Error while storing user'));
        return;
      }

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
      const { id } = request.params;
      const user = request.body;

      const updatedUser = await this._userService.update(id, user);
      const updatedUserDto = this._userMapper.toDto(updatedUser);

      response.send({
        message: 'Updated',
        data: {
          updatedUserDto,
        },
      });
    } catch (error) {
      console.error(error.message);

      if (error.sqlMessage) {
        next(new Error('Error while updating user'));
        return;
      }

      next(error);
    }
  }
}

module.exports = UserController;

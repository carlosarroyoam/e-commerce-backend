const userService = require('./user.service');
const userMapper = require('./user.mapper');

/**
 * Handles incoming request from the /user endpoint
 *
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const index = async (request, response, next) => {
  try {
    const { skip, limit, sort, status, search } = request.query;

    const users = await userService.findAll({ skip, limit, sort, status, search });

    const usersDto = users.map((user) => userMapper.toDto(user));

    response.send({
      message: 'Ok',
      data: usersDto,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Handles incoming request from the /users/:id endpoint
 *
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const show = async (request, response, next) => {
  try {
    const { user_id } = request.params;

    const user = await userService.find(user_id);

    const userDto = userMapper.toDto(user);

    response.send({
      message: 'Ok',
      data: userDto,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Handles incoming request from the /users/:user_id endpoint
 *
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const destroy = async (request, response, next) => {
  try {
    const { user_id } = request.params;
    const { id: auth_user_id } = request.user;

    const userDeletedId = await userService.remove(user_id, auth_user_id);

    response.send({
      message: 'The user was successfully deleted',
      data: {
        user_deleted_id: userDeletedId,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Handles incoming request from the /users/:user_id/restore endpoint
 *
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const restore = async (request, response, next) => {
  try {
    const { user_id } = request.params;
    const { id: auth_user_id } = request.user;

    const userRestoredId = await userService.restore(user_id, auth_user_id);

    response.send({
      message: 'The user was successfully restored',
      data: {
        user_restored_id: userRestoredId,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Handles incoming request from the /users/:user_id/change-password endpoint
 *
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const changePassword = async (request, response, next) => {
  try {
    const { user_id } = request.params;
    const { current_password, new_password } = request.body;
    const { id: auth_user_id } = request.user;

    await userService.changePassword({
      user_id,
      auth_user_id,
      current_password,
      new_password,
    });

    response.send({
      message: 'Ok',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  index,
  show,
  destroy,
  restore,
  changePassword,
};

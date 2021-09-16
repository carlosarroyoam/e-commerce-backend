const adminService = require('./admin.service');
const adminMapper = require('./admin.mapper');

/**
 * Handles incoming request from the /admins endpoint
 *
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const index = async (request, response, next) => {
  try {
    const { sort, status, search } = request.query;

    const admins = await adminService.findAll({ sort, status, search });

    const adminsDto = admins.map((admin) => adminMapper.toDto(admin));

    response.send({
      message: 'Ok',
      data: adminsDto,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Handles incoming request from the /admins/:id endpoint
 *
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const show = async (request, response, next) => {
  try {
    const { admin_id } = request.params;

    const admin = await adminService.find(Number(admin_id));
    const adminDto = adminMapper.toDto(admin);

    response.send({
      message: 'Ok',
      data: adminDto,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Handles incoming request from the /admins endpoint
 *
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const store = async (request, response, next) => {
  try {
    const { first_name, last_name, email, password, is_super } = request.body;

    const createdAdmin = await adminService.store({
      first_name,
      last_name,
      email,
      password,
      is_super,
    });

    const createdAdminDto = adminMapper.toDto(createdAdmin);

    response.status(201).send({
      message: 'Created',
      data: createdAdminDto,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Handles incoming request from the /admins/:id endpoint
 *
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const update = async (request, response, next) => {
  try {
    const { admin_id } = request.params;
    const { first_name, last_name } = request.body;

    const updatedAdmin = await adminService.update(admin_id, {
      first_name,
      last_name,
    });

    const updatedAdminDto = adminMapper.toDto(updatedAdmin);

    response.send({
      message: 'Updated',
      data: updatedAdminDto,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  index,
  show,
  store,
  update,
};

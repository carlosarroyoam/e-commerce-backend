const adminService = require('./admin.service');
const adminMapper = require('./admin.mapper');

/**
 * Handles incoming request from the /admins endpoint.
 *
 * @param {*} request The express.js request object.
 * @param {*} response The express.js response object.
 * @param {*} next The express.js next object.
 */
const index = async (request, response, next) => {
  try {
    const { skip, limit, sort, status, search } = request.query;

    const admins = await adminService.findAll({ skip, limit, sort, status, search });

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
 * Handles incoming request from the /admins/:id endpoint.
 *
 * @param {*} request The express.js request object.
 * @param {*} response The express.js response object.
 * @param {*} next The express.js next object.
 */
const show = async (request, response, next) => {
  try {
    const { admin_id } = request.params;

    const admin = await adminService.findById(admin_id);
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
 * Handles incoming request from the /admins endpoint.
 *
 * @param {*} request The express.js request object.
 * @param {*} response The express.js response object.
 * @param {*} next The express.js next object.
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
 * Handles incoming request from the /admins/:id endpoint.
 *
 * @param {*} request The express.js request object.
 * @param {*} response The express.js response object.
 * @param {*} next The express.js next object.
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

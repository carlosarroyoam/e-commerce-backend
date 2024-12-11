import adminService from '#modules/admins/admin.service.js';
import adminMapper from '#modules/admins/admin.mapper.js';

/**
 * AdminController class.
 */
class AdminController {
  /**
   * Handles incoming request from the /admins endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async index(request, response, next) {
    try {
      const { page, size, sort, status, search } = request.query;

      const result = await adminService.findAll({
        page,
        size,
        sort,
        status,
        search,
      });

      response.json({
        message: 'Ok',
        admins: result.admins.map((admin) => adminMapper.toDto(admin)),
        pagination: result.pagination,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles incoming request from the /admins/:id endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async show(request, response, next) {
    try {
      const { admin_id } = request.params;

      const admin = await adminService.findById({ admin_id });

      response.json({
        message: 'Ok',
        admin: adminMapper.toDto(admin),
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles incoming request from the /admins endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async store(request, response, next) {
    try {
      const { first_name, last_name, email, password, is_super } = request.body;

      const createdAdmin = await adminService.store({
        first_name,
        last_name,
        email,
        password,
        is_super,
      });

      response.status(201).json({
        message: 'Ok',
        admin: adminMapper.toDto(createdAdmin),
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles incoming request from the /admins/:id endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async update(request, response, next) {
    try {
      const { admin_id } = request.params;
      const { first_name, last_name } = request.body;

      const updatedAdmin = await adminService.update(admin_id, {
        first_name,
        last_name,
      });

      response.json({
        message: 'Ok',
        admin: adminMapper.toDto(updatedAdmin),
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AdminController();

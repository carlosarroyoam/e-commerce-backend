import adminService from '#features/admins/admin.service.js';

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

      response.status(200).json(result);
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

      const adminById = await adminService.findById({ admin_id });

      response.status(200).json(adminById);
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

      response.status(201).set('Location', `/admins/${createdAdmin.id}`).end();
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

      await adminService.update(admin_id, {
        first_name,
        last_name,
      });

      response.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

export default new AdminController();

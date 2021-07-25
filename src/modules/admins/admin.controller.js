/**
 * Admin controller class.
 */
class AdminController {
  /**
   * Constructor for AdminController.
   *
   * @param {*} dependencies The dependencies payload
   */
  constructor({ adminService, adminMapper }) {
    this.adminService = adminService;
    this.adminMapper = adminMapper;
  }

  /**
   * Handles incoming request from the /admins endpoint
   *
   * @param {*} request
   * @param {*} response
   * @param {*} next
   */
  async index(request, response, next) {
    try {
      const { sort, status, search } = request.query;

      const admins = await this.adminService.findAll({ sort, status, search });

      const adminsDto = admins.map((admin) => this.adminMapper.toDto(admin));

      response.send({
        message: 'Ok',
        data: adminsDto,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles incoming request from the /admins/:id endpoint
   *
   * @param {*} request
   * @param {*} response
   * @param {*} next
   */
  async show(request, response, next) {
    try {
      const { admin_id } = request.params;

      const admin = await this.adminService.find(Number(admin_id));
      const adminDto = this.adminMapper.toDto(admin);

      response.send({
        message: 'Ok',
        data: adminDto,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles incoming request from the /admins endpoint
   *
   * @param {*} request
   * @param {*} response
   * @param {*} next
   */
  async store(request, response, next) {
    try {
      const { first_name, last_name, email, password, is_super } = request.body;

      const createdAdmin = await this.adminService.store({
        first_name,
        last_name,
        email,
        password,
        is_super,
      });

      const createdAdminDto = this.adminMapper.toDto(createdAdmin);

      response.status(201).send({
        message: 'Created',
        data: createdAdminDto,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles incoming request from the /admins/:id endpoint
   *
   * @param {*} request
   * @param {*} response
   * @param {*} next
   */
  async update(request, response, next) {
    try {
      const { admin_id } = request.params;
      const { first_name, last_name } = request.body;

      const updatedAdmin = await this.adminService.update(admin_id, {
        first_name,
        last_name,
      });

      const updatedAdminDto = this.adminMapper.toDto(updatedAdmin);

      response.send({
        message: 'Updated',
        data: updatedAdminDto,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AdminController;

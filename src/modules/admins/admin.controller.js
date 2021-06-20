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
    this._adminService = adminService;
    this._adminMapper = adminMapper;
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
      const admins = await this._adminService.findAll();

      const adminsDto = admins.map((admin) => this._adminMapper.toDto(admin));

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
      const { id } = request.params;

      const admin = await this._adminService.find(id);
      const adminDto = this._adminMapper.toDto(admin);

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
      const {
        firstName, lastName, email, password, isSuper,
      } = request.body;

      const createdAdmin = await this._adminService.store({
        firstName, lastName, email, password, isSuper,
      });
      const createdAdminDto = this._adminMapper.toDto(createdAdmin);

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
      const { id } = request.params;
      const {
        firstName, lastName, email, password, isSuper,
      } = request.body;

      const updatedAdmin = await this._adminService.update(id, {
        firstName, lastName, email, password, isSuper,
      });
      const updatedAdminDto = this._adminMapper.toDto(updatedAdmin);

      response.send({
        message: 'Updated',
        data: updatedAdminDto,
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
  async destroy(request, response, next) {
    try {
      const { id } = request.params;

      const adminDeletedId = await this._adminService.delete(id);

      response.send({
        message: 'Deleted',
        data: {
          adminDeletedId,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles incoming request from the /admins/:id/restore endpoint
   *
   * @param {*} request
   * @param {*} response
   * @param {*} next
   */
  async restore(request, response, next) {
    try {
      const { id } = request.params;

      const adminRestoredId = await this._adminService.restore(id);

      response.send({
        message: 'Restored',
        data: {
          adminRestoredId,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AdminController;

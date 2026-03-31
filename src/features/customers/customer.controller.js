import customerService from '#features/customers/customer.service.js';

/**
 * CustomerController class.
 */
class CustomerController {
  /**
   * Handles incoming request from the /customers endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async index(request, response, next) {
    try {
      const { page, size, sort, status, search } = request.query;

      const result = await customerService.findAll({
        page,
        size,
        sort,
        status,
        search,
      });

      response.json({
        items: result.items,
        pagination: result.pagination,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles incoming request from the /customers/:customer_id endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async show(request, response, next) {
    try {
      const { customer_id } = request.params;

      const customerById = await customerService.findById(customer_id);

      response.json({ ...customerById });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles incoming request from the /customers endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async store(request, response, next) {
    try {
      const { first_name, last_name, email, password } = request.body;

      const createdCustomer = await customerService.store({
        first_name,
        last_name,
        email,
        password,
      });

      response.status(201).set('Location', `/customers/${createdCustomer.id}`).end();
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles incoming request from the /customers/:customer_id endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async update(request, response, next) {
    try {
      const { customer_id } = request.params;
      const { first_name, last_name } = request.body;

      await customerService.update(customer_id, {
        first_name,
        last_name,
      });

      response.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

export default new CustomerController();

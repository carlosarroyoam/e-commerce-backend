import customerService from '#features/customers/customer.service.js';
import customerMapper from '#features/customers/customer.mapper.js';

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
        message: 'Ok',
        customers: result.customers.map((customer) => customerMapper.toDto(customer)),
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

      const customer = await customerService.findById(customer_id);

      response.json({
        message: 'Ok',
        customer: customerMapper.toDto(customer),
      });
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

      response.status(201).json({
        message: 'Ok',
        customer: customerMapper.toDto(createdCustomer),
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
  async update(request, response, next) {
    try {
      const { customer_id } = request.params;
      const { first_name, last_name } = request.body;

      const updatedCustomer = await customerService.update(customer_id, {
        first_name,
        last_name,
      });

      response.json({
        message: 'Ok',
        customer: customerMapper.toDto(updatedCustomer),
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new CustomerController();

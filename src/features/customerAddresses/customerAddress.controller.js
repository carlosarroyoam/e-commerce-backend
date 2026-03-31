import customerAddressService from '#features/customerAddresses/customerAddress.service.js';

/**
 * CustomerController class.
 */
class CustomerAddressController {
  /**
   * Handles incoming request from the /customers/:customer_id/addresses endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async index(request, response, next) {
    try {
      const { customer_id } = request.params;

      const customerAddresses = await customerAddressService.findAll(customer_id);

      response.json({
        items: customerAddresses,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles incoming request from the /customers/:customer_id/addresses/:address_id endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async show(request, response, next) {
    try {
      const { customer_id, address_id } = request.params;

      const customerAddress = await customerAddressService.findById(customer_id, address_id);

      response.json({ ...customerAddress });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles incoming request from the /customers/:customer_id/addresses endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async store(request, response, next) {
    try {
      const { customer_id } = request.params;
      const {
        street_name,
        street_number,
        apartament_number,
        sublocality,
        locality,
        state,
        postal_code,
        phone_number,
      } = request.body;

      const createdAddress = await customerAddressService.store(
        {
          street_name,
          street_number,
          apartament_number,
          sublocality,
          locality,
          state,
          postal_code,
          phone_number,
        },
        customer_id
      );

      response.status(201).set('Location', `/customer-addresses/${createdAddress.id}`).end();
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles incoming request from the /customers/:customer_id/addresses/:address_id endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async update(request, response, next) {
    try {
      const { customer_id, address_id } = request.params;
      const {
        street_name,
        street_number,
        apartament_number,
        sublocality,
        locality,
        state,
        postal_code,
      } = request.body;

      await customerAddressService.update(
        {
          street_name,
          street_number,
          apartament_number,
          sublocality,
          locality,
          state,
          postal_code,
        },
        customer_id,
        address_id
      );

      response.status(204).end();
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles incoming request from the /users/:user_id endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async destroy(request, response, next) {
    try {
      const { customer_id, address_id } = request.params;

      await customerAddressService.deleteById(customer_id, address_id);

      response.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

export default new CustomerAddressController();

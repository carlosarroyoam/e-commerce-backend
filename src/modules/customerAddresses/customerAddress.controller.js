import customerAddressService from '#modules/customerAddresses/customerAddress.service.js';
import customerAddressMapper from '#modules/customerAddresses/customerAddress.mapper.js';

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

      const customerAddressesDto = customerAddresses.map((address) =>
        customerAddressMapper.toDto(address)
      );

      response.json({
        message: 'Ok',
        addresses: customerAddressesDto,
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
      const customerAddressDto = customerAddressMapper.toDto(customerAddress);

      response.json({
        message: 'Ok',
        address: customerAddressDto,
      });
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

      const createdAddressDto = customerAddressMapper.toDto(createdAddress);

      response.status(201).json({
        message: 'Ok',
        address: createdAddressDto,
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

      const updatedAddress = await customerAddressService.update(
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

      const updatedAddressDto = customerAddressMapper.toDto(updatedAddress);

      response.json({
        message: 'Ok',
        address: updatedAddressDto,
      });
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

      const addressDeletedId = await customerAddressService.deleteById(customer_id, address_id);

      response.json({
        message: 'The address was successfully deleted',
        address: {
          id: addressDeletedId,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new CustomerAddressController();

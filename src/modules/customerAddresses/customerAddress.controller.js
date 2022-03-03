const customerAddressService = require('./customerAddress.service');
const customerAddressMapper = require('./customerAddress.mapper');

/**
 * Handles incoming request from the /customers/:customer_id/addresses endpoint.
 *
 * @param {*} request The express.js request object.
 * @param {*} response The express.js response object.
 * @param {*} next The express.js next object.
 */
const index = async (request, response, next) => {
  try {
    const { customer_id } = request.params;

    const customerAddresses = await customerAddressService.findAll(customer_id);

    const customerAddressesDto = customerAddresses.map((address) =>
      customerAddressMapper.toDto(address)
    );

    response.json({
      message: 'Ok',
      data: customerAddressesDto,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Handles incoming request from the /customers/:customer_id/addresses/:address_id endpoint.
 *
 * @param {*} request The express.js request object.
 * @param {*} response The express.js response object.
 * @param {*} next The express.js next object.
 */
const show = async (request, response, next) => {
  try {
    const { customer_id, address_id } = request.params;

    const customerAddress = await customerAddressService.findById(customer_id, address_id);
    const customerAddressDto = customerAddressMapper.toDto(customerAddress);

    response.json({
      message: 'Ok',
      data: customerAddressDto,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Handles incoming request from the /customers/:customer_id/addresses endpoint.
 *
 * @param {*} request The express.js request object.
 * @param {*} response The express.js response object.
 * @param {*} next The express.js next object.
 */
const store = async (request, response, next) => {
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
      data: createdAddressDto,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Handles incoming request from the /customers/:customer_id/addresses/:address_id endpoint.
 *
 * @param {*} request The express.js request object.
 * @param {*} response The express.js response object.
 * @param {*} next The express.js next object.
 */
const update = async (request, response, next) => {
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
      data: updatedAddressDto,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Handles incoming request from the /users/:user_id endpoint.
 *
 * @param {*} request The express.js request object.
 * @param {*} response The express.js response object.
 * @param {*} next The express.js next object.
 */
const destroy = async (request, response, next) => {
  try {
    const { customer_id, address_id } = request.params;

    const addressDeletedId = await customerAddressService.deleteById(customer_id, address_id);

    response.json({
      message: 'The address was successfully deleted',
      data: {
        user_deleted_id: addressDeletedId,
      },
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
  destroy,
};

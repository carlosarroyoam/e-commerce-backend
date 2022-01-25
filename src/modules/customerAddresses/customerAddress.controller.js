const customerAddressService = require('./customerAddress.service');
const customerAddressMapper = require('./customerAddress.mapper');

/**
 * Handles incoming request from the /customers/:id/addresses endpoint.
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

    response.send({
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

    response.send({
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
    const { customer_id } = request.body;
    const { first_name, last_name, email, password, is_super } = request.body;

    const createdAdmin = await customerAddressService.store(
      {
        first_name,
        last_name,
        email,
        password,
        is_super,
      },
      customer_id
    );

    const createdAdminDto = customerAddressMapper.toDto(createdAdmin);

    response.status(201).send({
      message: 'Created',
      data: createdAdminDto,
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
    const { customer_id, customer_address_id } = request.params;
    const { first_name, last_name } = request.body;

    const updatedAdmin = await customerAddressService.update(
      {
        first_name,
        last_name,
      },
      customer_id,
      customer_address_id
    );

    const updatedAdminDto = customerAddressMapper.toDto(updatedAdmin);

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

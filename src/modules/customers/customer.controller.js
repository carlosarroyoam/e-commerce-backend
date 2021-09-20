const customerService = require('./customer.service');
const customerMapper = require('./customer.mapper');

/**
 * Handles incoming request from the /customers endpoint
 *
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const index = async (request, response, next) => {
  try {
    const { skip, limit, sort, status, search } = request.query;

    const customers = await customerService.findAll({ skip, limit, sort, status, search });

    const customersDto = customers.map((customer) => customerMapper.toDto(customer));

    response.send({
      message: 'Ok',
      data: customersDto,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Handles incoming request from the /customers/:id endpoint
 *
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const show = async (request, response, next) => {
  try {
    const { customer_id } = request.params;

    const customer = await customerService.find(Number(customer_id));
    const customerDto = customerMapper.toDto(customer);

    response.send({
      message: 'Ok',
      data: customerDto,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Handles incoming request from the /customers endpoint
 *
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const store = async (request, response, next) => {
  try {
    const { first_name, last_name, email, password } = request.body;

    const createdCustomer = await customerService.store({
      first_name,
      last_name,
      email,
      password,
    });

    const createdCustomerDto = customerMapper.toDto(createdCustomer);

    response.status(201).send({
      message: 'Created',
      data: createdCustomerDto,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Handles incoming request from the /customers/:id endpoint
 *
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const update = async (request, response, next) => {
  try {
    const { customer_id } = request.params;
    const { first_name, last_name } = request.body;

    const updatedCustomer = await customerService.update(customer_id, {
      first_name,
      last_name,
    });

    const updatedCustomerDto = customerMapper.toDto(updatedCustomer);

    response.send({
      message: 'Updated',
      data: updatedCustomerDto,
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

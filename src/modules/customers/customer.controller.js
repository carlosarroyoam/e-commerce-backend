const customerService = require('./customer.service');
const customerMapper = require('./customer.mapper');

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
			const { skip, limit, sort, status, search } = request.query;

			const customers = await customerService.findAll({
				skip,
				limit,
				sort,
				status,
				search,
			});

			const customersDto = customers.map((customer) => customerMapper.toDto(customer));

			response.json({
				message: 'Ok',
				data: customersDto,
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
			const customerDto = customerMapper.toDto(customer);

			response.json({
				message: 'Ok',
				data: customerDto,
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

			const createdCustomerDto = customerMapper.toDto(createdCustomer);

			response.status(201).json({
				message: 'Ok',
				data: createdCustomerDto,
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

			const updatedCustomerDto = customerMapper.toDto(updatedCustomer);

			response.json({
				message: 'Ok',
				data: updatedCustomerDto,
			});
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new CustomerController();

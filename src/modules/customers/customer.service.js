import CustomerRepository from '#modules/customers/customer.repository.js';
import CustomerAddressRepository from '#modules/customerAddresses/customerAddress.repository.js';
import UserRepository from '#modules/users/user.repository.js';
import userRoles from '#modules/auth/roles.js';
import sharedErrors from '#common/errors/index.js';
import bcrypt from '#common/lib/bcrypt/index.js';
import dbConnectionPool from '#common/lib/mysql/connectionPool.js';
import logger from '#common/lib/winston/logger.js';

/**
 * CustomerService class.
 */
class CustomerService {
	/**
	 * Retrieves all customer users.
	 *
	 * @param {object} queryOptions The query options.
	 * @param {number} queryOptions.skip The query skip.
	 * @param {number} queryOptions.limit The query limit.
	 * @param {string} queryOptions.sort The order for the results.
	 * @param {string} queryOptions.status The user status to query.
	 * @param {string} queryOptions.search The search criteria.
	 * @return {Promise} The list of customers.
	 */
	async findAll({ skip, limit, sort, status, search }) {
		let connection;

		try {
			connection = await dbConnectionPool.getConnection();
			const customerRepository = new CustomerRepository(connection);
			const customerAddressRepository = new CustomerAddressRepository(connection);

			const rawCustomers = await customerRepository.findAll({
				skip,
				limit,
				sort,
				status,
				search,
			});

			const customers = await Promise.all(
				rawCustomers.map(async (customer) => {
					const addressesByCustomerId = await customerAddressRepository.findByCustomerId(
						customer.id
					);

					return {
						...customer,
						addresses: addressesByCustomerId,
					};
				})
			);

			connection.release();

			return customers;
		} catch (err) {
			if (connection) connection.release();

			if (!err.status) {
				logger.error({
					message: err.message,
				});

				throw new sharedErrors.InternalServerError('Error while retrieving customers');
			}

			throw err;
		}
	}

	/**
	 * Retrieves a customer user by its id.
	 *
	 * @param {number} customer_id The id of the customer user to retrieve.
	 * @return {Promise} The customer user.
	 */
	async findById(customer_id) {
		let connection;

		try {
			connection = await dbConnectionPool.getConnection();
			const customerRepository = new CustomerRepository(connection);
			const customerAddressRepository = new CustomerAddressRepository(connection);

			const customerById = await customerRepository.findById(customer_id);

			if (!customerById) {
				throw new sharedErrors.UserNotFoundError({ email: undefined });
			}

			const addressesByCustomerId = await customerAddressRepository.findByCustomerId(customer_id);

			connection.release();

			return {
				...customerById,
				addresses: addressesByCustomerId,
			};
		} catch (err) {
			if (connection) connection.release();

			if (!err.status) {
				logger.error({
					message: err.message,
				});

				throw new sharedErrors.InternalServerError('Error while retrieving customer');
			}

			throw err;
		}
	}

	/**
	 * Stores a customer user.
	 *
	 * @param {object} customer The customer user to store.
	 * @return {Promise} The created customer user.
	 */
	async store(customer) {
		let connection;

		try {
			connection = await dbConnectionPool.getConnection();
			const userRepository = new UserRepository(connection);
			const customerRepository = new CustomerRepository(connection);

			connection.beginTransaction();

			const customerByEmail = await userRepository.findByEmail(customer.email);

			if (customerByEmail) {
				throw new sharedErrors.EmailAlreadyTakenError({
					email: customer.email,
				});
			}

			const passwordHash = await bcrypt.hashPassword(customer.password);

			const createdUserId = await userRepository.store({
				...customer,
				password: passwordHash,
				user_role_id: userRoles.customer.id,
			});

			const createdCustomerId = await customerRepository.store({
				user_id: createdUserId,
			});

			const createdCustomer = await customerRepository.findById(createdCustomerId);

			connection.commit();

			connection.release();

			return createdCustomer;
		} catch (err) {
			if (connection) {
				connection.rollback();
				connection.release();
			}

			if (!err.status) {
				logger.error({
					message: err.message,
				});

				throw new sharedErrors.InternalServerError('Error while storing customer');
			}

			throw err;
		}
	}

	/**
	 * Updates a customer user by its id.
	 *
	 * @param {number} customer_id The id of the customer user to update.
	 * @param {object} customer The customer user to store.
	 * @return {Promise} The updated customer user.
	 */
	async update(customer_id, customer) {
		let connection;

		try {
			connection = await dbConnectionPool.getConnection();
			const userRepository = new UserRepository(connection);
			const customerRepository = new CustomerRepository(connection);

			connection.beginTransaction();

			const customerById = await customerRepository.findById(customer_id);

			if (!customerById) {
				throw new sharedErrors.UserNotFoundError({ email: undefined });
			}

			if (customerById.deleted_at !== null) {
				throw new sharedErrors.BadRequestError('The user account is disabled');
			}

			await userRepository.update(
				{
					...customer,
				},
				customerById.user_id
			);

			const updatedCustomer = await customerRepository.findById(customer_id);

			connection.commit();

			connection.release();

			return updatedCustomer;
		} catch (err) {
			if (connection) {
				connection.rollback();
				connection.release();
			}

			if (!err.status) {
				logger.error({
					message: err.message,
				});

				throw new sharedErrors.InternalServerError('Error while updating customer');
			}

			throw err;
		}
	}
}

export default new CustomerService();

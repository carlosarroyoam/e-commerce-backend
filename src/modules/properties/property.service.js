import PropertyRepository from './property.repository.js';
import sharedErrors from '../../common/errors/index.js';
import dbConnectionPool from '../../common/lib/mysql/connectionPool.js';
import logger from '../../common/lib/winston/logger.js';

/**
 * PropertyService class.
 */
class PropertyService {
	/**
	 * Retrieves all product properties.
	 *
	 * @return {Promise} The list of products.
	 */
	async findAll() {
		let connection;

		try {
			connection = await dbConnectionPool.getConnection();
			const propertyRepository = new PropertyRepository(connection);

			const properties = await propertyRepository.findAll();

			connection.release();

			return properties;
		} catch (err) {
			if (connection) connection.release();

			if (!err.status) {
				logger.error({
					message: err.message,
				});

				throw new sharedErrors.InternalServerError('Error while retrieving properties');
			}

			throw err;
		}
	}

	/**
	 * Retrieves an property by its id.
	 *
	 * @param {number} property_id The id of the property to retrieve.
	 * @return {Promise} The variant.
	 */
	async findById(property_id) {
		let connection;

		try {
			connection = await dbConnectionPool.getConnection();
			const propertyRepository = new PropertyRepository(connection);

			const propertyById = await propertyRepository.findById(property_id);

			if (!propertyById) {
				throw new sharedErrors.ResourceNotFoundError();
			}

			connection.release();

			return propertyById;
		} catch (err) {
			if (connection) connection.release();

			if (!err.status) {
				logger.error({
					message: err.message,
				});

				throw new sharedErrors.InternalServerError('Error while retrieving property');
			}

			throw err;
		}
	}

	/**
	 * Stores an property.
	 *
	 * @param {object} property The property to store.
	 * @return {Promise} The created property.
	 */
	async store(property) {
		let connection;

		try {
			connection = await dbConnectionPool.getConnection();
			const propertyRepository = new PropertyRepository(connection);

			const propertyByTitle = await propertyRepository.findByTitle(property.title);

			if (propertyByTitle) {
				throw new sharedErrors.UnprocessableEntityError({
					message: 'The request data is not valid',
					errors: {
						title: `The property: '${property.title}' already exists`,
					},
				});
			}

			const createdPropertyId = await propertyRepository.store({
				title: property.title,
			});

			const createdProperty = await propertyRepository.findById(createdPropertyId);

			connection.release();

			return createdProperty;
		} catch (err) {
			if (connection) connection.release();

			if (!err.status) {
				logger.error({
					message: err.message,
				});

				throw new sharedErrors.InternalServerError('Error while storing property');
			}

			throw err;
		}
	}

	/**
	 * Updates an property.
	 *
	 * @param {number} property_id The id of the property to delete.
	 * @param {object} property The property to update.
	 * @return {Promise} The created property.
	 */
	async update(property_id, property) {
		let connection;

		try {
			connection = await dbConnectionPool.getConnection();
			const propertyRepository = new PropertyRepository(connection);

			const propertyByTitle = await propertyRepository.findById(property_id);

			if (!propertyByTitle) {
				throw new sharedErrors.ResourceNotFoundError();
			}

			await propertyRepository.update({ title: property.title }, property_id);

			const updatedProperty = await propertyRepository.findById(property_id);

			connection.release();

			return updatedProperty;
		} catch (err) {
			if (connection) connection.release();

			if (!err.status) {
				logger.error({
					message: err.message,
				});

				throw new sharedErrors.InternalServerError('Error while updating property');
			}

			throw err;
		}
	}

	/**
	 * Deletes an property by its id.
	 *
	 * @param {number} property_id The id of the property to delete.
	 * @return {Promise} The id of the deleted property.
	 */
	async deleteById(property_id) {
		let connection;

		try {
			connection = await dbConnectionPool.getConnection();
			const propertyRepository = new PropertyRepository(connection);

			const propertyById = await propertyRepository.findById(property_id);

			if (!propertyById) {
				throw new sharedErrors.ResourceNotFoundError();
			}

			if (propertyById.deleted_at !== null) {
				throw new sharedErrors.BadRequestError('The property is already inactive');
			}

			await propertyRepository.deleteById(property_id);

			connection.release();

			return property_id;
		} catch (err) {
			if (connection) connection.release();

			if (!err.status) {
				logger.error({
					message: err.message,
				});

				throw new sharedErrors.InternalServerError('Error while deleting property');
			}

			throw err;
		}
	}

	/**
	 * Restores a property by its id.
	 *
	 * @param {number} property_id The id of the property to restore.
	 * @return {Promise} The id of the restored property.
	 */
	async restore(property_id) {
		let connection;

		try {
			connection = await dbConnectionPool.getConnection();
			const propertyRepository = new PropertyRepository(connection);

			const propertyById = await propertyRepository.findById(property_id);

			if (!propertyById) {
				throw new sharedErrors.ResourceNotFoundError();
			}

			if (propertyById.deleted_at === null) {
				throw new sharedErrors.BadRequestError('The property is already active');
			}

			await propertyRepository.restore(property_id);

			connection.release();

			return property_id;
		} catch (err) {
			if (connection) connection.release();

			if (!err.status) {
				logger.error({
					message: err.message,
				});

				throw new sharedErrors.InternalServerError('Error while restoring property');
			}

			throw err;
		}
	}
}

export default new PropertyService();

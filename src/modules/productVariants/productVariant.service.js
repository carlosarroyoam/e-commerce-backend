const ProductRepository = require('../products/product.repository');
const ProductVariantRepository = require('./productVariant.repository');

const sharedErrors = require('../../common/errors');
const dbConnectionPool = require('../../common/lib/mysql/connectionPool');
const logger = require('../../common/lib/winston/logger');

/**
 * Retrieves all product variants.
 *
 * @param {number} product_id The query options.
 * @return {Promise} The list of products.
 */
const findAll = async (product_id) => {
	let connection;

	try {
		connection = await dbConnectionPool.getConnection();
		const productRepository = new ProductRepository(connection);
		const productVariantRepository = new ProductVariantRepository(connection);

		const productById = await productRepository.findById(product_id);

		if (!productById) {
			throw new sharedErrors.ResourceNotFoundError();
		}

		const rawProductVariants = await productVariantRepository.findByProductId(product_id);

		const productVariants = await Promise.all(
			rawProductVariants.map(async (variant) => {
				const attributesByVariantId = await productVariantRepository.findAttributesByVariantId(
					variant.id
				);

				const imagesByVariantId = await productVariantRepository.findImagesByVariantId(variant.id);

				return {
					...variant,
					attribute_combinations: attributesByVariantId,
					images: imagesByVariantId,
				};
			})
		);

		connection.release();

		return productVariants;
	} catch (err) {
		if (connection) connection.release();

		if (!err.status) {
			logger.error({
				message: err.message,
			});

			throw new sharedErrors.InternalServerError('Error while retrieving product variants');
		}

		throw err;
	}
};

/**
 * Retrieves a product variant by its id.
 *
 * @param {number} product_id The id of the product.
 * @param {number} variant_id The id of the variant to retrieve.
 * @return {Promise} The variant.
 */
const findById = async (product_id, variant_id) => {
	let connection;

	try {
		connection = await dbConnectionPool.getConnection();
		const productRepository = new ProductRepository(connection);
		const productVariantRepository = new ProductVariantRepository(connection);

		const productById = await productRepository.findById(product_id);

		if (!productById) {
			throw new sharedErrors.ResourceNotFoundError();
		}

		const variantById = await productVariantRepository.findById(product_id, variant_id);

		if (!variantById) {
			throw new sharedErrors.ResourceNotFoundError();
		}

		const attributesByVariantId = await productVariantRepository.findAttributesByVariantId(
			variantById.id
		);

		const imagesByVariantId = await productVariantRepository.findImagesByVariantId(variantById.id);

		connection.release();

		return {
			...variantById,
			attribute_combinations: attributesByVariantId,
			images: imagesByVariantId,
		};
	} catch (err) {
		if (connection) connection.release();

		if (!err.status) {
			logger.error({
				message: err.message,
			});

			throw new sharedErrors.InternalServerError('Error while retrieving product variant');
		}

		throw err;
	}
};

module.exports = {
	findAll,
	findById,
};

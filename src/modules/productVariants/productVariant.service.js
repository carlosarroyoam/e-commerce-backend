import ProductRepository from '#modules/products/product.repository.js';
import ProductVariantRepository from '#modules/productVariants/productVariant.repository.js';

import sharedErrors from '#common/errors/index.js';
import dbConnectionPool from '#common/lib/mysql/connectionPool.js';
import logger from '#common/lib/winston/logger.js';

/**
 * ProductVariantService class.
 */
class ProductVariantService {
	/**
	 * Retrieves all product variants.
	 *
	 * @param {number} product_id The query options.
	 * @return {Promise} The list of products.
	 */
	async findAll(product_id) {
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

					const imagesByVariantId = await productVariantRepository.findImagesByVariantId(
						variant.id
					);

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
	}

	/**
	 * Retrieves a product variant by its id.
	 *
	 * @param {number} product_id The id of the product.
	 * @param {number} variant_id The id of the variant to retrieve.
	 * @return {Promise} The variant.
	 */
	async findById(product_id, variant_id) {
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

			const imagesByVariantId = await productVariantRepository.findImagesByVariantId(
				variantById.id
			);

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
	}
}

export default new ProductVariantService();

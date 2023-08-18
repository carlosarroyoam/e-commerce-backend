import ProductRepository from './product.repository.js';
import ProductVariantRepository from '../productVariants/productVariant.repository.js';
import sharedErrors from '../../common/errors/index.js';
import dbConnectionPool from '../../common/lib/mysql/connectionPool.js';
import logger from '../../common/lib/winston/logger.js';
import stringUtils from '../../common/utils/string.utils.js';

/**
 * ProductService class.
 */
class ProductService {
	/**
	 * Retrieves all products.
	 *
	 * @param {object} queryOptions The query options.
	 * @param {number} queryOptions.skip The query skip.
	 * @param {number} queryOptions.limit The query limit.
	 * @param {string} queryOptions.sort The order for the results.
	 * @param {string} queryOptions.search The search criteria.
	 * @return {Promise} The list of products.
	 */
	async findAll({ skip, limit, sort, search }) {
		let connection;

		try {
			connection = await dbConnectionPool.getConnection();
			const productRepository = new ProductRepository(connection);
			const productVariantRepository = new ProductVariantRepository(connection);

			const rawProducts = await productRepository.findAll({
				skip,
				limit,
				sort,
				search,
			});

			const products = await Promise.all(
				rawProducts.map(async (product) => {
					const propertiesByProductId = await productRepository.findPropertiesByProductId(
						product.id
					);

					const rawVariantsByProductId = await productVariantRepository.findByProductId(product.id);

					const variantsByProductId = await Promise.all(
						rawVariantsByProductId.map(async (variant) => {
							const attributesByVariantId =
								await productVariantRepository.findAttributesByVariantId(variant.id);

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

					return {
						...product,
						properties: propertiesByProductId,
						variants: variantsByProductId,
					};
				})
			);

			connection.release();

			return products;
		} catch (err) {
			if (connection) connection.release();

			if (!err.status) {
				logger.error({
					message: err.message,
				});

				throw new sharedErrors.InternalServerError('Error while retrieving products');
			}

			throw err;
		}
	}

	/**
	 * Retrieves a product by its id.
	 *
	 * @param {number} product_id The id of the product to retrieve.
	 * @return {Promise} The product.
	 */
	async findById(product_id) {
		let connection;

		try {
			connection = await dbConnectionPool.getConnection();
			const productRepository = new ProductRepository(connection);
			const productVariantRepository = new ProductVariantRepository(connection);

			const productById = await productRepository.findById(product_id);

			if (!productById) {
				throw new sharedErrors.ResourceNotFoundError();
			}

			const propertiesByProductId = await productRepository.findPropertiesByProductId(product_id);

			const rawVariantsByProductId = await productVariantRepository.findByProductId(product_id);

			const variantsByProductId = await Promise.all(
				rawVariantsByProductId.map(async (variant) => {
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

			return {
				...productById,
				properties: propertiesByProductId,
				variants: variantsByProductId,
			};
		} catch (err) {
			if (connection) connection.release();

			if (!err.status) {
				logger.error({
					message: err.message,
				});

				throw new sharedErrors.InternalServerError('Error while retrieving product');
			}

			throw err;
		}
	}

	/**
	 * Stores a product.
	 *
	 * @param {object} product The product to store.
	 * @return {Promise} The created product.
	 */
	async store(product) {
		let connection;

		try {
			connection = await dbConnectionPool.getConnection();
			const productRepository = new ProductRepository(connection);
			const productVariantRepository = new ProductVariantRepository(connection);

			connection.beginTransaction();

			const slug = stringUtils.slugify(product.title);

			const productBySlug = await productRepository.findBySlug(slug);

			if (productBySlug) {
				throw new sharedErrors.BadRequestError(
					`The product with title: '${product.title}' already exists`
				);
			}

			const createdProductId = await productRepository.store({
				...product,
				slug,
			});

			const productById = await productRepository.findById(createdProductId);

			const propertiesByProductId = await productRepository.findPropertiesByProductId(
				productById.id
			);

			const rawVariantsByProductId = await productVariantRepository.findByProductId(productById.id);

			const variantsByProductId = await Promise.all(
				rawVariantsByProductId.map(async (variant) => {
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

			connection.rollback();

			connection.release();

			return {
				...productById,
				properties: propertiesByProductId,
				variants: variantsByProductId,
			};
		} catch (err) {
			if (connection) {
				connection.rollback();

				connection.release();
			}

			if (!err.status) {
				logger.error({
					message: err.message,
				});

				throw new sharedErrors.InternalServerError('Error while storing product');
			}

			throw err;
		}
	}
}

export default new ProductService();

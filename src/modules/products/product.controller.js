const productService = require('./product.service');
const productMapper = require('./product.mapper');
const productVariantMapper = require('../productVariants/productVariant.mapper');
const attributeMapper = require('../attributes/attribute.mapper');

/**
 * ProductController class.
 */
class ProductController {
	/**
	 * Handles incoming request from the /products endpoint.
	 *
	 * @param {*} request The express.js request object.
	 * @param {*} response The express.js response object.
	 * @param {*} next The express.js next object.
	 */
	async index(request, response, next) {
		try {
			const { skip, limit, sort, search } = request.query;

			const products = await productService.findAll({
				skip,
				limit,
				sort,
				search,
			});

			const productsDto = products.map((product) => {
				const productDto = productMapper.toDto(product);

				const productPropertiesDto = product.properties.map((property) =>
					attributeMapper.toDto(property)
				);

				const productVariantsDto = product.variants.map(function (variant) {
					const variantDto = productVariantMapper.toDto(variant);

					const variantAttributesDto = variant.attribute_combinations.map((attribute) =>
						attributeMapper.toDto(attribute)
					);

					return {
						...variantDto,
						attibute_combinations: variantAttributesDto,
					};
				});

				// TODO add product images dto
				const productImagesDto = product.images;

				return {
					...productDto,
					properties: productPropertiesDto,
					variants: productVariantsDto,
					images: productImagesDto,
				};
			});

			response.json({
				message: 'Ok',
				data: productsDto,
			});
		} catch (error) {
			next(error);
		}
	}

	/**
	 * Handles incoming request from the /products/:product_id endpoint.
	 *
	 * @param {*} request The express.js request object.
	 * @param {*} response The express.js response object.
	 * @param {*} next The express.js next object.
	 */
	async show(request, response, next) {
		try {
			const { product_id } = request.params;

			const productById = await productService.findById(product_id);

			const productDto = productMapper.toDto(productById);

			const productPropertiesDto = productById.properties.map((property) =>
				attributeMapper.toDto(property)
			);

			const productVariantsDto = productById.variants.map(function (variant) {
				const variantDto = productVariantMapper.toDto(variant);

				const variantAttributesDto = variant.attribute_combinations.map((attribute) =>
					attributeMapper.toDto(attribute)
				);

				return {
					...variantDto,
					attibute_combinations: variantAttributesDto,
				};
			});

			// TODO add product images dto
			const productImagesDto = productById.images;

			response.json({
				message: 'Ok',
				data: {
					...productDto,
					properties: productPropertiesDto,
					variants: productVariantsDto,
					images: productImagesDto,
				},
			});
		} catch (error) {
			next(error);
		}
	}

	/**
	 * Handles incoming request from the /products endpoint.
	 *
	 * @param {*} request The express.js request object.
	 * @param {*} response The express.js response object.
	 * @param {*} next The express.js next object.
	 */
	async store(request, response, next) {
		try {
			const { title, slug, description, featured, active, category_id, properties, variants } =
				request.body;

			const createdProduct = await productService.store({
				title,
				slug,
				description,
				featured,
				active,
				category_id,
				properties,
				variants,
			});

			const createdProductDto = productMapper.toDto(createdProduct);

			response.status(201).json({
				message: 'Ok',
				data: createdProductDto,
			});
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new ProductController();

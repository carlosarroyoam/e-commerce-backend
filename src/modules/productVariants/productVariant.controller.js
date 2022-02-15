const productVariantService = require('./productVariant.service');
const productVariantMapper = require('./productVariant.mapper');
const attributeMapper = require('../attributes/attribute.mapper');

/**
 * Handles incoming request from the /products/:product_id/variants endpoint.
 *
 * @param {*} request The express.js request object.
 * @param {*} response The express.js response object.
 * @param {*} next The express.js next object.
 */
const index = async (request, response, next) => {
  try {
    const { product_id } = request.params;

    const variants = await productVariantService.findAll(product_id);

    const productVariantsDto = variants.map((productVariant) => {
      const productVariantDto = productVariantMapper.toDto(productVariant);

      const productVariantAttributesDto = productVariant.attribute_combinations.map((attribute) =>
        attributeMapper.toDto(attribute)
      );

      return {
        ...productVariantDto,
        attribute_combinations: productVariantAttributesDto,
      };
    });

    response.send({
      message: 'Ok',
      data: productVariantsDto,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Handles incoming request from the /products/:product_id/variants/:variant_id endpoint.
 *
 * @param {*} request The express.js request object.
 * @param {*} response The express.js response object.
 * @param {*} next The express.js next object.
 */
const show = async (request, response, next) => {
  try {
    const { product_id, variant_id } = request.params;

    const variantById = await productVariantService.findById(product_id, variant_id);

    const productVariantDto = productVariantMapper.toDto(variantById);

    const productVariantAttributesDto = variantById.attribute_combinations.map((attribute) =>
      attributeMapper.toDto(attribute)
    );

    response.send({
      message: 'Ok',
      data: {
        ...productVariantDto,
        attribute_combinations: productVariantAttributesDto,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  index,
  show,
};

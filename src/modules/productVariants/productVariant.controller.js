const productVariantService = require('./productVariant.service');
const productVariantMapper = require('./productVariant.mapper');

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

    const variantsDto = variants.map((variant) => productVariantMapper.toDto(variant));

    response.send({
      message: 'Ok',
      data: variantsDto,
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

    const variantDto = productVariantMapper.toDto(variantById);

    response.send({
      message: 'Ok',
      data: variantDto,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  index,
  show,
};

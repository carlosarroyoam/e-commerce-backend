const productService = require('./product.service');
const productMapper = require('./product.mapper');

/**
 * Handles incoming request from the /products endpoint.
 *
 * @param {*} request The express.js request object.
 * @param {*} response The express.js response object.
 * @param {*} next The express.js next object.
 */
const index = async (request, response, next) => {
  try {
    const { skip, limit, sort, search } = request.query;

    const products = await productService.findAll({ skip, limit, sort, search });

    const productsDto = products.map((customer) => productMapper.toDto(customer));

    response.send({
      message: 'Ok',
      data: productsDto,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Handles incoming request from the /products/:product_id endpoint.
 *
 * @param {*} request The express.js request object.
 * @param {*} response The express.js response object.
 * @param {*} next The express.js next object.
 */
const show = async (request, response, next) => {
  try {
    const { product_id } = request.params;

    const productById = await productService.findById(product_id);

    const productDto = productMapper.toDto(productById);

    response.send({
      message: 'Ok',
      data: productDto,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  index,
  show,
};

import productVariantService from '#features/productVariants/productVariant.service.js';

/**
 * ProductVariantController class.
 */
class ProductVariantController {
  /**
   * Handles incoming request from the /products/:product_id/variants endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async index(request, response, next) {
    try {
      const { product_id } = request.params;

      const variants = await productVariantService.findAll(product_id);

      response.json({ items: variants.items });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles incoming request from the /products/:product_id/variants/:variant_id endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async show(request, response, next) {
    try {
      const { product_id, variant_id } = request.params;

      const variantById = await productVariantService.findById(product_id, variant_id);

      response.json({ ...variantById });
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductVariantController();

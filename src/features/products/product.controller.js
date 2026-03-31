import productService from '#features/products/product.service.js';

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
      const { page, size, sort, search } = request.query;

      const result = await productService.findAll({
        page,
        size,
        sort,
        search,
      });

      response.json({
        items: result.items,
        pagination: result.pagination,
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

      response.json({ ...productById });
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

      response.status(201).set('Location', `/products/${createdProduct.id}`).end();
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductController();

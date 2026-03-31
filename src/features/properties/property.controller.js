import propertyService from '#features/properties/property.service.js';

/**
 * PropertyController class.
 */
class PropertyController {
  /**
   * Handles incoming request from the /properties endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async index(request, response, next) {
    try {
      const { page, size, sort } = request.query;

      const result = await propertyService.findAll({ page, size, sort });

      response.json({
        items: result.items,
        pagination: result.pagination,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles incoming request from the /properties/:property_id endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async show(request, response, next) {
    try {
      const { property_id } = request.params;

      const propertyById = await propertyService.findById(property_id);

      response.json({ ...propertyById });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles incoming request from the /properties endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async store(request, response, next) {
    try {
      const { title } = request.body;

      const createdProperty = await propertyService.store({
        title,
      });

      response.status(201).set('Location', `/properties/${createdProperty.id}`).end();
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles incoming request from the /properties/:property_id endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async update(request, response, next) {
    try {
      const { property_id } = request.params;
      const { title } = request.body;

      await propertyService.update(property_id, {
        title,
      });

      response.status(204).end();
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles incoming request from the /properties/:property_id endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async destroy(request, response, next) {
    try {
      const { property_id } = request.params;

      await propertyService.deleteById(property_id);

      response.status(204).end();
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles incoming request from the /properties/:property_id/restore endpoint.
   *
   * @param {*} request The express.js request object.
   * @param {*} response The express.js response object.
   * @param {*} next The express.js next object.
   */
  async restore(request, response, next) {
    try {
      const { property_id } = request.params;

      await propertyService.restore(property_id);

      response.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

export default new PropertyController();

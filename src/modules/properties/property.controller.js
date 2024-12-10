import propertyService from '#modules/properties/property.service.js';
import propertyMapper from '#modules/properties/property.mapper.js';

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
        message: 'Ok',
        properties: result.properties.map((property) => propertyMapper.toDto(property)),
        page: result.page,
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

      response.json({
        message: 'Ok',
        property: propertyMapper.toDto(propertyById),
      });
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

      response.status(201).json({
        message: 'Ok',
        property: propertyMapper.toDto(createdProperty),
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
  async update(request, response, next) {
    try {
      const { property_id } = request.params;
      const { title } = request.body;

      const updatedProperty = await propertyService.update(property_id, {
        title,
      });

      response.json({
        message: 'Ok',
        property: propertyMapper.toDto(updatedProperty),
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
  async destroy(request, response, next) {
    try {
      const { property_id } = request.params;

      const deletedPropertyId = await propertyService.deleteById(property_id);

      response.json({
        message: 'Ok',
        property: {
          id: deletedPropertyId,
        },
      });
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

      const restoredPropertyId = await propertyService.restore(property_id);

      response.json({
        message: 'Ok',
        property: {
          id: restoredPropertyId,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new PropertyController();

const attributeService = require('./attribute.service');
const attributeMapper = require('./attribute.mapper');

/**
 * Handles incoming request from the /attributes endpoint.
 *
 * @param {*} request The express.js request object.
 * @param {*} response The express.js response object.
 * @param {*} next The express.js next object.
 */
const index = async (request, response, next) => {
  try {
    const attributes = await attributeService.findAll();

    const attributesDto = attributes.map((attribute) => attributeMapper.toDto(attribute));

    response.json({
      message: 'Ok',
      data: attributesDto,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Handles incoming request from the /attributes/:attribute_id endpoint.
 *
 * @param {*} request The express.js request object.
 * @param {*} response The express.js response object.
 * @param {*} next The express.js next object.
 */
const show = async (request, response, next) => {
  try {
    const { attribute_id } = request.params;

    const attributeById = await attributeService.findById(attribute_id);

    const attributeDto = attributeMapper.toDto(attributeById);

    response.json({
      message: 'Ok',
      data: attributeDto,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Handles incoming request from the /attributes endpoint.
 *
 * @param {*} request The express.js request object.
 * @param {*} response The express.js response object.
 * @param {*} next The express.js next object.
 */
const store = async (request, response, next) => {
  try {
    const { title } = request.body;

    const createdAttribute = await attributeService.store({
      title,
    });

    const createdAttributeDto = attributeMapper.toDto(createdAttribute);

    response.status(201).json({
      message: 'Ok',
      data: createdAttributeDto,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Handles incoming request from the /attributes/:attribute_id endpoint.
 *
 * @param {*} request The express.js request object.
 * @param {*} response The express.js response object.
 * @param {*} next The express.js next object.
 */
const update = async (request, response, next) => {
  try {
    const { attribute_id } = request.params;
    const { title } = request.body;

    const updatedAttribute = await attributeService.update(attribute_id, {
      title,
    });

    const updatedAttributeDto = attributeMapper.toDto(updatedAttribute);

    response.json({
      message: 'Ok',
      data: updatedAttributeDto,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Handles incoming request from the /attributes/:attribute_id endpoint.
 *
 * @param {*} request The express.js request object.
 * @param {*} response The express.js response object.
 * @param {*} next The express.js next object.
 */
const destroy = async (request, response, next) => {
  try {
    const { attribute_id } = request.params;

    const deletedAttributeId = await attributeService.deleteById(attribute_id);

    response.json({
      message: 'Ok',
      data: {
        attribute_id: deletedAttributeId,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Handles incoming request from the /attributes/:attribute_id/restore endpoint.
 *
 * @param {*} request The express.js request object.
 * @param {*} response The express.js response object.
 * @param {*} next The express.js next object.
 */
const restore = async (request, response, next) => {
  try {
    const { attribute_id } = request.params;

    const restoredAttributeId = await attributeService.restore(attribute_id);

    response.json({
      message: 'Ok',
      data: {
        attribute_id: restoredAttributeId,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
  restore,
};

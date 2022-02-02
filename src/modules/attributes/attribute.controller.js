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

    response.send({
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

    response.send({
      message: 'Ok',
      data: attributeDto,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  index,
  show,
};

const objectUtils = require('../../shared/utils/object.utils');

/**
 * Maps a attribute object to a attribute dto object.
 *
 * @param {object} attribute The attribute object to map.
 * @return {object} The attribute dto object.
 */
const toDto = (attribute) => {
  return {
    id: attribute.id,
    title: attribute.title,
    value: attribute.value,
  };
};

/**
 * Maps a attributeDto object to a attribute database entity object.
 *
 * @param {object} attributeDto The attribute dto object to map.
 * @return {object} The attribute database entity object.
 */
const toDatabaseEntity = (attributeDto) => {
  const attributeDbEntity = {
    id: attributeDto.id,
    title: attributeDto.title,
  };

  const cleanedAttributeDbEntity = objectUtils.removeUndefined(attributeDbEntity);

  return cleanedAttributeDbEntity;
};

module.exports = {
  toDto,
  toDatabaseEntity,
};

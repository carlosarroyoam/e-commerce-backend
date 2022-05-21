const objectUtils = require('../../common/utils/object.utils');

/**
 * AttributeMapper class.
 */
class AttributeMapper {
  /**
   * Maps a attribute object to a attribute dto object.
   *
   * @param {object} attribute The attribute object to map.
   * @return {object} The attribute dto object.
   */
  toDto(attribute) {
    return {
      id: attribute.id,
      title: attribute.title,
      value: attribute.value,
    };
  }

  /**
   * Maps a attributeDto object to a attribute database entity object.
   *
   * @param {object} attributeDto The attribute dto object to map.
   * @return {object} The attribute database entity object.
   */
  toDatabaseEntity(attributeDto) {
    const attributeDbEntity = {
      id: attributeDto.id,
      title: attributeDto.title,
    };

    const cleanedAttributeDbEntity = objectUtils.removeUndefined(attributeDbEntity);

    return cleanedAttributeDbEntity;
  }
}

module.exports = new AttributeMapper();

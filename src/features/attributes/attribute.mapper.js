import objectUtils from '#core/utils/object.utils.js';

/**
 * AttributeMapper class.
 */
class AttributeMapper {
  /**
   * Maps a Attribute object to a AttributeDto object.
   *
   * @param {object} attribute The Attribute database entity object to map.
   * @return {object} The AttributeDto object.
   */
  toDto(attribute) {
    return {
      id: attribute.id,
      title: attribute.title,
      value: attribute.value,
    };
  }

  /**
   * Maps an AttributeDto object to an Attribute database entity object.
   *
   * @param {object} attributeDto The AttributeDto object to map.
   * @return {object} The Attribute database entity object.
   */
  toDatabaseEntity(attributeDto) {
    const dbEntity = {
      id: attributeDto.id,
      title: attributeDto.title,
    };

    const cleanedDbEntity = objectUtils.removeUndefined(dbEntity);

    return cleanedDbEntity;
  }
}

export default new AttributeMapper();

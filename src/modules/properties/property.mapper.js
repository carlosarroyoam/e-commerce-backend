import objectUtils from '#common/utils/object.utils.js';

/**
 * PropertyMapper class.
 */
class PropertyMapper {
  /**
   * Maps a property object to a property dto object.
   *
   * @param {object} property The property object to map.
   * @return {object} The property dto object.
   */
  toDto(property) {
    return {
      id: property.id,
      title: property.title,
      value: property.value,
      deleted_at: property.deleted_at,
    };
  }

  /**
   * Maps a propertyDto object to a property database entity object.
   *
   * @param {object} propertyDto The property dto object to map.
   * @return {object} The property database entity object.
   */
  toDatabaseEntity(propertyDto) {
    const propertyDbEntity = {
      id: propertyDto.id,
      title: propertyDto.title,
    };

    const cleanedPropertyDbEntity = objectUtils.removeUndefined(propertyDbEntity);

    return cleanedPropertyDbEntity;
  }
}

export default new PropertyMapper();

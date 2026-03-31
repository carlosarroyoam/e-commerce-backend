import objectUtils from '#core/utils/object.utils.js';

/**
 * PropertyMapper class.
 */
class PropertyMapper {
  /**
   * Maps a property database entity object to a PropertyDto object.
   *
   * @param {object} property The Property database entity object to map.
   * @return {object} The PropertyDto object.
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
   * Maps a PropertyDto object to a Property database entity object.
   *
   * @param {object} propertyDto The PropertyDto object to map.
   * @return {object} The Property database entity object.
   */
  toDatabaseEntity(propertyDto) {
    const dbEntity = {
      id: propertyDto.id,
      title: propertyDto.title,
    };

    const cleanedDbEntity = objectUtils.removeUndefined(dbEntity);

    return cleanedDbEntity;
  }
}

export default new PropertyMapper();

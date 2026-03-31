import objectUtils from '#core/utils/object.utils.js';

/**
 * CategoryMapper class.
 */
class CategoryMapper {
  /**
   * Maps a Category database entity object to a CategoryDto object.
   *
   * @param {object} category The category database entity object to map.
   * @return {object} The CategoryDto object.
   */
  toDto(category) {
    return {
      id: category.id,
      title: category.title,
    };
  }

  /**
   * Maps a CategoryDto object to a Category database entity object.
   *
   * @param {object} categoryDto The CategoryDto object to map.
   * @return {object} The Category database entity object.
   */
  toDatabaseEntity(categoryDto) {
    const dbEntity = {
      id: categoryDto.id,
      title: categoryDto.title,
    };

    const cleanedDbEntity = objectUtils.removeUndefined(dbEntity);

    return cleanedDbEntity;
  }
}

export default new CategoryMapper();

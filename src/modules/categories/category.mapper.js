import objectUtils from '#common/utils/object.utils.js';

/**
 * CategoryMapper class.
 */
class CategoryMapper {
  /**
   * Maps a category object to a category dto object.
   *
   * @param {object} category The category object to map.
   * @return {object} The category dto object.
   */
  toDto(category) {
    return {
      id: category.id,
      title: category.title,
    };
  }

  /**
   * Maps a categoryDto object to a category database entity object.
   *
   * @param {object} categoryDto The category dto object to map.
   * @return {object} The category database entity object.
   */
  toDatabaseEntity(categoryDto) {
    const categoryDbEntity = {
      id: categoryDto.id,
      title: categoryDto.title,
    };

    const cleanedCategoryDbEntity = objectUtils.removeUndefined(categoryDbEntity);

    return cleanedCategoryDbEntity;
  }
}

export default new CategoryMapper();

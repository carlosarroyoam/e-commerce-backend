const objectUtils = require('../../shared/utils/object.utils');

/**
 * Maps a category object to a category dto object.
 *
 * @param {object} category The category object to map.
 * @return {object} The category dto object.
 */
const toDto = (category) => {
  return {
    id: category.id,
    title: category.title,
  };
};

/**
 * Maps a categoryDto object to a category database entity object.
 *
 * @param {object} categoryDto The category dto object to map.
 * @return {object} The category database entity object.
 */
const toDatabaseEntity = (categoryDto) => {
  const categoryDbEntity = {
    id: categoryDto.id,
    title: categoryDto.sku,
  };

  const cleanedCategoryDbEntity = objectUtils.removeUndefined(categoryDbEntity);

  return cleanedCategoryDbEntity;
};

module.exports = {
  toDto,
  toDatabaseEntity,
};

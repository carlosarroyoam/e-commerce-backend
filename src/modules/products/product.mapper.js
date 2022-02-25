const objectUtils = require('../../shared/utils/object.utils');

/**
 * Maps a product object to a product dto object.
 *
 * @param {object} product The product object to map.
 * @return {object} The product dto object.
 */
const toDto = (product) => {
  return {
    id: product.id,
    title: product.title,
    slug: product.slug,
    description: product.description,
    featured: product.featured,
    active: product.active,
    category: product.category,
    created_at: product.created_at,
    updated_at: product.updated_at,
    deleted_at: product.deleted_at,
  };
};

/**
 * Maps a productDto object to a product database entity object.
 *
 * @param {object} productDto The product dto object to map.
 * @return {object} The product database entity object.
 */
const toDatabaseEntity = (productDto) => {
  const productDbEntity = {
    id: productDto.id,
    title: productDto.title,
    slug: productDto.slug,
    description: productDto.description,
    featured: productDto.featured,
    active: productDto.active,
    category_id: productDto.category_id,
    created_at: productDto.created_at,
    updated_at: productDto.updated_at,
    deleted_at: productDto.deleted_at,
  };

  const cleanedProductDbEntity = objectUtils.removeUndefined(productDbEntity);

  return cleanedProductDbEntity;
};

module.exports = {
  toDto,
  toDatabaseEntity,
};

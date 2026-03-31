import objectUtils from '#core/utils/object.utils.js';

/**
 * ProductMapper class.
 */
class ProductMapper {
  /**
   * Maps a Product database entity object to a ProductDto object.
   *
   * @param {object} product The Product database entity object to map.
   * @return {object} The ProductDto object.
   */
  toDto(product) {
    return {
      id: product.id,
      title: product.title,
      slug: product.slug,
      description: product.description,
      featured: product.featured === 1,
      active: product.active === 1,
      category: product.category,
      created_at: product.created_at,
      updated_at: product.updated_at,
      deleted_at: product.deleted_at,
    };
  }

  /**
   * Maps a ProductDto object to a product database entity object.
   *
   * @param {object} productDto The ProductDto object to map.
   * @return {object} The Product database entity object.
   */
  toDatabaseEntity(productDto) {
    const dbEntity = {
      id: productDto.id,
      title: productDto.title,
      slug: productDto.slug,
      description: productDto.description,
      featured: productDto.featured ? 1 : 0,
      active: productDto.active ? 1 : 0,
      category_id: productDto.category_id,
      created_at: productDto.created_at,
      updated_at: productDto.updated_at,
      deleted_at: productDto.deleted_at,
    };

    const cleanedDbEntity = objectUtils.removeUndefined(dbEntity);

    return cleanedDbEntity;
  }
}

export default new ProductMapper();

import objectUtils from '#core/utils/object.utils.js';

/**
 * ProductVariantMapper class.
 */
class ProductVariantMapper {
  /**
   * Maps a variant object to a variant dto object.
   *
   * @param {object} variant The variant object to map.
   * @return {object} The variant dto object.
   */
  toDto(variant) {
    return {
      id: variant.id,
      sku: variant.sku,
      price: Number(variant.price),
      compared_at_price: Number(variant.compared_at_price),
      cost_per_item: Number(variant.cost_per_item),
      quantity_on_stock: variant.quantity_on_stock,
      product_id: variant.product_id,
    };
  }

  /**
   * Maps a variantDto object to a variant database entity object.
   *
   * @param {object} variantDto The variant dto object to map.
   * @return {object} The variant database entity object.
   */
  toDatabaseEntity(variantDto) {
    const variantDbEntity = {
      id: variantDto.id,
      sku: variantDto.sku,
      price: variantDto.price,
      compared_at_price: variantDto.compared_at_price,
      cost_per_item: variantDto.cost_per_item,
      quantity_on_stock: variantDto.quantity_on_stock,
      product_id: variantDto.product_id,
    };

    const cleanedVariantDbEntity = objectUtils.removeUndefined(variantDbEntity);

    return cleanedVariantDbEntity;
  }
}

export default new ProductVariantMapper();

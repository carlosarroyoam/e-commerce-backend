import objectUtils from '#core/utils/object.utils.js';

/**
 * ProductVariantMapper class.
 */
class ProductVariantMapper {
  /**
   * Maps a Variant database entity object to a VariantDto object.
   *
   * @param {object} variant The variant database entity object to map.
   * @return {object} The VariantDto object.
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
   * Maps a VariantDto object to a Variant database entity object.
   *
   * @param {object} variantDto The VariantDto object to map.
   * @return {object} The Variant database entity object.
   */
  toDatabaseEntity(variantDto) {
    const dbEntity = {
      id: variantDto.id,
      sku: variantDto.sku,
      price: variantDto.price,
      compared_at_price: variantDto.compared_at_price,
      cost_per_item: variantDto.cost_per_item,
      quantity_on_stock: variantDto.quantity_on_stock,
      product_id: variantDto.product_id,
    };

    const cleanedDbEntity = objectUtils.removeUndefined(dbEntity);

    return cleanedDbEntity;
  }
}

export default new ProductVariantMapper();

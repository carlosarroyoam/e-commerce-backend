const objectUtils = require('../../shared/utils/object.utils');

/**
 * Maps a variant object to a variant dto object.
 *
 * @param {object} variant The variant object to map.
 * @return {object} The variant dto object.
 */
const toDto = (variant) => {
  return {
    id: variant.id,
    sku: variant.sku,
    price: variant.price,
    compared_at_price: variant.compared_at_price,
    cost_per_item: variant.cost_per_item,
    quantity_on_stock: variant.quantity_on_stock,
    product_id: variant.product_id,
  };
};

/**
 * Maps a variantDto object to a variant database entity object.
 *
 * @param {object} variantDto The variant dto object to map.
 * @return {object} The variant database entity object.
 */
const toDatabaseEntity = (variantDto) => {
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
};

module.exports = {
  toDto,
  toDatabaseEntity,
};

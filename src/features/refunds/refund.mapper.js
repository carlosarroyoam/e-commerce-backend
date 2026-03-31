import objectUtils from '#app/core/utils/object.utils.js';

/**
 * RefundMapper class.
 */
class RefundMapper {
  /**
   * Maps a Refund database entity object to a RefundDto object.
   *
   * @param {object} refund The Refund database entity object to map.
   * @return {object} The RefundDto object.
   */
  toDto(refund) {
    return {
      id: refund.id,
      order_id: refund.order_id,
      orderNumber: refund.order_number,
      amount: refund.amount,
      reason: refund.reason,
      createdAt: refund.created_at,
    };
  }

  /**
   * Maps a RefundItem database entity object to a RefundItemDto object.
   *
   * @param {object} refundItem The RefundItem database entity object to map.
   * @return {object} The RefundItemDto object.
   */
  toItemDto(refundItem) {
    return {
      id: refundItem.id,
      order_item_id: refundItem.order_item_id,
      product_id: refundItem.product_id,
      productTitle: refundItem.product_title,
      variant_id: refundItem.variant_id,
      variantSku: refundItem.sku,
      quantity: refundItem.quantity,
      amount: refundItem.amount,
    };
  }

  /**
   * Maps a RefundDto to a Refund database entity object.
   *
   * @param {object} refundDto The RefundDto object to map.
   * @return {object} The Refund database entity object.
   */
  toDatabaseEntity(refundDto) {
    const dbEntity = {
      order_id: refundDto.order_id,
      amount: refundDto.amount,
      reason: refundDto.reason,
    };

    const cleanedDbEntity = objectUtils.removeUndefined(dbEntity);

    return cleanedDbEntity;
  }

  /**
   * Maps a RefundItemDto to a RefundItem database entity object.
   *
   * @param {object} refundItemDto The RefundItemDto object to map.
   * @return {object} The RefundItem database entity object.
   */
  toDatabaseItemEntity(refundItemDto) {
    const dbEntity = {
      refund_id: refundItemDto.refund_id,
      order_item_id: refundItemDto.order_item_id,
      quantity: refundItemDto.quantity,
      amount: refundItemDto.amount,
    };

    const cleanedDbEntity = objectUtils.removeUndefined(dbEntity);

    return cleanedDbEntity;
  }
}

export default new RefundMapper();

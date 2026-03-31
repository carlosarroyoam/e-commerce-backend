import objectUtils from '#app/core/utils/object.utils.js';

/**
 * CustomerMapper class.
 */
class OrderMapper {
  /**
   * Maps a Order database entity object to a OrderDto object.
   *
   * @param {object} order The Order database entity object to map.
   * @return {object} The OrderDto object.
   */
  toDto(order) {
    return {
      id: order.id,
      orderNumber: order.order_number,
      status_id: order.status_id,
      status: order.status,
      payment_status_id: order.payment_status_id,
      paymentStatus: order.payment_status,
      subtotal: order.subtotal,
      tax_total: order.tax_total,
      shipping_total: order.shipping_total,
      total: order.total,
      notes: order.notes,
      shippingAddress: {
        streetName: order.street_name,
        streetNumber: order.street_number,
        apartamentNumber: order.apartament_number,
        sublocality: order.sublocality,
        locality: order.locality,
        state: order.state,
        postalCode: order.postal_code,
        country: order.country,
        phoneNumber: order.phone_number,
      },
      customer_id: order.customer_id,
      createdAt: order.created_at,
      updatedAt: order.updated_at,
    };
  }

  /**
   * Maps a OrderItem database entity object to a OrderItemDto object.
   *
   * @param {object} orderItem The OrderItem database entity object to map.
   * @return {object} The OrderItemDto object.
   */
  toItemDto(orderItem) {
    return {
      id: orderItem.id,
      product_id: orderItem.product_id,
      productTitle: orderItem.product_title,
      variant_id: orderItem.variant_id,
      variantSku: orderItem.sku,
      variantName: orderItem.variant_name,
      quantity: orderItem.quantity,
      unit_price: orderItem.unit_price,
      total: orderItem.total,
    };
  }

  /**
   * Maps a StatusHistory database entity object to a StatusHistoryDto object.
   *
   * @param {object} statusHistory The StatusHistory database entity  to map.
   * @return {object} The StatusHistoryDto object.
   */
  toStatusHistoryDto(statusHistory) {
    return {
      id: statusHistory.id,
      status_id: statusHistory.status_id,
      status: statusHistory.status,
      note: statusHistory.note,
      changedAt: statusHistory.changed_at,
    };
  }

  /**
   * Maps a OrderDto object to a order database entity object.
   *
   * @param {object} orderDto The OrderDto object to map.
   * @return {object} The order database entity object.
   */
  toDatabaseEntity(orderDto) {
    const dbEntity = {
      order_number: orderDto.orderNumber,
      customer_id: orderDto.customer_id,
      shipping_address_id: orderDto.shipping_address_id,
      status_id: orderDto.status_id,
      payment_status_id: orderDto.payment_status_id,
      subtotal: orderDto.subtotal,
      tax_total: orderDto.tax_total || 0,
      shipping_total: orderDto.shipping_total || 0,
      total: orderDto.total,
      notes: orderDto.notes,
    };

    const cleanedDbEntity = objectUtils.removeUndefined(dbEntity);

    return cleanedDbEntity;
  }

  /**
   * Maps a OrderItemDto object to a OrderItem database entity object.
   *
   * @param {object} orderItemDto The OrderItemDto dto object to map.
   * @return {object} The OrderItem database entity object.
   */
  toDatabaseItemEntity(orderItemDto) {
    const dbEntity = {
      order_id: orderItemDto.order_id,
      product_id: orderItemDto.product_id,
      variant_id: orderItemDto.variant_id,
      quantity: orderItemDto.quantity,
      unit_price: orderItemDto.unit_price,
      total: orderItemDto.total,
    };

    const cleanedDbEntity = objectUtils.removeUndefined(dbEntity);

    return cleanedDbEntity;
  }

  /**
   * Maps a OrderStatusHistoryDto object to a StatusHistory database entity object.
   *
   * @param {object} orderStatusHistoryDto The OrderStatusHistoryDto object to map.
   * @return {object} The StatusHistory database entity object.
   */
  toDatabaseStatusHistoryEntity(orderStatusHistoryDto) {
    const dbEntity = {
      order_id: orderStatusHistoryDto.order_id,
      status_id: orderStatusHistoryDto.status_id,
      note: orderStatusHistoryDto.note,
    };

    const cleanedDbEntity = objectUtils.removeUndefined(dbEntity);

    return cleanedDbEntity;
  }
}

export default new OrderMapper();

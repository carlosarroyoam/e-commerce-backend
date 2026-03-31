const toDatabaseEntity = (refund) => ({
  order_id: refund.order_id,
  amount: refund.amount,
  reason: refund.reason,
});

const toDatabaseItemEntity = (refundItem) => ({
  refund_id: refundItem.refund_id,
  order_item_id: refundItem.order_item_id,
  quantity: refundItem.quantity,
  amount: refundItem.amount,
});

const toDto = (refund) => ({
  id: refund.id,
  order_id: refund.order_id,
  orderNumber: refund.order_number,
  amount: refund.amount,
  reason: refund.reason,
  createdAt: refund.created_at,
});

const toItemDto = (refundItem) => ({
  id: refundItem.id,
  order_item_id: refundItem.order_item_id,
  product_id: refundItem.product_id,
  productTitle: refundItem.product_title,
  variant_id: refundItem.variant_id,
  variantSku: refundItem.sku,
  quantity: refundItem.quantity,
  amount: refundItem.amount,
});

const refundMapper = {
  toDatabaseEntity,
  toDatabaseItemEntity,
  toDto,
  toItemDto,
};

export default refundMapper;

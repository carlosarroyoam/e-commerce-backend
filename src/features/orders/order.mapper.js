const toDto = (order) => ({
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
});

const toItemDto = (orderItemDto) => ({
  id: orderItemDto.id,
  product_id: orderItemDto.product_id,
  productTitle: orderItemDto.product_title,
  variant_id: orderItemDto.variant_id,
  variantSku: orderItemDto.sku,
  variantName: orderItemDto.variant_name,
  quantity: orderItemDto.quantity,
  unit_price: orderItemDto.unit_price,
  total: orderItemDto.total,
});

const toStatusHistoryDto = (statusHistory) => ({
  id: statusHistory.id,
  status_id: statusHistory.status_id,
  status: statusHistory.status,
  note: statusHistory.note,
  changedAt: statusHistory.changed_at,
});
const toDatabaseEntity = (orderDto) => ({
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
});

const toDatabaseItemEntity = (orderItemDto) => ({
  order_id: orderItemDto.order_id,
  product_id: orderItemDto.product_id,
  variant_id: orderItemDto.variant_id,
  quantity: orderItemDto.quantity,
  unit_price: orderItemDto.unit_price,
  total: orderItemDto.total,
});

const toDatabaseStatusHistoryEntity = (orderStatusHistoryDto) => ({
  order_id: orderStatusHistoryDto.order_id,
  status_id: orderStatusHistoryDto.status_id,
  note: orderStatusHistoryDto.note,
});

const orderMapper = {
  toDto,
  toItemDto,
  toStatusHistoryDto,
  toDatabaseEntity,
  toDatabaseItemEntity,
  toDatabaseStatusHistoryEntity,
};

export default orderMapper;

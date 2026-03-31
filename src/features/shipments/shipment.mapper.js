const toDto = (shipment) => ({
  id: shipment.id,
  order_id: shipment.order_id,
  orderNumber: shipment.order_number,
  carrier_id: shipment.carrier_id,
  carrier: shipment.carrier,
  tracking_number: shipment.tracking_number,
  shippedAt: shipment.shipped_at,
  deliveredAt: shipment.delivered_at,
});

const toDatabaseEntity = (shipment) => ({
  order_id: shipment.order_id,
  carrier_id: shipment.carrier_id,
  tracking_number: shipment.tracking_number,
  shipped_at: shipment.shippedAt,
  delivered_at: shipment.deliveredAt,
});

const shipmentMapper = {
  toDatabaseEntity,
  toDto,
};

export default shipmentMapper;

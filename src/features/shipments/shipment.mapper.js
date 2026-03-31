import objectUtils from '#app/core/utils/object.utils.js';

/**
 * ShipmentMapper class.
 */
class ShipmentMapper {
  /**
   * Maps a Shipment database entity object to a ShipmentDto object.
   *
   * @param {object} shipment The Shipment database entity object to map.
   * @return {object} The ShipmentDto object.
   */
  toDto(shipment) {
    return {
      id: shipment.id,
      order_id: shipment.order_id,
      orderNumber: shipment.order_number,
      carrier_id: shipment.carrier_id,
      carrier: shipment.carrier,
      tracking_number: shipment.tracking_number,
      shippedAt: shipment.shipped_at,
      deliveredAt: shipment.delivered_at,
    };
  }

  /**
   * Maps a ShipmentDto to a Shipment database entity object.
   *
   * @param {object} shipmentDto The ShipmentDto object to map.
   * @return {object} The Shipment database entity object.
   */
  toDatabaseEntity(shipmentDto) {
    const dbEntity = {
      order_id: shipmentDto.order_id,
      carrier_id: shipmentDto.carrier_id,
      tracking_number: shipmentDto.tracking_number,
      shipped_at: shipmentDto.shippedAt,
      delivered_at: shipmentDto.deliveredAt,
    };

    const cleanedDbEntity = objectUtils.removeUndefined(dbEntity);

    return cleanedDbEntity;
  }
}

export default new ShipmentMapper();

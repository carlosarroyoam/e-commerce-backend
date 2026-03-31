import objectUtils from '#core/utils/object.utils.js';

/**
 * CustomerAddressMapper class.
 */
class CustomerAddressMapper {
  /**
   * Maps a CustomerAddress database entity object to a CustomerAddressDto object.
   *
   * @param {object} customerAddress The CustomerAddress database entity object to map.
   * @return {object} The CustomerAddressDto object.
   */
  toDto(customerAddress) {
    return {
      id: customerAddress.id,
      street_name: customerAddress.street_name,
      street_number: customerAddress.street_number,
      apartament_number: customerAddress.apartament_number,
      sublocality: customerAddress.sublocality,
      locality: customerAddress.locality,
      state: customerAddress.state,
      country: customerAddress.country,
      postal_code: customerAddress.postal_code,
      phone_number: customerAddress.phone_number,
      customer_id: customerAddress.customer_id,
    };
  }

  /**
   * Maps a CustomerAddressDto object to a CustomerAddress database entity object.
   *
   * @param {object} customerAddressDto The CustomerAddressDto object to map.
   * @return {object} The CustomerAddress database entity object.
   */
  toDatabaseEntity(customerAddressDto) {
    const customerAddressDbEntity = {
      id: customerAddressDto.id,
      street_name: customerAddressDto.street_name,
      street_number: customerAddressDto.street_number,
      apartament_number: customerAddressDto.apartament_number,
      sublocality: customerAddressDto.sublocality,
      locality: customerAddressDto.locality,
      state: customerAddressDto.state,
      country: customerAddressDto.country,
      postal_code: customerAddressDto.postal_code,
      phone_number: customerAddressDto.phone_number,
      customer_id: customerAddressDto.customer_id,
    };

    const cleanedAdminDbEntity = objectUtils.removeUndefined(customerAddressDbEntity);

    return cleanedAdminDbEntity;
  }
}

export default new CustomerAddressMapper();

const objectUtils = require('../../shared/utils/object.utils');

/**
 * Maps a customer address object to a customer address dto object.
 *
 * @param {object} customerAddress The customer address object to map.
 * @return {object} The customer address dto object.
 */
const toDto = (customerAddress) => {
  return {
    id: customerAddress.id,
    street_name: customerAddress.street_name,
    street_number: customerAddress.street_number,
    sublocality: customerAddress.sublocality,
    locality: customerAddress.locality,
    state: customerAddress.state,
    postal_code: customerAddress.postal_code,
    phone_number: customerAddress.phone_number,
    customer_id: customerAddress.customer_id,
  };
};

/**
 * Maps a customer address dto object to a customer address database entity object.
 *
 * @param {object} customerAddressDto The customer address dto object to map.
 * @return {object} The customer address database entity object.
 */
const toDatabaseEntity = (customerAddressDto) => {
  const customerAddressDbEntity = {
    id: customerAddressDto.id,
    street_name: customerAddressDto.street_name,
    street_number: customerAddressDto.street_number,
    sublocality: customerAddressDto.sublocality,
    locality: customerAddressDto.locality,
    state: customerAddressDto.state,
    postal_code: customerAddressDto.postal_code,
    phone_number: customerAddressDto.phone_number,
    customer_id: customerAddressDto.customer_id,
  };

  const cleanedAdminDbEntity = objectUtils.removeUndefined(customerAddressDbEntity);

  return cleanedAdminDbEntity;
};

module.exports = {
  toDto,
  toDatabaseEntity,
};

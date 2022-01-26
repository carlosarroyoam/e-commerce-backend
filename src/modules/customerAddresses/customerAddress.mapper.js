const objectUtils = require('../../shared/utils/object.utils');

/**
 * Maps a customer address object to a customer address dto object.
 *
 * @param {object} address The customer address object to map.
 * @return {object} The customer address dto object.
 */
const toDto = (address) => {
  return {
    id: address.id,
    street_name: address.street_name,
    street_number: address.street_number,
    sublocality: address.sublocality,
    locality: address.locality,
    state: address.state,
    postal_code: address.postal_code,
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
    customer_id: customerAddressDto.customer_id,
  };

  const cleanedAdminDbEntity = objectUtils.removeUndefined(customerAddressDbEntity);

  return cleanedAdminDbEntity;
};

module.exports = {
  toDto,
  toDatabaseEntity,
};

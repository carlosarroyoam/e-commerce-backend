const objectUtils = require('../../shared/utils/object.utils');

/**
 * Maps a admin object to a admin dto object.
 *
 * @param {object} address The address object to map.
 * @return {object} The admin dto object.
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
 * Maps a admin dto object to a admin database entity object.
 *
 * @param {object} adminDto The admin dto object to map.
 * @return {object} The admin database entity object.
 */
const toDatabaseEntity = (adminDto) => {
  const adminDbEntity = {
    is_super: adminDto.is_super,
    user_id: adminDto.user_id,
  };

  const cleanedAdminDbEntity = objectUtils.removeUndefined(adminDbEntity);

  return cleanedAdminDbEntity;
};

module.exports = {
  toDto,
  toDatabaseEntity,
};

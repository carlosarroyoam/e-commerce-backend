import objectUtils from '#core/utils/object.utils.js';

/**
 * CustomerMapper class.
 */
class CustomerMapper {
  /**
   * Maps a Customer database entity object to a CustomerDto object.
   *
   * @param {object} customer The Customer database entity object to map.
   * @return {object} The CustomerDto object.
   */
  toDto(customer) {
    return {
      id: customer.id,
      user_id: customer.user_id,
      first_name: customer.first_name,
      last_name: customer.last_name,
      email: customer.email,
      created_at: customer.created_at,
      updated_at: customer.updated_at,
      deleted_at: customer.deleted_at,
    };
  }

  /**
   * Maps a CustomerDto object to a Customer database entity object.
   *
   * @param {object} customerDto The CustomerDto object to map.
   * @return {object} The Customer database entity object.
   */
  toDatabaseEntity(customerDto) {
    const dbEntity = {
      user_id: customerDto.user_id,
    };

    const cleanedDbEntity = objectUtils.removeUndefined(dbEntity);

    return cleanedDbEntity;
  }
}

export default new CustomerMapper();

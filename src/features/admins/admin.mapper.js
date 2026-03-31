import objectUtils from '#core/utils/object.utils.js';

/**
 * AdminMapper class.
 */
class AdminMapper {
  /**
   * Maps an Admin database entity object to an AdminDto object.
   *
   * @param {object} admin The Admin database entity object to map.
   * @return {object} The AdminDto object.
   */
  toDto(admin) {
    return {
      id: admin.id,
      user_id: admin.user_id,
      first_name: admin.first_name,
      last_name: admin.last_name,
      email: admin.email,
      is_super: admin.is_super === 1,
      created_at: admin.created_at,
      updated_at: admin.updated_at,
      deleted_at: admin.deleted_at,
    };
  }

  /**
   * Maps an AdminDto object to an Admin database entity object.
   *
   * @param {object} adminDto The AdminDto object to map.
   * @return {object} The Admin database entity object.
   */
  toDatabaseEntity(adminDto) {
    const dbEntity = {
      is_super: adminDto.is_super ? 1 : 0,
      user_id: adminDto.user_id,
    };

    const cleanedDbEntity = objectUtils.removeUndefined(dbEntity);

    return cleanedDbEntity;
  }
}

export default new AdminMapper();

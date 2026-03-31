import objectUtils from '#core/utils/object.utils.js';

/**
 * UserMapper class.
 */
class UserMapper {
  /**
   * Maps a User database entity object to a UserDto object.
   *
   * @param {object} user The User database entity object to map.
   * @return {object} The UserDto object.
   */
  toDto(user) {
    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      user_role_id: user.user_role_id,
      user_role: user.user_role,
      created_at: user.created_at,
      updated_at: user.updated_at,
      deleted_at: user.deleted_at,
    };
  }

  /**
   * Maps a UserDto to a User database entity object.
   *
   * @param {object} userDto The UserDto object to map.
   * @return {object} The User database entity object.
   */
  toDatabaseEntity(userDto) {
    const dbEntity = {
      id: userDto.id,
      first_name: userDto.first_name,
      last_name: userDto.last_name,
      email: userDto.email,
      password_hash: userDto.password_hash,
      user_role_id: userDto.user_role_id,
    };

    const cleanedDbEntity = objectUtils.removeUndefined(dbEntity);

    return cleanedDbEntity;
  }
}

export default new UserMapper();

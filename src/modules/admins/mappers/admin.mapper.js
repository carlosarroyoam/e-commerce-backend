/* eslint-disable class-methods-use-this */

/**
 * Contains methods for mapping Admin entities.
 */
class AdminMapper {
    /**
     * Maps a admin object to a AdminDto object.
     *
     * @param {object} admin
     * @return {object} The admin dto object
     */
    toDto(admin) {
        return {
            id: admin.id,
            user_id: admin.user_id,
            first_name: admin.first_name,
            last_name: admin.last_name,
            email: admin.email,
            password: admin.password,
            is_super: admin.is_super,
            created_at: admin.created_at,
            updated_at: admin.updated_at,
            deleted_at: admin.deleted_at,
        };
    }

    /**
     * Maps a adminDto object to a Admin database entity object.
     *
     * @param {object} adminDto
     * @return {object} The admin database entity object
     */
    toDatabaseEntity(adminDto) {
        const adminDbEntity = {
            is_super: adminDto.is_super,
            user_id: adminDto.user_id,
        };

        Object.keys(adminDbEntity).forEach(
            (key) =>
                adminDbEntity[key] === undefined && delete adminDbEntity[key]
        );

        return adminDbEntity;
    }
}

module.exports = AdminMapper;

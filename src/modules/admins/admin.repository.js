const AdminDao = require('./admin.dao');
const AdminMapper = require('./mappers/admin.mapper');

class AdminRepository {
  constructor(connection) {
    this._adminDao = new AdminDao(connection);
    this._adminMapper = new AdminMapper();
  }

  async findAll() {
    const [result] = await this._adminDao.getAll();

    return result;
  }

  async findById(id) {
    const [result] = await this._adminDao.getById(id);

    return result[0];
  }

  async findTrashedById(userId) {
    const [result] = await this._adminDao.getTrashedById(userId);

    return result[0];
  }

  async findByEmail(email) {
    const [result] = await this._adminDao.getByEmail(email);

    return result[0];
  }

  async store(user) {
    const userDbEntity = this._adminMapper.toDatabaseEntity(user);

    const [result] = await this._adminDao.create(userDbEntity);

    return result.insertId;
  }

  async update(userId, user) {
    const userDbEntity = this._adminMapper.toDatabaseEntity(user);

    const [result] = await this._adminDao.update(userId, userDbEntity);

    return result.affectedRows;
  }

  async delete(userId) {
    const [result] = await this._adminDao.delete(userId);

    return result.affectedRows;
  }

  async restore(userId) {
    const [result] = await this._adminDao.restore(userId);

    return result.affectedRows;
  }
}

module.exports = AdminRepository;

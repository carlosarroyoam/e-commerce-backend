class UserRepository {
  constructor({ userDao }) {
    this._userDao = userDao;
  }

  async findAll() {
    const users = await this._userDao.getAll();

    return users;
  }

  async find(id) {
    const user = await this._userDao.getById(id);

    return user[0];
  }

  async findByEmail(email) {
    const user = await this._userDao.getByEmail(email);

    return user[0];
  }

  async store(user) {
    const createdUser = await this._userDao.create(user);

    return createdUser.insertId;
  }

  async update(userId, user) {
    const updatedUser = await this._userDao.update(userId, user);

    return updatedUser.affectedRows;
  }

  async delete(userId) {
    const deletedUser = await this._userDao.delete(userId);

    return deletedUser.affectedRows;
  }
}

module.exports = UserRepository;

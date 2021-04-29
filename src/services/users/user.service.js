class UserService {
  constructor({ userRepository }) {
    this._userRepository = userRepository;
  }

  async findAll() {
    const users = await this._userRepository.findAll()
      .then((result) => result)
      .catch((err) => err);

    return users;
  }

  async find(id) {
    const user = await this._userRepository.find(id)
      .then((result) => result)
      .catch((err) => err);

    return user;
  }
}

module.exports = UserService;

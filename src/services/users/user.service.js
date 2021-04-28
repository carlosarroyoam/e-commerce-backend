class UserService {
  constructor({ userRepository }) {
    this._userRepository = userRepository;
  }

  async findAll() {
    const users = await this._userRepository.findAll()
      .then((result) => result)
      .catch((err) => {
        console.error(err);
      });

    return users;
  }
}

module.exports = UserService;

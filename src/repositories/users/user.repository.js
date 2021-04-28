class UserRepository {
  constructor({ dbConnection }) {
    this._dbConnection = dbConnection;
  }

  findAll() {
    return new Promise((resolve, reject) => {
      this._dbConnection.getConnection().query('SELECT * FROM userss', (err, result) => {
        if (err) {
          reject(new Error('Error while retrieving users'));
        }

        resolve(result);
      });
    });
  }
}

module.exports = UserRepository;

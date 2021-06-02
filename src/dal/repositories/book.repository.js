class BookRepository {
  constructor({ dbConnection, logger }) {
    this._dbConnection = dbConnection.pool;
    this._logger = logger.instance;
  }

  async findAll() {
    const query = 'SELECT id, title FROM book';

    return this._dbConnection.query(query);
  }
}

module.exports = BookRepository;

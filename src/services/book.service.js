class BookService {
  constructor({ bookRepository }) {
    this._bookRepository = bookRepository;
  }

  async findAll() {
    const books = await this._bookRepository.findAll()
      .then((result) => result)
      .catch((err) => {
        console.error(err);
      });

    return books;
  }
}

module.exports = BookService;

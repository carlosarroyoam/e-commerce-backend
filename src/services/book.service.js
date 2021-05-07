class BookService {
  constructor({ bookRepository }) {
    this._bookRepository = bookRepository;
  }

  async findAll() {
    const books = await this._bookRepository.findAll();

    return books;
  }
}

module.exports = BookService;

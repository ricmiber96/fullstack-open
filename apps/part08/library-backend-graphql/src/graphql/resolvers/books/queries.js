const Book = require('../../../models/book.model')

const bookQueries = {
  bookCount: async () => Book.collection.countDocuments(),
  allBooks: async () => { return Book.find({}).populate('author') },
  findBookByAuthorOrGenre: async (root, args) => {
    if (args.author && args.genre) {
      const foundBooks = await Book.find({ genres: { $in: args.genre } }).populate({ path: 'author', match: { name: args.author } })
      return foundBooks
    } else if (args.author) {
      const foundBooks = await Book.find({}).populate({ path: 'author', match: { name: args.author } })
      return foundBooks
    } else if (args.genre) {
      const foundBooks = await Book.find({ genres: { $in: args.genre } })
      return foundBooks
    } else {
      return await Book.find({}).populate('author')
    }
  }
}

module.exports = bookQueries

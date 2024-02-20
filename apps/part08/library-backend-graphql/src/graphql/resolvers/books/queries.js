const Book = require('../../../models/book.model')
const Genre = require('../../../models/genre.model')
const Author = require('../../../models/author.model')

const bookQueries = {
  bookCount: async () => Book.collection.countDocuments(),
  allBooks: async () => { return await Book.find({}).populate('author').populate('genres') },
  findBookByAuthorOrGenre: async (root, args) => {
    if (args.author && args.genre) {
      const genreId = await Genre.findOne({ name: args.genre })
      const foundBooks = await Book.find({ genres: genreId }).populate({ path: 'author', match: { name: args.author } }).populate('genres')
      // const foundBooks = await Book.find({ genres: genreId, author: authorId }).populate({ path: 'author' }).populate('genres')
      return foundBooks
    } else if (args.author) {
      const foundBooks = await Book.find({}).populate({ path: 'author', match: { name: args.author } }).populate('genres')
      return foundBooks
    } else if (args.genre) {
      const genreId = await Genre.findOne({ name: args.genre })
      const foundBooks = await Book.find({ genres: genreId }).populate({ path: 'author' }).populate('genres')
      return foundBooks
    } else {
      return await Book.find({}).populate('author').populate('genres')
    }
  }
}

module.exports = bookQueries

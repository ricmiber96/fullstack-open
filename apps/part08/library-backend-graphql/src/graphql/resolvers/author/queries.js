const Author = require('../../../models/author.model')
const Book = require('../../../models/book.model')

const authorQueries = {
  authorCount: async () => Author.collection.countDocuments(),
  allAuthors: async () => { return Author.find({}) },
  findAuthorByName: async (root, args) => {
    const foundAuthor = await Author.find({ name: args.author })
    return foundAuthor
  },
  findAuthorWithBooksCounter: async (root, args) => {
    const foundAuthor = await Author.find({ name: args.author })
    console.log('foundAuthor', foundAuthor)
    const foundBooks = await Book.find({}).populate({ path: 'author', match: { name: args.author } })
    console.log('foundBooks', foundBooks.length)
    const bookCount = foundBooks.length
    return foundAuthor.map(author => ({ ...author._id, bookCount }))
  }
}

module.exports = authorQueries

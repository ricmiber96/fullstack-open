const Book = require('../../../models/book.model')
const Author = require('../../../models/author.model')
const { GraphQLError } = require('graphql')
const { PubSub } = require('graphql-subscriptions')

const pubsub = new PubSub()

const bookMutations = {
  addBook: async (root, args, context) => {
    const currentUser = context.currentUser
    if (!currentUser) {
      throw new GraphQLError('Not authenticated', {
        extensions: {
          code: 'UNAUTHENTICATED'
        }
      })
    } else {
      const existAuthor = await Author.findOne({ name: args.author })
      if (!existAuthor) {
        const newAuthor = new Author({ name: args.author })
        try {
          await newAuthor.save()
        } catch (error) {
          throw new GraphQLError('Error saving author', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args,
              error: error.message
            }
          })
        }
      }
      const foundAuthor = await Author.findOne({ name: args.author })
      const bookExists = await Book.findOne({ title: args.title })
      if (bookExists) {
        throw new GraphQLError('Book already exists', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
            error: 'Book already exists'
          }
        })
      }

      const book = new Book({ ...args, author: foundAuthor })

      try {
        await book.save()
        foundAuthor.books = foundAuthor.books.concat(book.id)
        await foundAuthor.save()
        const newBook = await Book.findById(book.id).populate('author')
        pubsub.publish('BOOK_ADDED', { bookAdded: newBook })
      } catch (error) {
        throw new GraphQLError('Error saving book', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
            error: error.message
          }
        })
      }
      return book
    }
  }
}

module.exports = bookMutations

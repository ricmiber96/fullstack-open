const Book = require('../../../models/book.model')
const Author = require('../../../models/author.model')
const Genre = require('../../../models/genre.model')
const { GraphQLError } = require('graphql')
const { PubSub } = require('graphql-subscriptions')

const pubsub = new PubSub()

const bookMutations = {
  addBook: async (root, args, context) => {
    console.log('**********addBook**********')
    console.log('args', args)
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

      const genresInBook = args.genres
      console.log('genresInBook', genresInBook)
      // const arrayGenresIds = []
      // genresInBook.forEach(async (genre) => {
      //   const existGenre = await Genre.findOne({ name: genre })
      //   console.log('existGenre', existGenre)
      //   if (!existGenre) {
      //     const newGenre = new Genre({ name: genre })
      //     try {
      //       await newGenre.save()
      //     } catch (error) {
      //       throw new GraphQLError('Error saving genre', {
      //         extensions: {
      //           code: 'BAD_USER_INPUT',
      //           invalidArgs: args,
      //           error: error.message
      //         }
      //       })
      //     }
      //     console.log('findNewGenere', newGenre.id)
      //     arrayGenresIds.push(newGenre.id)
      //   } else {
      //     console.log('existGenre.id', existGenre.id)
      //     arrayGenresIds.push(existGenre.id)
      //   }
      // })
      // console.log('arrayGenresIds', arrayGenresIds)
      // const addingGenresToBook = async (genre, args) => {
      //   console.log('genre', genre)
      //   let genreId = ''
      //   const existGenre = await Genre.findOne({ name: genre })
      //   if (!existGenre) {
      //     const newGenre = new Genre({ name: genre })
      //     try {
      //       await newGenre.save()
      //     } catch (error) {
      //       throw new GraphQLError('Error saving genre', {
      //         extensions: {
      //           code: 'BAD_USER_INPUT',
      //           invalidArgs: args,
      //           error: error.message
      //         }
      //       })
      //     }
      //     genreId = newGenre.id
      //   } else {
      //     genreId = existGenre.id
      //   }

      //   console.log('genreId', genreId)
      //   return genreId
      // }

      const genreIds = await Promise.all(
        genresInBook.map(async (genreName) => {
          let genre = await Genre.findOne({ name: genreName })

          // If the genre doesn't exist, create a new one
          if (!genre) {
            genre = new Genre({ name: genreName })
            await genre.save()
          }

          return genre._id
        })
      )

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

      const book = new Book({ ...args, author: foundAuthor, genres: genreIds })

      try {
        await book.save()
        foundAuthor.books = foundAuthor.books.concat(book.id)
        await foundAuthor.save()
        const newBook = await Book.findById(book.id).populate('author').populate('genres')
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
      const findNewBook = await Book.findById(book.id).populate('author').populate('genres')
      return findNewBook
    }
  }
}

module.exports = bookMutations

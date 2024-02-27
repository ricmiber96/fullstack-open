// const { ApolloServer } = require('@apollo/server')
// const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
// const { expressMiddleware } = require('@apollo/server/express4')
// const { makeExecutableSchema } = require('@graphql-tools/schema')
// const { PubSub } = require('graphql-subscriptions')
// const mongoose = require('mongoose')

// const { v1: uuid } = require('uuid')
// const Book = require('./models/book.model')
// const Author = require('./models/author.model')
// const User = require('./models/user.model')
// require('dotenv').config()
// mongoose.set('strictQuery', false)
// const pubsub = new PubSub()

// const express = require('express')
// const cors = require('cors')
// const http = require('http')
// const jwt = require('jsonwebtoken')

// const { typeDefs } = require('./graphql/typedefs/typedefs')
// const { resolvers } = require('./graphql/resolvers/resolver')

// const authors = [
//   {
//     name: 'Robert Martin',
//     id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
//     born: 1952
//   },
//   {
//     name: 'Martin Fowler',
//     id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
//     born: 1963
//   },
//   {
//     name: 'Fyodor Dostoevsky',
//     id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
//     born: 1821
//   },
//   {
//     name: 'Joshua Kerievsky', // birthyear not known
//     id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e'
//   },
//   {
//     name: 'Sandi Metz', // birthyear not known
//     id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e'
//   }
// ]

// const books = [
//   {
//     title: 'Clean Code',
//     published: 2008,
//     author: 'Robert Martin',
//     id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
//     genres: ['refactoring']
//   },
//   {
//     title: 'Agile software development',
//     published: 2002,
//     author: 'Robert Martin',
//     id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
//     genres: ['agile', 'patterns', 'design']
//   },
//   {
//     title: 'Refactoring, edition 2',
//     published: 2018,
//     author: 'Martin Fowler',
//     id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
//     genres: ['refactoring']
//   },
//   {
//     title: 'Refactoring to patterns',
//     published: 2008,
//     author: 'Joshua Kerievsky',
//     id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
//     genres: ['refactoring', 'patterns']
//   },
//   {
//     title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
//     published: 2012,
//     author: 'Sandi Metz',
//     id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
//     genres: ['refactoring', 'design']
//   },
//   {
//     title: 'Crime and punishment',
//     published: 1866,
//     author: 'Fyodor Dostoevsky',
//     id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
//     genres: ['classic', 'crime']
//   },
//   {
//     title: 'The Demon ',
//     published: 1872,
//     author: 'Fyodor Dostoevsky',
//     id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
//     genres: ['classic', 'revolution']
//   }
// ]

// const typeDefs = `
//   type Query {
//     bookCount: Int!
//     authorCount: Int!
//     allBooks: [Book!]!
//     allAuthors: [Author!]!
//     findAuthorWithBooksCounter(author: String!): [Author!]!
//     findAuthorByName(author: String!): [Author!]!
//     findBookByGenre(genre: String!): [Book!]!
//     findBookByAuthorOrGenre(author: String, genre: String): [Book!]!
//   }
//   type ID {
//     value: String!
//   }
//   type Book {
//     title: String!
//     published: Int!
//     author: Author!
//     genres: [String!]!
//     id: ID!
// }
//  type Author {
//     name: String!
//     id: ID!
//     born: Int
//     bookCount: Int
//  }

//     type Mutation {
//         addBook(
//             title: String!
//             published: Int!
//             author: String!
//             genres: [String!]!
//         ): Book
//         editAuthor(
//             name: String!
//             setBornTo: Int!
//         ): Author
//     }

// `

// const resolvers = {
//   Query: {
//     bookCount: async () =>  Book.collection.countDocuments(),
//     authorCount: async () => Author.collection.countDocuments(),
//     allBooks: async () => { return Book.find({}) },
//     allAuthors: async () => { return Author.find({}) },
//     findBookByAuthorOrGenre: async(root, args) => {
//         if (args.author && args.genre) {
//             const foundBooks = await Book.find({genres:{ $in: args.genre }}).populate({ path: 'author', match: { name: args.author } })
//             return foundBooks
//         }else if (args.author) {
//             const foundBooks = await Book.find({}).populate({ path: 'author', match: { name: args.author } })
//             return foundBooks
//         }
//         else if (args.genre) {
//             const foundBooks = await Book.find({genres:{ $in: args.genre }})
//             return foundBooks
//         } else {
//           return await Book.find({}).populate('author')
//         }
//     },
//     findAuthorByName: async(root, args) => {
//       const foundAuthor = await Author.find({ name: args.author })
//       return foundAuthor
//     },
//     findAuthorWithBooksCounter: async (root, args) => {
//       const foundAuthor =  await Author.find({ name: args.author })
//       console.log('foundAuthor', foundAuthor)
//       const foundBooks = await Book.find({}).populate({ path: 'author', match: { name: args.author } })
//       console.log('foundBooks', foundBooks.length)
//       const bookCount = foundBooks.length
//       return foundAuthor.map(author => ({
//         ...author._id , bookCount }))
//     },
//   },
//   Mutation: {
//     addBook: async (root, args) => {
//       const existAuthor = await Author.findOne({ name: args.author })
//       if (!existAuthor) {
//         const newAuthor = new Author({ name: args.author })
//        try {
//         await newAuthor.save()
//        } catch (error) {
//           throw new GraphQLError('Error saving author',{
//             extensions: {
//               code: 'BAD_USER_INPUT',
//               invalidArgs: args,
//               error: error.message
//             }
//           })
//       }
//     }
//       const foundAuthor = await Author.findOne({ name: args.author })
//       const bookExists = await Book.findOne({ title: args.title })
//       if (bookExists) {
//         throw new GraphQLError('Book already exists',{
//           extensions: {
//             code: 'BAD_USER_INPUT',
//             invalidArgs: args,
//             error: 'Book already exists'
//           }
//         })
//       }

//       const book = new Book({ ...args, author: foundAuthor})

//       try {
//         await book.save()
//         foundAuthor.books = foundAuthor.books.concat(book.id)
//         await foundAuthor.save()
//         const newBook = await Book.findById(book.id).populate('author')
//         pubsub.publish('BOOK_ADDED', { bookAdded: newBook })
//       } catch (error) {
//         throw new GraphQLError('Error saving book',{
//           extensions: {
//             code: 'BAD_USER_INPUT',
//             invalidArgs: args,
//             error: error.message
//           }
//         })
//       }
//       return book
//     },
//     editAuthor: async (root, args) => {
//         const author = await Author.findOne({ name: args.name })
//         if(!author) {
//           return null
//         }else {
//           author.born = args.setBornTo
//           try {
//             await author.save()
//           } catch (error) {
//             throw new GraphQLError('Error saving author',{
//               extensions: {
//                 code: 'BAD_USER_INPUT',
//                 invalidArgs: args,
//                 error: error.message
//               }
//             })
//         }
//         return author
//       }
//     }
//   },
// }

// const MONGO_DB_URI = process.env.MONGO_DB_URI
// console.log('connecting to', MONGO_DB_URI)

// mongoose.connect(MONGO_DB_URI)
//   .then(() => {
//     console.log(`Connected to MongoDB at ${MONGO_DB_URI}`)
//   })
//   .catch((error) => {
//     console.log('Error connecting to MongoDB:', error.message)
//   }
//   )

// mongoose.set('debug', true)

// const server = new ApolloServer({
//   typeDefs,
//   resolvers
// })

// const start = async () => {
//   const app = express()
//   const httpServer = http.createServer(app)

//   const server = new ApolloServer({
//     schema: makeExecutableSchema({ typeDefs, resolvers }),
//     plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
//   })

//   await server.start()

//   app.use(
//     '/',
//     cors(),
//     expressMiddleware(server, {
//       context: async ({ req, res }) => {
//         const auth = req ? req.headers.authorization : null
//         if (auth && auth.startsWith('Bearer ')) {
//           const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET_KEY)
//           console.log('decodedToken', decodedToken)
//           const currentUser = await User.findById(decodedToken.id)
//           return { currentUser }
//         }
//       }
//     }))

//   httpServer.listen(4000, () => {
//     console.log('Server ready at http://localhost:4000')
//   }
//   )
// }

// module.exports = { start }

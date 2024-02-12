const { ApolloServer } = require('@apollo/server')
const mongoose = require('mongoose')
const { v1: uuid } = require('uuid')
const Book = require('./models/book.model')
const Author = require('./models/author.model')
require('dotenv').config()
mongoose.set('strictQuery', false)

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

/*
  you can remove the placeholder query once your first one has been implemented
*/




const typeDefs = `
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks: [Book!]!
    allAuthors: [Author!]!
    findAuthor(author: String!): [Author!]!
    findBookByGenre(genre: String!): [Book!]!
    findBookByAuthorOrGenre(author: String!, genre: String!): [Book!]!
  }
  type ID {
    value: String!
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
}
 type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
 }

    type Mutation {
        addBook(
            title: String!
            published: Int!
            author: String!
            genres: [String!]!
        ): Book
        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author
    }

`

const resolvers = {
  Query: {
    bookCount: async () =>  Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async () => { return Book.find({}).populate('author') },
    allAuthors: async () => { return Author.find({}) },
    // () => authors.map(author => {
    //     const bookCount = books.filter(book => book.author === author.name).length
    //   return { ...author, bookCount }
    // }),
    findBookByGenre: (root, args) => {
      const booksFiltered = books.filter(book => book.genres.includes(args.genre))
      return booksFiltered
    },
    findBookByAuthorOrGenre: (root, args) => {
        const booksFiltered = books.filter(book => book.author === args.author || book.genres.includes(args.genre))
        return booksFiltered
    },
    findAuthor: async (root, args) => { 
      const foundAuthor =  await Author.find({ name: args.author }) 
      console.log('foundAuthor', foundAuthor)
      const foundBooks = await Book.find({}).populate({ path: 'author', match: { name: args.author } })
      console.log('foundBooks', foundBooks.length)
      const bookCount = foundBooks.length
      return foundAuthor.map(author => ({ 
        ...author._id , bookCount }))
    },
      // (root, args) => {
      //  const booksFiltered = books.filter(book => book.author === args.author)
      //  return booksFiltered
      // },
  },
  Mutation: {
    addBook: (root, args) => {
        const book = { ...args, id: uuid() }
        books = books.concat(book)
        if (!authors.find(author => author.name === args.author)) {
            authors = authors.concat({ name: args.author, id: uuid() })
        }
        return book
    },
    editAuthor: (root, args) => {
        const author = authors.find(author => author.name === args.name)
        if (!author) {
            return null
        }
        const updatedAuthor = { ...author, born: args.setBornTo }
        authors = authors.map(author => author.name === args.name ? updatedAuthor : author)
        return updatedAuthor
    }
  },
}


const MONGO_DB_URI = process.env.MONGO_DB_URI
console.log('connecting to', MONGO_DB_URI)

mongoose.connect(MONGO_DB_URI,)
  .then(() => {
    console.log(`Connected to MongoDB at ${MONGO_DB_URI}`)
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message)
  }
)

mongoose.set('debug', true);


const server = new ApolloServer({
  typeDefs,
  resolvers,
})

module.exports = { server }
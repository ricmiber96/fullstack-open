db = db.getSiblingDB('libraryDB')
db.createCollection('books')
db.createCollection('authors')
db.createCollection('genres')
// db.books.insertMany([
//   {
//     title: 'Clean Code',
//     published: 2008,
//     author: {
//       name: 'Robert Martin',
//       born: 1952
//     },
//     genres: ['refactoring']
//   }
// ])

const authorId = db.authors.insertOne({
  name: 'John Doe',
  born: 1980
}).insertedId

const genreIds = db.genres.insertMany([
  { name: 'Fiction' },
  { name: 'Mystery' },
  { name: 'Sci-Fi' }
]).insertedIds

db.books.insertMany([
  {
    title: 'Book 1',
    published: 2022,
    author: authorId,
    genres: [
      genreIds[0], genreIds[1]
    ]
  },
  {
    title: 'Book 2',
    published: 2023,
    author: authorId,
    genres: [
      genreIds[1]
    ]
  },
  {
    title: 'Book 3',
    published: 2021,
    author: authorId,
    genres: [
      genreIds[2]
    ]
  }
])

// Verify the inserted documents
db.books.find().pretty()

// db.authors.insertMany([
//   {
//     name: 'Robert Martin',
//     born: 1952
//   }
// ])

// const MongoClient = require('mongodb').MongoClient

// const uri = 'mongodb://localhost:27017/libraryDB'

// const initDB = async () => {
//     console.log('initDB')
//     const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
//     try {
//         await client.connect()
//         const db = client.db('libraryDB')
//         const authors = db.collection('authors')
//         const books = db.collection('books')

//         const author = new Author({
//             name: 'Robert Martin',
//             born: 1952
//         })

//         author.save().then(savedAuthor => {

//             const book = new Book({
//                 title: 'Clean Code',
//                 published: 2007,
//                 author: savedAuthor._id,
//                 genres: ['refactoring']
//             })

//             book.save().then(savedBook => {
//                 console.log('savedAuthor', savedAuthor)
//                 console.log('savedBook', savedBook)

//             }).catch(error => {
//                 console.error(error)
//             })
//         }).catch(error => {
//             console.error(error)
//         })
//     } catch (error) {
//         console.error(error)
//     } finally {
//         await client.close()
//     }

// initDB()

// let authors = [
//     {
//       name: 'Robert Martin',
//       id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
//       born: 1952,
//     },
//     {
//       name: 'Martin Fowler',
//       id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
//       born: 1963
//     },
//     {
//       name: 'Fyodor Dostoevsky',
//       id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
//       born: 1821
//     },
//     {
//       name: 'Joshua Kerievsky', // birthyear not known
//       id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
//     },
//     {
//       name: 'Sandi Metz', // birthyear not known
//       id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
//     },
//   ]

//   let books = [
//     {
//       title: 'Clean Code',
//       published: 2008,
//       author: 'Robert Martin',
//       id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
//       genres: ['refactoring']
//     },
//     {
//       title: 'Agile software development',
//       published: 2002,
//       author: 'Robert Martin',
//       id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
//       genres: ['agile', 'patterns', 'design']
//     },
//     {
//       title: 'Refactoring, edition 2',
//       published: 2018,
//       author: 'Martin Fowler',
//       id: "afa5de00-344d-11e9-a414-719c6709cf3e",
//       genres: ['refactoring']
//     },
//     {
//       title: 'Refactoring to patterns',
//       published: 2008,
//       author: 'Joshua Kerievsky',
//       id: "afa5de01-344d-11e9-a414-719c6709cf3e",
//       genres: ['refactoring', 'patterns']
//     },
//     {
//       title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
//       published: 2012,
//       author: 'Sandi Metz',
//       id: "afa5de02-344d-11e9-a414-719c6709cf3e",
//       genres: ['refactoring', 'design']
//     },
//     {
//       title: 'Crime and punishment',
//       published: 1866,
//       author: 'Fyodor Dostoevsky',
//       id: "afa5de03-344d-11e9-a414-719c6709cf3e",
//       genres: ['classic', 'crime']
//     },
//     {
//       title: 'The Demon ',
//       published: 1872,
//       author: 'Fyodor Dostoevsky',
//       id: "afa5de04-344d-11e9-a414-719c6709cf3e",
//       genres: ['classic', 'revolution']
//     },
//   ]

// db.authors.insert(authors)
// db.books.insert(books)

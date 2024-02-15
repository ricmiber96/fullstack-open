const typeDefs = `
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks: [Book!]!
    allAuthors: [Author!]!
    allGenres: [Genre!]!
    findAuthorWithBooksCounter(author: String!): [Author!]!
    findAuthorByName(author: String!): [Author!]!
    findBookByAuthorOrGenre(author: String, genre: String): [Book!]!
    allUsers: [User!]!
    me: User
  }
  type ID {
    value: String!
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [Genre!]!
    id: ID!
}

type Genre {
    name: String!
    id: ID!
}

 type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
 }

 type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
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
        createUser(
          username: String!
          favoriteGenre: String!
        ): User
        login(
          username: String!
          password: String!
        ): Token
    }

`

module.exports = { typeDefs }

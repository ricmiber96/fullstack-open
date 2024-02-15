const { authorMutations, authorQueries } = require('./author')
const { bookMutations, bookQueries } = require('./books')
const { authQueries, authMutations } = require('./auth')
const { genreQueries } = require('./generes')

const resolvers = {
  Query: {
    ...bookQueries,
    ...authorQueries,
    ...authQueries,
    ...genreQueries
  },
  Mutation: {
    ...bookMutations,
    ...authorMutations,
    ...authMutations
  }
}

module.exports = { resolvers }

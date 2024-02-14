const { authorMutations, authorQueries } = require('./author')
const { bookMutations, bookQueries } = require('./books')
const { authQueries, authMutations } = require('./auth')

const resolvers = {
  Query: {
    ...bookQueries,
    ...authorQueries,
    ...authQueries
  },
  Mutation: {
    ...bookMutations,
    ...authorMutations,
    ...authMutations
  }
}

module.exports = { resolvers }

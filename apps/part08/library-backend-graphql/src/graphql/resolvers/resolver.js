const { authorMutations, authorQueries } = require('./author')
const { bookMutations, bookQueries, bookSubscriptions } = require('./books')
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
  },
  Subscription: {
    ...bookSubscriptions
  }
}

module.exports = { resolvers }

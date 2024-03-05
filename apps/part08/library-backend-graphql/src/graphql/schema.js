const { resolvers } = require('./resolvers/resolver')
const { typeDefs } = require('./typedefs/typedefs')
const { makeExecutableSchema } = require('@graphql-tools/schema')

const schema = makeExecutableSchema({ typeDefs, resolvers })

module.exports = schema

const { ApolloServer } = require('apollo-server-express')
const { env } = require('../config/environment/index')
const schema = require('./schema')

const apolloServer = new ApolloServer({
  schema
})

module.exports = {
  apolloServer
}

const { ApolloServer } = require('@apollo/server')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { expressMiddleware } = require('@apollo/server/express4')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')
const express = require('express')
const http = require('http')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const User = require('./models/user.model')
const schema = require('./graphql/schema')

const setupApolloServer = async (app) => {
  const httpServer = http.createServer(app)
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/'
  })

  const serverCleanup = useServer({ schema }, wsServer)

  const apolloServer = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart () {
          return {
            async drainServer () {
              await serverCleanup.dispose()
            }
          }
        }
      }
    ]
  })
  await apolloServer.start()
  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req, res }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
          const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET_KEY)
          //   console.log('decodedToken', decodedToken)
          const currentUser = await User.findById(decodedToken.id)
          return { currentUser }
        }
      }
    }))

  const PORT = process.env.PORT || 4000
  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  )

  return { apolloServer, httpServer }
}

module.exports = setupApolloServer

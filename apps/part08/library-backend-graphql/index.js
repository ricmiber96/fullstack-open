// const { server } = require('./src/app')
// const { startStandaloneServer } = require('@apollo/server/standalone')
// const jwt = require('jsonwebtoken')
// const User = require('./src/models/user.model')
// const { start } = require('./src/app')

// // startStandaloneServer(server, {
// //   listen: { port: 4000 },
// //   context: async ({ req, res }) => {
// //     const auth = req ? req.headers.authorization : null
// //     if (auth && auth.startsWith('Bearer ')) {
// //       const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET_KEY)
// //       console.log('decodedToken', decodedToken)
// //       const currentUser = await User.findById(decodedToken.id)
// //       return { currentUser }
// //     }
// //   }
// // }).then(({ url }) => {
// //   console.log(`Server ready at ${url}`)
// // })

// start()

// const { ApolloServer } = require('@apollo/server')
// const { expressMiddleware } = require('@apollo/server/express4')
// const { ApolloServerPluginDrainHttpServer } =
// require('@apollo/server/plugin/drainHttpServer')
// const { makeExecutableSchema } = require('@graphql-tools/schema')
// const express = require('express')
// const cors = require('cors')
// const http = require('http')
// const jwt = require('jsonwebtoken')
// const { WebSocketServer } = require('ws')
// const { useServer } = require('graphql-ws/lib/use/ws')

// const mongoose = require('mongoose')
// mongoose.set('strictQuery', false)

// const User = require('./src/models/user.model')

// const { typeDefs } = require('./src/graphql/typedefs/typedefs')
// const { resolvers } = require('./src/graphql/resolvers/resolver')

// require('dotenv').config()

// const MONGO_DB_URI = process.env.MONGO_DB_URI

// console.log('connecting to', MONGO_DB_URI)

// mongoose.connect(MONGO_DB_URI)
//   .then(() => {
//     console.log('connected to MongoDB')
//   })
//   .catch((error) => {
//     console.log('error connection to MongoDB:', error.message)
//   })

// mongoose.set('debug', true)

// const start = async () => {
//   const app = express()
//   const httpServer = http.createServer(app)

//   const wsServer = new WebSocketServer({
//     server: httpServer,
//     path: '/'
//   })

//   const schema = makeExecutableSchema({ typeDefs, resolvers })
//   const serverCleanup = useServer({ schema }, wsServer)

//   const server = new ApolloServer({
//     schema,
//     plugins: [
//       ApolloServerPluginDrainHttpServer({ httpServer }),
//       {
//         async serverWillStart () {
//           return {
//             async drainServer () {
//               await serverCleanup.dispose()
//             }
//           }
//         }
//       }
//     ]
//   })

//   await server.start()

//   app.use(
//     '/',
//     cors(),
//     express.json(),
//     expressMiddleware(server, {
//       context: async ({ req }) => {
//         const auth = req ? req.headers.authorization : null

//         if (auth && auth.startsWith('Bearer ')) {
//           const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET_KEY)

//           const currentUser = await User.findById(decodedToken.id)

//           return { currentUser }
//         }
//       }
//     })
//   )

//   app.use(express.static('build'))

//   const PORT = 4000

//   httpServer.listen(PORT, () =>
//     console.log(`Server is now running on http://localhost:${PORT}`)
//   )
// }

// start()
const { SubscriptionServer } = require('subscriptions-transport-ws')
const { port } = require('./src/config/environment/index')
const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const setupApolloServer = require('./src/app')
require('dotenv').config()

const MONGO_DB_URI = process.env.MONGO_DB_URI
console.log('connecting to', MONGO_DB_URI)

mongoose.connect(MONGO_DB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const startServer = async () => {
  const app = express()

  // const { server, httpServer } = await setupApolloServer(app)
  await setupApolloServer(app)
  // const httpServerInstance = http.createServer(app)
  // const PORT = process.env.PORT || 4000

  // httpServerInstance.listen(PORT, () => {
  //   console.log(`Server ready at http://localhost:${PORT}`)
  // })
}

startServer()

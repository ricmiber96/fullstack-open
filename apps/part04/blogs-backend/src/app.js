const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogRouter = require('./controllers/blog.controller')
const userRouter = require('./controllers/user.controller')
const loginRouter = require('./controllers/login.controller')

// async function dbConnect () {
//   try {
//     await mongoose.connect(config.MONGO_DB_URI)
//     logger.info(`Connecting to ${config.MONGO_DB_URI}`)
//   } catch (err) {
//     logger.error('Error connecting to MongoDB:', err.message)
//   } finally {
//     logger.info('Closing MongoDB connection')
//     await mongoose.connection.close()
//   }
// }

// dbConnect()

mongoose.connect(config.MONGO_DB_URI)
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((err) => {
    logger.error('Error connecting to MongoDB:', err.message)
  })

// mongoose.connect(config.MONGO_DB_URI)
//   .then(() => {
//     logger.info('Connected to MongoDB')
//   })
//   .catch((err) => {
//     logger.error('Error connecting to MongoDB:', err.message)
//   })
//   .finally(() => {
//     logger.info('Closing MongoDB connection')
//     mongoose.connection.close()
//   })

// process.on('uncaughtException', (err) => {
//   logger.error('Uncaught exception:', err.message)
//   mongoose.connection.close()
// })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.errorHandler)
app.use(middleware.tokenExtractor)
app.use('/api/login', loginRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)

if (process.env.NODE_ENV === 'dev') {
  const testingRouter = require('./controllers/testing.controller')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)

module.exports = app

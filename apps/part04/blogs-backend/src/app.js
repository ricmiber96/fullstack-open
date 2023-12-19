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

logger.info(`Connecting to ${config.MONGO_DB_URI}`)

mongoose.connect(config.MONGO_DB_URI)
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((err) => {
    logger.error('Error connecting to MongoDB:', err.message)
  })

process.on('uncaughtException', (err) => {
  logger.error('Uncaught exception:', err.message)
  mongoose.connection.close()
})

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use('/api/login', loginRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app

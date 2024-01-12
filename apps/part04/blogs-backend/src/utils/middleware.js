const logger = require('./logger')
const jwt = require('jsonwebtoken')
const config = require('./config')
const User = require('../models/user.model')
const { request } = require('../app')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:', request.path)
  logger.info('Body:', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: error.message })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  }
  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    // The substring(7) method is used to remove the first 7 characters from the string, which in this case is 'bearer '.
    request.token = authorization.replace('Bearer ', '')
  } else {
    request.token = null
  }
  next()
}

const userExtractor = async (request, response, next) => {
  const authorization = request.header('Authorization')
  console.log('authorization:', authorization)
  const token = authorization.replace('Bearer ', '')
  console.log('token:', token)
  const decodedToken = jwt.verify(token, config.SECRET)
  console.log('decodedToken:', decodedToken)
  if (!decodedToken || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  request.user = user
  next()
}

const authenticateToken = (request, response, next) => {
  const authorization = request.header('Authorization')

  const token = authorization.replace('Bearer ', '')

  console.log('token:', token)

  if (!token) {
    return response.status(401).json({ error: 'token missing' })
  }
  const decodedToken = jwt.verify(token, config.SECRET)
  if (!decodedToken || !decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  console.log('decodedToken:', decodedToken)
  const { id } = decodedToken
  const userId = id
  request.userId = userId
  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
  authenticateToken
}

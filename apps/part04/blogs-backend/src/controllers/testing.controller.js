const testingRouter = require('express').Router()
const Blog = require('../models/blog.model')
const User = require('../models/user.model')

testingRouter.post('/reset', async (req, res) => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  console.log('cleared')
  res.status(204).end()
})

module.exports = testingRouter

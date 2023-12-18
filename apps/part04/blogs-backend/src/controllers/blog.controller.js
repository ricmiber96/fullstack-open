const Blog = require('../models/blog.model')
const blogRouter = require('express').Router()

blogRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogRouter.post('/', (req, res) => {
  // Extract the data from the request body
  const { title, author, url, likes } = req.body
  const newBlog = new Blog({
    title,
    author,
    url,
    likes
  })
  newBlog
    .save()
    .then(result => {
      res.status(201).json(result)
    })
})

module.exports = blogRouter

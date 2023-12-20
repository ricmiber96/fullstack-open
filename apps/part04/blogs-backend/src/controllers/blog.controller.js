const Blog = require('../models/blog.model')
const User = require('../models/user.model')
const config = require('../utils/config')
const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

const getTokenFrom = req => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    // Return the token without the bearer prefix
    return authorization.substring(7)
  }
  return null
}

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})
// Get all blogs from expecified user
// blogRouter.get('/user', middleware.userExtractor, async (req, res) => {
//   try {
//     const userId = req.user.id
//     const blogs = await Blog.find({ user: userId }).populate('user', { username: 1, name: 1 })
//     res.json(blogs)
//   } catch (error) {
//     res.status(404).end()
//   }
// })

blogRouter.get('/:id', async (req, res) => {
  const id = req.params.id
  try {
    const blog = await Blog.findById(id)
    res.json(blog)
  } catch (error) {
    res.status(404).end()
  }
})

blogRouter.post('/', async (req, res) => {
  // Extract the data from the request body
  const { title, author, url, likes } = req.body
  // Get the token from the request
  // const token = getTokenFrom(req)
  // Decode the token to get the user id
  // const decodedToken = jwt.verify(req.token, config.SECRET)
  // if (!decodedToken || !decodedToken.id) {
  //   return res.status(401).json({ error: 'token missing or invalid' })
  // }
  // Get the user from the database
  const user = req.user

  if (!user) {
    return res.status(401).json({ error: 'invalid user' })
  }
  if (!title || !url) {
    return res.status(400).json({
      error: 'title or url missing'
    }).end()
  } else {
    const newBlog = await Blog({
      title,
      author,
      url,
      likes: likes || 0,
      user: user._id
    }).save()
    user.blogs = user.blogs.concat(newBlog._id)
    await user.save()
    res.status(201).json(newBlog)
  }
})

blogRouter.put('/:id', async (req, res) => {
  const id = req.params.id
  const { title, author, url, likes } = req.body
  const updateBlog = {
    title,
    author,
    url,
    likes
  }
  const user = req.user
  try {
    if (!user) {
      return res.status(401).json({ error: 'invalid user' })
    }
    const updatedBlog = await Blog.findByIdAndUpdate(id, updateBlog, { new: true })
    res.json(updatedBlog)
  } catch (error) {
    res.status(404).end()
  }
})

blogRouter.delete('/:id', async (req, res) => {
  const id = req.params.id
  const user = req.user
  try {
    if (!user) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }
    const deletedBlog = await Blog.findById(id)
    console.log(deletedBlog.user.toString(), user.id.toString())
    if (deletedBlog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndDelete(id)
      res.status(204).end()
    } else {
      return res.status(401).json({ error: 'invalid user' })
    }
  } catch (error) {
    return res.status(404).end()
  }
})

module.exports = blogRouter

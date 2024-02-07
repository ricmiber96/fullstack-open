const commentsRouter = require('express').Router()
const Comment = require('../models/comment.model')
const Blog = require('../models/blog.model')

commentsRouter.get('/:id/comments', async (req, res) => {
  const id = req.params.id
  const comments = await Comment.find({ blog: id })
  res.json(comments)
})

commentsRouter.post('/:id/comments', async (req, res) => {
  const id = req.params.id
  const { content } = req.body
  console.log('id:', id, req.body)
  console.log('content:', content)
  const blog = await Blog.findById(id)
  console.log('blog:', blog)
  const comment = new Comment({
    content,
    blog: blog._id
  })
  if (!content) {
    console.log('content missing')
    return res.status(400).end().json({ error: 'content missing' })
  } else {
    const newComment = await comment.save()
    blog.comments = blog.comments.concat(newComment._id)
    await blog.save()
    res.status(201).json(newComment)
  }
})

module.exports = commentsRouter

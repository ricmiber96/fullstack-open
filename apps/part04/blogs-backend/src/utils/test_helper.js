const Blog = require('../models/blog.model')
const User = require('../models/user.model')
const initialBlogs = [
  {
    _id: '65803b6b19b46112101bfda2',
    title: 'My First Blog Post',
    author: 'John Doe',
    url: 'https://example.com/my-first-blog-post',
    likes: 10,
    __v: 0
  },
  {
    _id: '65803b8419b46112101bfda5',
    title: 'My Second Blog Post',
    author: 'John Doe',
    url: 'https://example.com/my-first-blog-post',
    likes: 20,
    __v: 0
  }
]

const resetDatabase = async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const loginAnUser = async (api, user) => {
  const response = await api
    .post('/api/login')
    .send(user)
  return response.body.token
}

module.exports = { initialBlogs, loginAnUser, resetDatabase, usersInDb }

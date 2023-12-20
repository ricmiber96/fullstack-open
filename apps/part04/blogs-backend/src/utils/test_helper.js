const Blog = require('../models/blog.model')
const User = require('../models/user.model')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

const resetDatabase = async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})
  const passwordHash = await bcrypt.hash('secret', 10)
  const user = new User({
    username: 'root',
    name: 'Superuser',
    blogs: [],
    passwordHash
  })
  await user.save()
  const users = await usersInDb()
  const newUser = users[0]
  const newBlogs = initialBlogs.map(b => ({ ...b, user: { username: newUser.username, name: newUser.name } }))
  await Blog.create(initialBlogs)
  await Blog.insertMany(initialBlogs)
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const loginAnUser = async (api) => {
  const user = {
    username: 'root',
    password: 'secret'
  }
  const response = await api
    .post('/api/login')
    .send(user)
  return response.body
}

const connectToMongoDB = async () => {
  // try {
  //   await mongoose.connect('mongodb://mongo/BlogDB')
  //   console.log('Connected to MongoDB')
  // } catch (error) {
  //   console.error('Failed to connect to MongoDB:', error)
  // }
}

module.exports = { initialBlogs, blogsInDb, loginAnUser, resetDatabase, usersInDb, connectToMongoDB }

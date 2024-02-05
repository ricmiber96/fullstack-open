const User = require('../models/user.model')
const userRouter = require('express').Router()
const bcrypt = require('bcrypt')

userRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1 })
  res.json(users)
})

userRouter.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id).populate('blogs', { url: 1, title: 1, author: 1, id: 1 })
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

userRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body
  const userExist = await User.findOne({ username })
  if (userExist) {
    return res.status(400).json({
      error: 'username already exists'
    }).end()
  } else if (!username || !password) {
    return res.status(400).json({
      error: 'username or password missing'
    }).end()
  } else if (username.length < 3 || password.length < 3) {
    return res.status(400).json({
      error: 'user and password must be at least 3 characters long'
    }).end()
  } else {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const newUser = await User({
      username,
      name,
      passwordHash
    }).save()
    res.status(201).json(newUser)
  }
})

module.exports = userRouter

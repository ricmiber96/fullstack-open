const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user.model')
const config = require('../utils/config')

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)
  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  } else {
    const userForToken = {
      username: user.username,
      id: user._id
    }
    // The token expires in 1 hour with the expiresIn parameter
    const token = jwt.sign(userForToken, config.SECRET, { expiresIn: 60 * 60 })
    res.status(200).send({ token, username: user.username, name: user.name })
  }
})

module.exports = loginRouter

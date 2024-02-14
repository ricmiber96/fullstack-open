const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const User = require('../../../models/user.model')

const authMutations = {
  createUser: async (root, args) => {
    const user = new User({ ...args })
    try {
      await user.save()
    } catch (error) {
      throw new GraphQLError('Error saving user', {
        extensions: {
          code: 'BAD_USER_INPUT',
          invalidArgs: args,
          error: error.message
        }
      })
    }
    return user
  },
  login: async (root, args) => {
    const user = await User.findOne({ username: args.username })
    if (!user || args.password !== 'secret') {
      throw new GraphQLError('Invalid credentials', {
        extensions: {
          code: 'UNAUTHENTICATED',
          invalidArgs: args,
          error: 'Invalid credentials'
        }
      })
    }
    const userForToken = {
      username: user.username,
      id: user._id
    }

    const token = jwt.sign(userForToken, process.env.JWT_SECRET_KEY)
    return { value: token }
  }
}

module.exports = authMutations

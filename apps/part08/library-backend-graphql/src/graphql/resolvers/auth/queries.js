const User = require('../../../models/user.model')

const authQueries = {
  allUsers: async () => {
    return User.find({})
  },
  me: async (root, args, context) => {
    return context.currentUser
  }
}

module.exports = authQueries

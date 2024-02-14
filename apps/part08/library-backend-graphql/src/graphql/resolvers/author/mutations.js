const { GraphQLError } = require('graphql')
const Author = require('../../../models/author.model')

const authorMutations = {
  editAuthor: async (root, args, context) => {
    const currentUser = context.currentUser
    if (!currentUser) {
      throw new GraphQLError('Not authenticated', {
        extensions: {
          code: 'UNAUTHENTICATED'
        }
      })
    } else {
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      } else {
        author.born = args.setBornTo
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError('Error saving author', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args,
              error: error.message
            }
          })
        }
        return author
      }
    }
  }
}

module.exports = authorMutations

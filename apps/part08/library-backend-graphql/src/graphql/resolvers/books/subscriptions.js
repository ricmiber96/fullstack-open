const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const BOOK_ADDED = 'BOOK_ADDED'
const bookSubscriptions = {
  bookAdded: {
    subscribe: () => pubsub.asyncIterator(BOOK_ADDED)
  }
}

module.exports = bookSubscriptions

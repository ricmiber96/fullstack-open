require('dotenv').config()

const PORT = process.env.PORT
let MONGO_DB_URI = process.env.MONGO_DB_URI
if (process.env.NODE_ENV === 'test') {
  MONGO_DB_URI = process.env.MONGO_DB_URI_TEST
}

module.exports = { PORT, MONGO_DB_URI }

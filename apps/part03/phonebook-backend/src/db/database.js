require('dotenv').config()
const mongoose = require('mongoose')
const { MONGO_DB_URI } = process.env

mongoose.connect(MONGO_DB_URI, {
  useNewUrlParser: true, useUnifiedTopology: true
})
  .then((db) => {
    console.log(`Server connected to ${db.connection.name}`)
  })
  .catch((err) => {
    console.log(err)
  })

process.on('uncaughtException', (err) => {
  console.log(err)
  mongoose.connection.close()
})

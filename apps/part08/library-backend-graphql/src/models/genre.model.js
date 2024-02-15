const mongoose = require('mongoose')
const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 2
  }
})

genreSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString() // Delete the _id and __v properties
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Genre', genreSchema)

const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
  name: { type: String, minlength: 3, required: true, unique: true },
  number: { type: String, minlength: 5, required: true }
})

const Contact = mongoose.model('Contact', contactSchema)
module.exports = Contact

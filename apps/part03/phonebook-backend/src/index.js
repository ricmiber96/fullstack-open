require('./db/database')
const express = require('express')
const bodyParser = require('body-parser')
// const crypto = require('crypto')
const morgan = require('morgan')
const cors = require('cors')

morgan.token('body', (req, res) => { return JSON.stringify(req.body) })

const app = express()
app.use(bodyParser.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())

const Contact = require('./models/contact.model')

const persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456'
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523'
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345'
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122'
  }
]

// const generateRandomId = () => {
//   const randomBytes = crypto.randomBytes(16)
//   const id = randomBytes.toString('hex')
//   return id
// }

// Middleware function to log requests
const requestLogger = (req, res, next) => {
  console.log('Method:', req.method)
  console.log('Path:', req.path)
  console.log('Body:', req.body)
  console.log('---')
  next()
}

// Middleware function to handle unknown endpoints
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  console.log(error.message)
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  next(error)
}

app.get('/', (req, res) => {
  res.send('<h1>Welcome to Phonebook</h1>')
})

app.get('/info', (req, res) => {
  const date = new Date()
  res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`)
})

app.get('/api/persons', (req, res) => {
  Contact.find({}).then(contacts => {
    res.json(contacts)
  }).catch(err => {
    console.log(err)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Contact.findById(req.params.id).then(contact => {
    if (contact) {
      res.json(contact)
    } else {
      res.status(404).end()
    }
  })
    .catch(err => {
      console.log(err)
      next(err)
    })
})

app.post('/api/persons', (req, res, next) => {
  const contact = req.body

  if (!contact.name || !contact.number) {
    return res.status(400).json({
      error: 'name or number is missing'
    })
  }
  if (Contact.find(contact.name)) {
    Contact.findOneAndUpdate({ name: contact.name }, contact, { new: true })
      .then(updatedContact => {
        res.json(updatedContact)
      })
      .catch(err => {
        console.log(err)
        next(err)
      })
  } else {
    const newContact = {
      name: contact.name,
      number: contact.number

    }
    Contact.create(newContact)
      .then(contact => async () => {
        console.log('contact saved', contact)
      })
      .catch(err => {
        console.log(err)
        next(err)
      })

    // persons = persons.concat(newContact)
    res.json(newContact)
  }
})

app.put('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  const contact = {
    name: req.body.name,
    number: req.body.number
  }

  Contact.findByIdAndUpdate(id, contact, { new: true })
    .then(updatedContact => {
      res.json(updatedContact)
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = Number(req.params.id)
  Contact.findByIdAndRemove(id)
    .then(result => {
      console.log(result)
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
    // persons = persons.filter(contact => contact.id !== id)
  res.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on  http://localhost:${PORT}`)
})

app.use(requestLogger)
app.use(unknownEndpoint)
app.use(errorHandler)

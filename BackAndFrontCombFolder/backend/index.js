const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

let persons = [
  {
    id: '1',
    name: 'Arto',
    number: '12345'
  }
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  const person = {
    id: String(Date.now()),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)

  response.status(201).json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const { id } = request.params

  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.put('/api/persons/:id', (request, response) => {
  const { id } = request.params
  
  persons = persons.filter(person => person.id === id)
  
  response.status(204).end()
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

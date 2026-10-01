const e = require('express')
const express = require('express')
const app = express()

const persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
    {
    id: "3",
    name: "Dan Ibrow",
    number: "354-44-5346212"
  },
    {
    id: "4",
    name: "Mary Poppendick",
    number: "46246324562"
  },
    {
    id: "5",
    name: "Kari Martti",
    number: "24562462462"
  }
]

app.get('/info', (req, res) => {
  res.send(`
    <p>Henkilömäärä yhteensä ${persons.length}</p>
    <p>${new Date()}</p>
  `)
})

/// HUOMAA ETTÄ ` on eri kuin ' tai ""
app.get('/api/persons', (req, res) => {
  res.send(
    persons.map(person =>
      `${person.name}<br>${person.number}`
    ).join('<br><br>')
  )
})


/// RESPONSE.SEND ON HTML-pohjainen
/// <br> -> rivinvaihto Ja HUOMIO, että 
// tämä: ${persons} toimii vain template literalissa, 
// eli backtick-merkkien ` sisällä — 
// ei tavallisissa '-lainausmerkeissä.
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const note = persons.find(note => note.id === id)

  if (!note) {
    return response.status(404).json({
      error: 'person not found'
    })
  }

  response.send(`
    ${note.name}<br>
    ${note.number}
  `)
})

app.listen(3001, () => {
  console.log('Server running on port 3001')
})
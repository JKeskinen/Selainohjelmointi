const e = require('express')
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

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
  


app.get('/', (req, res) => {
  res.send(`
    <p>Projektin juuri</p>
    <p>${new Date()}</p>
  `)
})

app.get('/info', (req, res) => {
  res.send(`
    <p>Henkilömäärä yhteensä ${persons.length}</p>
    <p>${new Date()}</p>
  `)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = persons.find(person => person.id === id)
  

  if (!person) {
    return res.status(404).json({
      error: 'person not found'
    })
  }

  persons = persons.filter(p => p.id !== id)
  res.json(persons)
})
/*
/// HUOMAA ETTÄ ` on eri kuin ' tai ""
app.get('/api/persons', (req, res) => {
  res.send(
    persons.map(person =>
      `${person.name}<br>${person.number}`
    ).join('<br><br>')
  )
})
*/




app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)

  if (!person) {
    return response.status(404).json({
      error: 'person not found'
    })
  }

  response.json(person)
})
/// RESPONSE.SEND ON HTML-pohjainen
/// <br> -> rivinvaihto Ja HUOMIO, että 
// tämä: ${persons} toimii vain template literalissa, 
// eli backtick-merkkien ` sisällä — 
// ei tavallisissa '-lainausmerkeissä.
//app.get('/api/persons/:id', (req, res) => {
//  const id = req.params.id
//  const note = persons.find(person => person.id === id)
//
  //if (!note) {
    //return res.status(404).json({
      //error: 'person not found'
//    })
  //}

//  res.send(`
 //   ${note.name}<br>
 //   ${note.number}
 // `)
//})

app.listen(3001, () => {
  console.log('Server running on port 3001')
})
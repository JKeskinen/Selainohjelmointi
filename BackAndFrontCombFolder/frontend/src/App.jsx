import { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/api/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = event => {
    event.preventDefault()

    const person = {
      name,
      number
    }

    axios.post('http://localhost:3001/api/persons', person)
      .then(response => {
        setPersons(persons.concat(response.data))
        setName('')
        setNumber('')
      })
  }

  const deletePerson = id => {
    axios.delete(`http://localhost:3001/api/persons/${id}`)
      .then(() => {
        setPersons(
          persons.filter(person => person.id !== id)
        )
      })
  }

  const editPerson = id => {
    axios.put(`http://localhost:3001/api/persons/${id}`)
    .then(() => {
      setPersons(
        persons.filter(person => person.id === id)
      )
    })
  }

  return (
    <div>
      <h1>Persons</h1>

      <form onSubmit={addPerson}>
        <input
          value={name}
          onChange={event => setName(event.target.value)}
          placeholder="name"
        />

        <input
          value={number}
          onChange={event => setNumber(event.target.value)}
          placeholder="number"
        />

        <button type="submit">add</button>
        
      </form>

      {persons.map(person =>
        <div key={person.id}>
          {person.name} {person.number}

          <button onClick={() => deletePerson(person.id)}>
            delete
          </button>
          <button onClick={() => editPerson(person.id)}>
            edit
          </button>
        </div>
      )}
    </div>
  )
}

export default App

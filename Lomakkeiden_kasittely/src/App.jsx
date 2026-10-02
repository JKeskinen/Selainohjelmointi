import { useState, useEffect } from 'react'
import axios from 'axios'


const Filter = ({searchTerm, handleSearchChange}) => (
  <div>
    Search by name or number:
    <input
    value={searchTerm}
    onChange={handleSearchChange}
    placeholder='search'
    />
  </div>
)

const PersonForm = ({
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
  addPerson
}) => (
  <form onSubmit={addPerson}>
    <div>
      name:
      <input
      value={newName}
      required
      onChange={handleNameChange}
      />
    </div>
    <div>
      number:
      <input
      value={newNumber}
      onChange={handleNumberChange}
      />
    </div>
    <button type='submit'>add</button>
  </form>
)
// Ottaa vastaan 'person' ja 'deletePerson'-propsin ja palauttaa taulukon, 
// joka renderöi jokaiselle henkilölle oman rivin ja poistonapin.
const Persons = ({persons, deletePerson}) => {
  //console.log('Type of deletePerson:', typeof deletePerson)
  return(
    <table>
      <tbody>
        <tr>
          <td><strong>NAME</strong></td>
          <td><strong>NUMBER</strong></td>
        </tr>
        {persons.map((person) =>(
          <tr key={person.id}>
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td>
              <button onClick={() => deletePerson(person.id, person.name)}>Delete</button>
              </td>              
          </tr> 
            ))}
      </tbody>
    </table>
  )
}



const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

 
  
useEffect(() => {
  axios
    .get('http://localhost:3001/api/persons')
    .then(response => {
      console.log(response.data)
      console.log(Array.isArray(response.data.persons))
      setPersons(response.data)
    })
}, [])


  
  // Välittää 'handleDelete'-funktion 
  // 'deletePerson'-propsina Persons-komponentille
  const handleDelete = (id, name) => {
    console.log('DELETE:', id, name)
    if (window.confirm(`Delete ${name} ?`)){
      axios
      .delete(`http://localhost:3001/api/persons/${id}`)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
      })
    }
  }


  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    const existingPerson = persons.find(
      person => person.name === newName
    )

    if (existingPerson) {
      if (window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one ?`
      )) {
        axios
          .put(
            `http://localhost:3001/persons/${existingPerson.id}`,
            personObject
          )
          .then(response => {
            setPersons(
              persons.map(person =>
                person.id === existingPerson.id
                  ? response.data
                  : person
              )
            )

            setNewName('')
            setNewNumber('')
          })
      }

      return
    }
    // Luodaan henkilöolio, jonka nimi ja puhelinnumero saadaan tilamuuttujista
    const personObject = {
      name : newName, 
      number : newNumber 
    }
      axios.post('http://localhost:3001/api/persons',personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
  }

 
  const handleNameChange = (event) => {
    setNewName(event.target.value)
    //console.log(event.target.value) 
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }
    const personToShow = searchTerm === ''
    ? persons 
    : persons.filter(person=> {
      const nameMatch  = person.name.toLowerCase().includes(searchTerm.toLowerCase())
      const numberMatch = person.number.includes(searchTerm)
      
      return(
         nameMatch || numberMatch)
    })
  console.log(persons)
  console.log(Array.isArray(persons))



    // Main App return alkaa tästä--
    // lisätty Persons deletePerson={handleDelete}
  return (
    <div>
      <h2>Phonebook</h2>
        
      <PersonForm
          newName={newName}
          newNumber={newNumber}
          handleNameChange={handleNameChange}
          handleNumberChange={handleNumberChange}
          addPerson={addPerson}
          persons={persons}
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
          deletePerson={handleDelete}
          
      />
    </div>
 
  )

}

export default App
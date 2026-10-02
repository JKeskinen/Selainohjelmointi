import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

 
  
  useEffect(() => {
    console.log('effect')
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log('promise fullfilled')
      setPersons(response.data)
    })
  },[])
  console.log("render", persons.length, "persons")


  
  // Välittää 'handleDelete'-funktion 
  // 'deletePerson'-propsina Persons-komponentille
  const handleDelete = (id, name) => {
    console.log('DELETE:', id, name)
    if (window.confirm(`Delete ${name} ?`)){
      axios
      .delete(`http://localhost:3001/persons/${id}`)
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

    axios
      .post('http://localhost:3001/persons', personObject)
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
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
          <tr key={person.name}>
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
    if (window.confirm(`Delete ${name} ?`)){
      axios
      .delete(`http://localhost:3001/persons/${id}`)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
      })
    }
 
  }

  // Henkilön lisääminen puhelinluetteloon. 
  const addPerson = (event) => {
    event.preventDefault()

    const nameExists = persons.some(
      person => person.name === newName
    )
    if (nameExists){
      window.alert(`${newName} is already added to phonebook`)
        return
    }
    // Luodaan henkilöolio, jonka nimi ja puhelinnumero saadaan tilamuuttujista
    const personObject = {
      name : newName, 
      number : newNumber 
    }
      axios.post('http://localhost:3001/persons',personObject)
      .then(response => {
        console.log(response)
      })
    

    // Luodaan uusi lista kopioimalla nykyiset henkilöt ja lisäämällä uusi henkilö
    const newPersons = [...persons, personObject]
    //console.log('Person name: ', persons.map(p=> p.name), 'Person number: ', persons.map(s=> s.number))
    console.log('Persons:', newPersons.map(p=> p.name), 'Person number: ', newPersons.map( s=> s.number))
   
    // Lisää henkilö listaan
    //setPersons(persons.concat(personObject))
    setPersons(newPersons)
    // ilmoitus
    //window.alert(`${newName} : ${newNumber} added to phonebook`)
    setNewName('')
    setNewNumber('')
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

    // Main App return alkaa tästä--
    // lisätty Persons deletePerson={handleDelete}
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
      searchTerm={searchTerm}
      handleSearchChange={handleSearchChange}
      />
      <h3>Add a new</h3>
      <PersonForm
      newName={newName}
      newNumber={newNumber}
      handleNameChange={handleNameChange}
      handleNumberChange={handleNumberChange}
      addPerson={addPerson}
      />
      <h3>Numbers</h3>
      <Persons
      persons={personToShow}
      deletePerson={handleDelete}/>
    </div>   
  )

}

export default App
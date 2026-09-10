
import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  
  


  const addPerson = (event) => {
    event.preventDefault()
    const nameExists = persons.some(
      person => person.name === newName
    )
    if (nameExists){
      window.alert(`${newName} is already added to phonebook`)
        return
    }
    const personObject = { name : newName, number : newNumber }
    console.log('Person name: ', persons.map(p=> p.name), 'Person number: ', persons.map(s=> s.number))
    setPersons(persons.concat(personObject))
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
    ? persons : persons.filter(person=> {
      const nameMatch  = person.name.toLowerCase().includes(searchTerm.toLowerCase())
      const numberMatch = person.number.includes(searchTerm)
      
        if (nameMatch || numberMatch === 0){
          
        }
      return(
         nameMatch || numberMatch)
    })
  
    
  
      

  return (
    <div>
      <div>
        Search by name: <input value={searchTerm} onChange ={handleSearchChange} placeholder='search'/>
        
      </div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <div>debug name: {newName}</div>
      <div>debug number: {newNumber}</div>
      <h2>Numbers</h2>
      <ul>
        {personToShow.map(person =>
          <p key={person.name}>{person.name}, {''} {person.number}</p> 
        )}
      
      </ul>
      
      
    </div>
    
  )

}


export default App
import Persons from "./Persons"


const Filter = ({
  persons, 
  searchTerm, 
  handleSearchChange,
  deletePerson
}) => {
    const personToShow = searchTerm === ''
  ? persons 
  : persons.filter(person=> {
    const nameMatch  = person.name.toLowerCase().includes(searchTerm.toLowerCase())
    
    const numberMatch = person.number.includes(searchTerm)
    
    return nameMatch || numberMatch
      })

  return (
    <div>
      Search by name or number:
      <input
      value={searchTerm}
      onChange={handleSearchChange}
      placeholder='Insert name or number'
      />

      <h3>Numbers</h3>
 

      <Persons
      persons={personToShow}
      deletePerson={deletePerson}
      />

    </div>
   
  )
}

export default Filter

import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import noteService from './services/notes'




const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    noteService
    .getAll()
    .then(response => {
      setNotes(response.data)
    })
  }, [])
  
  const Note = ({note, toggleImportance}) => {
    const label = note.important
    ? 'make not important' : 'make important'
    
    return(
      <li>
        {note.content}
        <button onClick ={toggleImportance}>{label}</button>
      </li>
    )
  }

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
      id: String(notes.length +1),
    }
    setNotes(notes.concat(noteObject))
    setNewNote('')
    console.log('button clicked', event.target)
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const noteToShow = showAll
  ? notes
  : notes.filter(note => note.important)



  // MUUTA TÄRKEYTTÄ-NAPPI
const toggleImportanceOf = id => {
  const url = `http://localhost:3001/notes/${id}`
  const note = notes.find(n => n.id === id)

  // Kannattaa huomata myös, että uusi olio changedNote on ainoastaan ns. shallow copy, 
  // eli uuden olion kenttien arvoina on vanhan olion kenttien arvot.
  const changedNote = { ...note, important: !note.important }

  axios.put(url, changedNote).then(response => {
    setNotes(notes.map(note => note.id !== id ? note : response.data))
  })
}

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        <ul>
          {noteToShow.map(note =>
            <Note 
            key={note.id} 
            note={note}
            toggleImportance ={() =>
            toggleImportanceOf(note.id)}
            />
          )}
        </ul>
        <form onSubmit={addNote}>
          <input 
          value={newNote}
          onChange={handleNoteChange}
          />
          <button type="submit">save</button>
        </form>
      </ul>
    </div>
  )
}

export default App
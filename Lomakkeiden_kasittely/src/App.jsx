import { useState } from 'react'
import Note from './components/Note'


const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const addNote =(event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random()>0.5,
      id: String(notes.length +1),
    }
    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)
/* muuttujan tulos arvoksi asetetaan val1:n arvo jos ehto on tosi. 
Jos ehto ei ole tosi, muuttujan tulos arvoksi tulee val2:n arvo.
Eli jos tilan arvo showAll on epätosi, muuttuja notesToShow saa arvokseen vain ne muistiinpanot, 
joiden important-kentän arvo on tosi. Filtteröinti tapahtuu taulukon metodilla filter: */

  


  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
            show {showAll ? 'important' : 'all' }
        </button>
      </div> 
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit = {addNote}>
        <input 
        value={newNote}
        onChange={handleNoteChange} 
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App 
import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import noteService from './services/notes'


const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const App = () => {

                                            //state declarations
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('') //input field er sathe sync
  const [showAll, setShowAll] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {                                   //effect declarations //effect is being used here to fetch the notes from the backend for the very first time
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const addNote = (event) => { //there is function for each task
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    }
  
    noteService
      .create(noteObject)
        .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const toggleImportanceOf = id => { ///there is function for each task
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id) 
    const changedNote = { ...note, important: !note.important }
  
    noteService
      .update(id, changedNote)
        .then(returnedNote => { //as JS asynchonous, so update call korar por promise fulfill hobe, THEN ja korbe seta then er moddhe likhi. returnedNote holo update er promise ja return kore seta
        setNotes(notes.map(note => note.id !== id ? note : returnedNote)) //jehetu note component ta change hobe, tai setNotes ta ACCORDINGLY call kora  hoise. VUL: ami chaile sobgula notes e rerender korte partam. condition na diye. RIGHT: na parta na. cause sever er change ar ekhankar change by born synchonous na, tumi ekhane borong seta synchonous korar code tai likhcho
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const handleNoteChange = (event) => {  ///there is function for each task
    setNewNote(event.target.value)
  }

  const notesToShow = showAll    //helping function for the notes state
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <Notification message={errorMessage} />
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>      
      <ul>
        {notesToShow.map(note => //note is the iterator like i
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
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
    </div>
  )
}

export default App
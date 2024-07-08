const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? 'make not important' : 'make important'

  return (
    <li>
      {note.content} 
      <button onClick={toggleImportance}>{label}</button> {/*function reff na pathale note er importance ta change kortam kivabe ekhane */}
    </li>
  )
}

export default Note 
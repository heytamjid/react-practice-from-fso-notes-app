import ReactDOM from 'react-dom/client'
import App from './App'
import axios from 'axios'
import './index.css'

// let notes = []
// axios.get('http://localhost:3001/notes').then(response => {
//     notes = response.data
//     console.log(notes)
//   }
// )


// const notes = [
//   {
//     id: 1,
//     content: 'HTML is easy',
//     important: true
//   },
//   {
//     id: 2,
//     content: 'Browser can execute only JavaScript',
//     important: false
//   },
//   {
//     id: 3,
//     content: 'GET and POST are the most important methods of HTTP protocol',
//     important: true
//   }
// ]

ReactDOM.createRoot(document.getElementById('root')).render(
  <App/>
)

// axios.get('http://localhost:3001/notes').then(response => {
//   const notes = response.data
//   ReactDOM.createRoot(document.getElementById('root')).render(<App notes={notes} />)
// })


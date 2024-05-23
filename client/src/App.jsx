import { useState } from 'react'
import './App.css'
import io from 'socket.io-client'
const socket = io.connect('http://localhost:3001')

function App() {
  const [message, setMessage] = useState('')
  const sendMessage = () => {

  }

  return (
    <>

      <h1>message</h1>
      <div className="card">
        <input onChange={((e) => setMessage(e.target.value))} value={message} placeholder='Message...' type="text" />
        <button onClick={sendMessage()}> send
        </button>
      </div >

      <ul></ul>

    </>
  )
}

export default App

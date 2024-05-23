import { useState } from 'react'
import './App.css'
import io from 'socket.io-client'
const socket = io.connect('http://localhost:3001')

function App() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const sendMessage = () => {
    socket.emit('send_message', { message: message })
    setMessages([...messages, message]);
  }

  return (
    <>

      <h1>message</h1>
      <div className="card">
        <input onChange={((e) => setMessage(e.target.value))} value={message} placeholder='Message...' type="text" />
        <button onClick={sendMessage}> send
        </button>
      </div >

      <ul className='list'>
        {messages && messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>

    </>
  )
}

export default App

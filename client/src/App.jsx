import { useEffect, useState } from 'react'
import './App.css'
import io from 'socket.io-client'
const socket = io.connect('http://localhost:3001')

function App() {
  const [message, setMessage] = useState('')
  const [receivedMessage, setRecivedMessage] = useState('')
  const [messages, setMessages] = useState([])
  const sendMessage = () => {
    socket.emit('send_message', { message })

  }
  useEffect(() => {
    socket.on('receive_message', (data) => {
      setRecivedMessage(data.message);
    })
  }, [socket])

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

        <h1>message</h1>
        {receivedMessage}
      </ul>

    </>
  )
}

export default App

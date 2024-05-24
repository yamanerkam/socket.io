import { useEffect, useState } from 'react'
import './App.css'
import io from 'socket.io-client'
const socket = io.connect('http://localhost:3001')

function App() {

  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  const sendMessage = (event) => {
    event.preventDefault();

    const newMessage = {
      body: message,
      from: socket.id,
    };

    setMessages(state => [newMessage, ...state]);
    setMessage("");
    socket.emit("message", newMessage.body);


  }

  useEffect(() => {
    socket.on("message", receiveMessage)
    return () => {
      socket.off("message", receiveMessage);
    };
  }, []);

  // emit takes on recieves

  const receiveMessage = (data) => {
    setMessages(state => [data, ...state]);
  }


  return (
    <>

      <h1>message</h1>
      <div >
        <form className="card" onSubmit={sendMessage} action="submit">
          <input
            required
            onChange={((e) => setMessage(e.target.value))}
            value={message}
            placeholder='Message...'
            type="text" />
          <button type='submit'>send</button>

        </form>

      </div >

      <ul className='list'>
        {messages && messages.map((msg, index) => (
          <li key={index} >
            <strong>{msg.from.substring(0, 3)}:</strong> {msg.body}
          </li>
        ))}


      </ul>

    </>
  )
}

export default App

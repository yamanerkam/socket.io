import { useEffect, useState } from 'react'
import './App.css'
import io from 'socket.io-client'
const socket = io('http://192.168.1.3:3001', { transports: ['websocket'], jsonp: false, forceNew: true, })

function App(yar) {

  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  const [room, setRoom] = useState('room1')

  socket.emit('joinRoom', room);



  const sendMessage = (event) => {
    event.preventDefault();

    const newMessage = {
      body: message,
      from: socket.id,
    };

    setMessages(state => [newMessage, ...state]);
    setMessage("");
    socket.emit("message", newMessage.body, room);


  }


  useEffect(() => {
    socket.on("message", receiveMessage)
    return () => {
      socket.off("message", receiveMessage);
    };
  }, []);

  // emit takes on recieves

  const receiveMessage = (data) => {
    console.log(data)
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

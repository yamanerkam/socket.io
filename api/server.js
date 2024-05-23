const express = require('express')
const app = express()
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')
const port = 3000

// research midleweare 
// research app.use
app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']

    }
})

io.on('connection', (socket) => {
    socket.emit('connect', { message: 'a new client connected' })
})

server.listen(port, () => {
    console.log(`listening on ${port}`)
})
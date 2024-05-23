const express = require('express')
const app = express()

const port = 3000

const io = require('socket.io')(port + 1)
io.on('connection', socket => {
    console.log(socket.id)
})
// research midleweare 
// research app.use

app.get('/', (req, res) => {
    res.send('hi there!')
})

app.listen(port, () => {
    console.log(`listening on ${port}`)
})
const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", "http://192.168.1.3:5173"],
        methods: ["GET", "POST"],
        credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on('joinRoom', function (room) {
        socket.join(room);
        console.log(`Socket ${socket.id} joined room ${room}`);

    });


    socket.on('message', (body, room) => {
        console.log(body + ' ' + socket.id + ' ' + room)
        socket.to(room).emit("message", {

            body,
            from: socket.id,
        });

    })

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(3001, '0.0.0.0', () => {
    console.log("SERVER IS RUNNING");
});
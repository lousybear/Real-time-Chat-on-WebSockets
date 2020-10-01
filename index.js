const express = require('express');
const socket = require('socket.io');

const port = 8000;
const activeUsers = new Set();

const app = express();

app.use(express.static('public'))
const server = app.listen(port, () => {
    console.log(`Listening on ${port}`)
});

const io = socket(server)
io.on('connection', (socket) => {

    console.log(`Socket Connected`)

    socket.on('new user', (data) => {
        socket.userId = data;
        activeUsers.add(data);
        io.emit("new user", [...activeUsers])
    });

    socket.on('disconnect', () => {
        activeUsers.delete(socket.userId);
        io.emit("user disconnected", socket.userId);
    })

    socket.on("chat message", function (data) {
        io.emit("chat message", data);
    });

    socket.on("typing", function (data) {
        socket.broadcast.emit("typing", data);
    });
})

const express = require('express');
const socket = require('socket.io');

const port = 8000;

const app = express();
app.use(express.static('public'))
const server = app.listen(port, () => {
    console.log(`Listening on ${port}`)
});
socket(server).on('connection', () => {
    console.log(`Socket Connected`)
})
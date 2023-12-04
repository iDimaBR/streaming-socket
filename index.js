const express = require('express');
const http = require('http');
const { ExpressPeerServer } = require('peer');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

const peerServer = ExpressPeerServer(server, {
  debug: true,
});

app.use('/', peerServer);
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', socket => {
    socket.on('join', (userId) => {
      socket.broadcast.emit('user-connected', userId)
  
      socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', userId)
      })
    })
  })

server.listen(3000, () => {
  console.log('Servidor está rodando na porta 3000');
});

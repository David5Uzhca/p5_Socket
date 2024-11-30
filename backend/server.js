const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Permitir conexiones de cualquier origen (ajustar en producción)
  },
});

// Manejo de eventos de conexión de clientes
io.on('connection', (socket) => {
  console.log(`Usuario conectado: ${socket.id}`);

  // Evento cuando un usuario se une al chat
  socket.on('join-chat', (username) => {
    io.emit('user-joined', `${username} se unió al chat`);
  });

  // Evento para recibir y retransmitir mensajes
  socket.on('send-message', (data) => {
    io.emit('receive-message', data);
  });

  // Evento para manejar desconexiones
  socket.on('disconnect', () => {
    console.log(`Usuario desconectado: ${socket.id}`);
  });
});

// Iniciar servidor
server.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});

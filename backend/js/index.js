const express = require('express');
const path = require('path');
const { createServer } = require('http');
const { Server } = require('socket.io');
const TcpClient = require('./tcpClient');

const app = express();
const PORT = process.env.PORT || 3001;
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // Dirección de tu app React (Vite)
    methods: ["GET", "POST"]
  }
});

// Configuración para servir el frontend en producción
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../frontend/dist')));
  // Manejar rutas con React Router
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../frontend/dist', 'index.html'));
  });
} else {
  // Ruta de prueba en desarrollo
  app.get('/', (req, res) => {
    res.send('API funcionando en desarrollo');
  });
}

// Iniciar el servidor HTTP
httpServer.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});

// Instanciar el TcpClient y pasarle un callback para emitir los datos vía Socket.io
const tcpClient = new TcpClient((socketData) => {
  io.emit('jsonData', socketData);
  console.log('[WEB] JSON sent');
});

// Conectar el cliente TCP
tcpClient.connect();

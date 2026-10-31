const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0';
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('joinRoom', ({ code, playerName }) => {
      socket.join(code);
      console.log(`Player ${playerName} (${socket.id}) joined room ${code}`);
      io.to(code).emit('playerJoined', { playerId: socket.id, playerName });
    });

    socket.on('drawingStart', ({ code, point }) => {
      socket.to(code).emit('drawingUpdate', { type: 'start', point, socketId: socket.id });
    });

    socket.on('drawingMove', ({ code, point }) => {
      socket.to(code).emit('drawingUpdate', { type: 'move', point, socketId: socket.id });
    });

    socket.on('drawingEnd', ({ code }) => {
      socket.to(code).emit('drawingUpdate', { type: 'end', socketId: socket.id });
    });

    socket.on('sendChat', ({ code, message }) => {
      io.to(code).emit('chatMessage', { playerId: socket.id, message, timestamp: Date.now() });
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});

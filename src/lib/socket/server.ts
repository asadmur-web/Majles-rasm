import { Server as NetServer } from 'http';
import { NextApiRequest } from 'next';
import { Server as ServerIO, Socket } from 'socket.io';
import { gameEngine } from '@/lib/game/engine';
import { generateRoomCode } from '@/lib/utils/roomCode';

export const config = {
  api: {
    bodyParser: false,
  },
};

interface SocketServer extends NetServer {
  io?: ServerIO;
}

const ioHandler = (req: NextApiRequest, res: any) => {
  if (!res.socket.server.io) {
    console.log('Initializing Socket.io server...');
    
    const io = new ServerIO(res.socket.server as any, {
      path: '/api/socket',
      addTrailingSlash: false,
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });

    io.on('connection', (socket: Socket) => {
      console.log('Client connected:', socket.id);

      socket.on('joinRoom', ({ code, playerName }) => {
        socket.join(code);
        
        let room = gameEngine.getRoom(code);
        if (!room) {
          const newCode = code || generateRoomCode();
          room = gameEngine.createRoom(newCode, socket.id, 8, 2);
          gameEngine.addPlayer(newCode, socket.id, playerName);
        } else {
          gameEngine.addPlayer(code, socket.id, playerName);
        }

        io.to(code).emit('playerJoined', { 
          playerId: socket.id, 
          playerName,
          room 
        });

        socket.emit('roomJoined', { code, room });
      });

      socket.on('setReady', ({ code, isReady }) => {
        io.to(code).emit('playerReady', { playerId: socket.id, isReady });
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

      socket.on('requestVote', ({ code }) => {
        io.to(code).emit('voteRequested', { requesterId: socket.id });
      });

      socket.on('vote', ({ code, targetId }) => {
        io.to(code).emit('voteCast', { voterId: socket.id, targetId });
      });

      socket.on('startGame', ({ code }) => {
        const room = gameEngine.getRoom(code);
        if (room) {
          gameEngine.startGame(room);
          io.to(code).emit('gameStarted', { room });
        }
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
        socket.rooms.forEach(room => {
          if (room !== socket.id) {
            io.to(room).emit('playerLeft', { playerId: socket.id });
          }
        });
      });
    });

    res.socket.server.io = io;
  }

  res.end();
};

export default ioHandler;

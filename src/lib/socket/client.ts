import { io, Socket } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents } from './types';

class SocketManager {
  private socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;
  private readonly url = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000';

  connect() {
    if (this.socket?.connected) return this.socket;

    this.socket = io(this.url, {
      path: '/api/socket',
      transports: ['websocket', 'polling'],
      autoConnect: true,
    });

    this.socket.on('connect', () => {
      console.log('Connected to server:', this.socket?.id);
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

    return this.socket;
  }

  getSocket() {
    if (!this.socket?.connected) {
      this.connect();
    }
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // Room methods
  joinRoom(data: { code: string; playerName: string }) {
    this.getSocket()?.emit('joinRoom', data);
  }

  leaveRoom() {
    this.getSocket()?.emit('leaveRoom');
  }

  setReady(data: { code: string; isReady: boolean }) {
    this.getSocket()?.emit('setReady', data);
  }

  // Drawing methods
  startDrawing(data: { code: string; point: { x: number; y: number } }) {
    this.getSocket()?.emit('drawingStart', data);
  }

  moveDrawing(data: { code: string; point: { x: number; y: number } }) {
    this.getSocket()?.emit('drawingMove', data);
  }

  endDrawing(data: { code: string }) {
    this.getSocket()?.emit('drawingEnd', data);
  }

  // Chat methods
  sendChat(data: { code: string; message: string }) {
    this.getSocket()?.emit('sendChat', data);
  }

  // Game methods
  startGame(data: { code: string }) {
    this.getSocket()?.emit('startGame', data);
  }

  requestVote(code: string) {
    this.getSocket()?.emit('requestVote', { code });
  }

  vote(code: string, targetId: string) {
    this.getSocket()?.emit('vote', { code, targetId });
  }

  // Event listeners
  on(event: keyof ServerToClientEvents, callback: (...args: any[]) => void) {
    this.getSocket()?.on(event, callback);
  }

  off(event: keyof ServerToClientEvents, callback?: (...args: any[]) => void) {
    this.getSocket()?.off(event, callback);
  }
}

export const socketManager = new SocketManager();

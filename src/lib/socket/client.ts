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
  joinRoom(code: string, playerName: string) {
    this.getSocket()?.emit('joinRoom', { code, playerName });
  }

  leaveRoom() {
    this.getSocket()?.emit('leaveRoom');
  }

  setReady(code: string, isReady: boolean) {
    this.getSocket()?.emit('setReady', { code, isReady });
  }

  // Drawing methods
  startDrawing(code: string, point: { x: number; y: number }) {
    this.getSocket()?.emit('drawingStart', { code, point });
  }

  moveDrawing(code: string, point: { x: number; y: number }) {
    this.getSocket()?.emit('drawingMove', { code, point });
  }

  endDrawing(code: string) {
    this.getSocket()?.emit('drawingEnd', { code });
  }

  // Chat methods
  sendChat(code: string, message: string) {
    this.getSocket()?.emit('sendChat', { code, message });
  }

  // Game methods
  startGame(code: string) {
    this.getSocket()?.emit('startGame', { code });
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

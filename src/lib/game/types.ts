export interface Player {
  id: string;
  name: string;
  isReady: boolean;
  isHost: boolean;
  score: number;
  role?: 'impostor' | 'citizen';
  taskCompleted: number;
  hintsReceived: string[];
}

export interface Room {
  code: string;
  players: Player[];
  maxPlayers: number;
  impostorCount: number;
  hostId: string;
  gameState: 'lobby' | 'playing' | 'voting' | 'intermission';
  currentDrawer?: string;
  drawingWord?: string;
  wordHints?: string[];
}

export interface DrawingStroke {
  points: { x: number; y: number }[];
  color: string;
  size: number;
  tool: 'brush' | 'pen' | 'eraser';
}

export type GamePhase = 'lobby' | 'drawing' | 'debate' | 'voting' | 'results';

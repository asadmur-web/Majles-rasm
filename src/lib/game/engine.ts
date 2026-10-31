import { DRAWING_WORDS, getRandomWord } from '@/data/words';
import { GAME_TASKS, getRandomTask } from '@/data/tasks';
import { Player, Room } from './types';

export class GameEngine {
  private rooms: Map<string, Room> = new Map();

  createRoom(code: string, hostId: string, maxPlayers: number, impostorCount: number): Room {
    const room: Room = {
      code,
      players: [],
      maxPlayers,
      impostorCount,
      hostId,
      gameState: 'lobby'
    };
    this.rooms.set(code, room);
    return room;
  }

  addPlayer(code: string, playerId: string, name: string): Room | null {
    const room = this.rooms.get(code);
    if (!room || room.players.length >= room.maxPlayers) return null;
    
    room.players.push({
      id: playerId,
      name,
      isReady: false,
      isHost: room.players.length === 0,
      score: 0,
      taskCompleted: 0,
      hintsReceived: []
    });
    return room;
  }

  assignRoles(room: Room): void {
    const players = [...room.players];
    const impostorCount = Math.min(room.impostorCount, Math.floor(players.length / 2));
    
    // Shuffle players
    for (let i = players.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [players[i], players[j]] = [players[j], players[i]];
    }
    
    // Assign roles
    players.forEach((player, idx) => {
      player.role = idx < impostorCount ? 'impostor' : 'citizen';
    });
    
    room.players = players;
  }

  startGame(room: Room): void {
    this.assignRoles(room);
    room.gameState = 'playing';
    room.drawingWord = getRandomWord();
    room.wordHints = this.generateHints(room.drawingWord!);
  }

  private generateHints(word: string): string[] {
    const hints = [
      `الحرف الأول: ${word[0]}`,
      `عدد الحروف: ${word.length}`,
      `نوع الكلمة: ${this.getWordCategory(word)}`
    ];
    return hints;
  }

  private getWordCategory(word: string): string {
    // Simplified categorization
    return 'مضحك';
  }

  getRandomTask(): any {
    return getRandomTask();
  }

  validateTaskCompletion(taskId: number, action: any): boolean {
    // Task validation logic
    return true;
  }

  calculateScore(player: Player, action: string): number {
    switch(action) {
      case 'vote_correct': return 10;
      case 'task_complete': return 5;
      case 'hint_found': return 3;
      case 'impostor_caught': return 20;
      default: return 0;
    }
  }

  getRoom(code: string): Room | undefined {
    return this.rooms.get(code);
  }

  removeRoom(code: string): void {
    this.rooms.delete(code);
  }
}

export const gameEngine = new GameEngine();

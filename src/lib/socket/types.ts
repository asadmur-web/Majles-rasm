export interface ServerToClientEvents {
  playerJoined: (player: any) => void;
  playerLeft: (playerId: string) => void;
  playerReady: (playerId: string, isReady: boolean) => void;
  gameStarted: (data: any) => void;
  drawingUpdate: (stroke: any) => void;
  turnChanged: (playerId: string, timeLeft: number) => void;
  chatMessage: (message: any) => void;
  voteTriggered: (results: any) => void;
  taskAssigned: (task: any) => void;
  taskCompleted: (playerId: string, taskId: number) => void;
}

export interface ClientToServerEvents {
  joinRoom: (code: string, playerName: string) => void;
  leaveRoom: () => void;
  setReady: (isReady: boolean) => void;
  startGame: () => void;
  drawingStart: (point: { x: number; y: number }) => void;
  drawingMove: (point: { x: number; y: number }) => void;
  drawingEnd: () => void;
  sendChat: (message: string) => void;
  requestVote: () => void;
  vote: (targetId: string) => void;
  completeTask: (taskId: number) => void;
}

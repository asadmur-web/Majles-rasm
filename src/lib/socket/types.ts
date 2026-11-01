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
  joinRoom: (data: { code: string; playerName: string }) => void;
  leaveRoom: () => void;
  setReady: (data: { code: string; isReady: boolean }) => void;
  startGame: (data: { code: string }) => void;
  drawingStart: (data: { code: string; point: { x: number; y: number } }) => void;
  drawingMove: (data: { code: string; point: { x: number; y: number } }) => void;
  drawingEnd: (data: { code: string }) => void;
  sendChat: (data: { code: string; message: string }) => void;
  requestVote: (data: { code: string }) => void;
  vote: (data: { code: string; targetId: string }) => void;
  completeTask: (data: { taskId: number }) => void;
}

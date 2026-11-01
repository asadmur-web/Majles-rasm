'use client';

import { useParams, useRouter } from 'next/navigation';
import LeaveModal from '@/components/LeaveModal';
import { useState, useEffect } from 'react';
import { socketManager } from '@/lib/socket/client';

export default function RoomPage() {
  const params = useParams();
  const router = useRouter();
  const code = params.code as string;
  const [players, setPlayers] = useState<{id: string, name: string}[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [isHost, setIsHost] = useState(true);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);

  useEffect(() => {
    const socket = socketManager.connect();
    const playerName = 'لاعب ' + Math.floor(Math.random() * 100);

    socketManager.joinRoom({ code, playerName });

    socketManager.on('playerJoined', (data: any) => {
      setPlayers(prev => {
        if (prev.some(p => p.id === data.playerId)) return prev;
        return [...prev, { id: data.playerId, name: data.playerName }];
      });
    });

    socketManager.on('playerReady', (data: any) => {
      // handle ready state update if needed
    });
  }, [code]);

  const handleLeave = () => {
    socketManager.leaveRoom();
    router.push('/');
  };

  const startGame = () => {
    socketManager.startGame({ code });
    router.push(`/room/${code}/game`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col">
      <header className="border-b border-slate-800 p-4 flex items-center justify-between">
        <button onClick={() => router.push('/')} className="text-amber-400 hover:text-amber-300">← رجوع</button>
        <div className="text-center">
          <div className="text-2xl font-bold text-amber-400">غرفة: {code}</div>
          <div className="text-sm text-slate-400">العدد: {players.length}/8</div>
        </div>
        <button onClick={() => setIsLeaveModalOpen(true)} className="text-red-400 hover:text-red-300">خروج</button>
      </header>

      <LeaveModal
        isOpen={isLeaveModalOpen}
        onConfirm={handleLeave}
        onCancel={() => setIsLeaveModalOpen(false)}
      />

      <main className="flex-1 flex flex-col lg:flex-row">
        <div className="flex-1 p-6 space-y-6">
          <div className="bg-slate-900/50 backdrop-blur rounded-2xl p-6 border border-slate-800">
            <h2 className="text-xl font-bold mb-4 text-white">إعدادات المضيف</h2>
            {isHost && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-400">عدد اللاعبين</label>
                  <select className="w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg p-2 text-white">
                    <option>4 لاعبين</option>
                    <option>6 لاعبين</option>
                    <option>8 لاعبين</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-slate-400">عدد المزورين</label>
                  <select className="w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg p-2 text-white">
                    <option>1 مزور</option>
                    <option>2 مزور</option>
                    <option>3 مزور</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          <div className="bg-slate-900/50 backdrop-blur rounded-2xl p-6 border border-slate-800">
            <h3 className="text-lg font-bold mb-4 text-white">اللاعبون المتواجدون</h3>
            <div className="space-y-2">
              {players.map((player) => (
                <div key={player.id} className="flex items-center justify-between bg-slate-800/50 rounded-lg p-3">
                  <span className="text-white font-medium">{player.name}</span>
                  <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">متصل</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="w-full lg:w-80 p-6 border-t lg:border-t-0 lg:border-l border-slate-800">
          <button
            onClick={() => setIsReady(!isReady)}
            className={`w-full py-4 rounded-xl font-bold transition ${
              isReady
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-amber-500 hover:bg-amber-600 text-slate-900'
            }`}
          >
            {isReady ? 'جاهز ✓' : 'اضغط لتكون جاهزاً'}
          </button>
          {isHost && (
            <button
              onClick={startGame}
              className="w-full mt-4 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold rounded-xl shadow-lg transition"
            >
              بدء اللعبة 🚀
            </button>
          )}
        </aside>
      </main>
    </div>
  );
}


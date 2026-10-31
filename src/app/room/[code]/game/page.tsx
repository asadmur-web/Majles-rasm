'use client';

import RealTimeCanvas from '@/components/advanced/RealTimeCanvas';
import ChatBox from '@/components/ChatBox';
import TaskBox from '@/components/TaskBox';
import LeaveModal from '@/components/LeaveModal';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { socketManager } from '@/lib/socket/client';
import { getRandomTask } from '@/data/tasks';

export default function GamePage() {
  const params = useParams();
  const router = useRouter();
  const code = params.code as string;

  const [timeLeft, setTimeLeft] = useState(30);
  const [word, setWord] = useState('سيارة ليموزين معطلة');
  const [isDrawer, setIsDrawer] = useState(true);
  const [task, setTask] = useState(getRandomTask());
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);

  useEffect(() => {
    socketManager.connect();
    socketManager.joinRoom(code, 'لاعب جديد'); // Simplified

    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [code]);

  const handleLeave = () => {
    socketManager.leaveRoom();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col lg:flex-row">
      <div className="flex-1 flex flex-col">
        <header className="border-b border-slate-800 p-4 flex items-center justify-between bg-slate-900/50">
          <div className="flex items-center gap-4">
            <span className="text-amber-400 font-bold">المرسوم: {word}</span>
            <span className="text-cyan-400 font-mono text-xl">{timeLeft}s</span>
          </div>
          <button onClick={() => setIsLeaveModalOpen(true)} className="text-red-400 hover:text-red-300">خروج</button>
        </header>

        <main className="flex-1 p-4 flex gap-4">
          <div className="flex-1">
            <RealTimeCanvas roomCode={code} isDrawer={isDrawer} />
          </div>

          <div className="w-80 space-y-4">
            <TaskBox task={task} onComplete={() => setTask(getRandomTask())} />
            <ChatBox roomCode={code} />
          </div>
        </main>
      </div>
      <LeaveModal isOpen={isLeaveModalOpen} onConfirm={handleLeave} onCancel={() => setIsLeaveModalOpen(false)} />
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { socketManager } from '@/lib/socket/client';

export default function ChatBox({ roomCode }: { roomCode: string }) {
  const [messages, setMessages] = useState<{id: number, sender: string, text: string}[]>([]);
  const [text, setText] = useState('');

  useEffect(() => {
    socketManager.on('chatMessage', (data: any) => {
      setMessages(prev => [...prev, { id: Date.now(), sender: data.playerId, text: data.message }]);
    });
  }, []);

  const send = () => {
    if (!text.trim()) return;
    socketManager.sendChat(roomCode, text);
    setText('');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl h-64 flex flex-col">
      <h3 className="text-amber-400 font-bold mb-2">الدردشة</h3>
      <div className="flex-1 overflow-y-auto mb-2 space-y-2">
        {messages.map(m => (
          <div key={m.id} className="text-sm">
            <span className="text-cyan-400 font-bold">{m.sender.slice(0, 4)}: </span>
            <span className="text-white">{m.text}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input 
          value={text} 
          onChange={e => setText(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && send()}
          className="flex-1 bg-slate-800 rounded-lg p-2 text-sm text-white"
          placeholder="رسالة..."
        />
        <button onClick={send} className="px-3 bg-amber-500 rounded-lg text-slate-900 font-bold">إرسال</button>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { GameTask } from '@/data/tasks';

export default function TaskBox({ task, onComplete }: { task: GameTask; onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  const handleTaskInteraction = () => {
    // Simulated validation logic
    if (progress < 100) {
      setProgress(p => Math.min(p + 20, 100));
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl">
      <h3 className="text-amber-400 font-bold mb-2">{task.title}</h3>
      <p className="text-slate-300 text-sm mb-4">{task.description}</p>
      
      <div className="h-2 bg-slate-800 rounded-full overflow-hidden mb-4">
        <div 
          className="h-full bg-cyan-400 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <button 
        onClick={handleTaskInteraction}
        className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium"
      >
        {progress < 100 ? 'تنفيذ المهمة' : 'جاري التحقق...'}
      </button>

      {progress === 100 && (
        <button 
          onClick={onComplete}
          className="w-full mt-2 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold"
        >
          إنهاء المهمة
        </button>
      )}
    </div>
  );
}

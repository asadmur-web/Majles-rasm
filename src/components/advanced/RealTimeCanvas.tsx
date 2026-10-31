'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { socketManager } from '@/lib/socket/client';

export default function RealTimeCanvas({ roomCode, isDrawer }: { roomCode: string; isDrawer: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#00D4FF');
  const [size, setSize] = useState(5);
  const [tool, setTool] = useState<'brush' | 'eraser'>('brush');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 1200;
    canvas.height = 800;
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const handleDrawingUpdate = (data: any) => {
      const { type, point } = data;
      if (type === 'start') {
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
      } else if (type === 'move') {
        ctx.lineTo(point.x, point.y);
        ctx.strokeStyle = color;
        ctx.lineWidth = size;
        ctx.lineCap = 'round';
        ctx.stroke();
      }
    };

    socketManager.on('drawingUpdate', handleDrawingUpdate);
    return () => socketManager.off('drawingUpdate', handleDrawingUpdate);
  }, [color, size]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawer) return;
    setIsDrawing(true);
    const rect = canvasRef.current!.getBoundingClientRect();
    const point = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    socketManager.startDrawing(roomCode, point);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !isDrawer) return;
    const rect = canvasRef.current!.getBoundingClientRect();
    const point = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    socketManager.moveDrawing(roomCode, point);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    socketManager.endDrawing(roomCode);
  };

  return (
    <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
      <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center gap-4">
        <button onClick={() => setTool('brush')} className="px-4 py-2 bg-amber-500 text-slate-900 font-bold rounded-lg">فرشاة</button>
        <button onClick={() => setTool('eraser')} className="px-4 py-2 bg-slate-800 text-white rounded-lg">ممحاة</button>
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer" />
        <input type="range" min="1" max="20" value={size} onChange={(e) => setSize(parseInt(e.target.value))} className="w-32" />
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        className="w-full h-[600px] cursor-crosshair"
      />
    </div>
  );
}

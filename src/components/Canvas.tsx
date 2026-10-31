'use client';

import { useEffect, useRef, useState } from 'react';

interface Point { x: number; y: number; }

export default function Canvas() {
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

    canvas.width = 800;
    canvas.height = 600;
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getPoint = (e: React.MouseEvent<HTMLCanvasElement>): Point => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const point = getPoint(e);
    const ctx = canvasRef.current!.getContext('2d')!;
    ctx.beginPath();
    ctx.moveTo(point.x, point.y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const point = getPoint(e);
    const ctx = canvasRef.current!.getContext('2d')!;
    ctx.lineWidth = size;
    ctx.lineCap = 'round';
    ctx.strokeStyle = tool === 'eraser' ? '#0f172a' : color;
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  return (
    <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
      <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center gap-4">
        <button 
          onClick={() => setTool('brush')}
          className={`px-4 py-2 rounded-lg ${tool === 'brush' ? 'bg-amber-500 text-slate-900' : 'bg-slate-800 text-white'}`}
        >
          فرشاة
        </button>
        <button 
          onClick={() => setTool('eraser')}
          className={`px-4 py-2 rounded-lg ${tool === 'eraser' ? 'bg-amber-500 text-slate-900' : 'bg-slate-800 text-white'}`}
        >
          ممحاة
        </button>
        <input 
          type="color" 
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-12 h-10 rounded cursor-pointer"
        />
        <input 
          type="range" 
          min="1" 
          max="20"
          value={size}
          onChange={(e) => setSize(parseInt(e.target.value))}
          className="w-24"
        />
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        className="w-full cursor-crosshair"
        style={{ touchAction: 'none' }}
      />
    </div>
  );
}

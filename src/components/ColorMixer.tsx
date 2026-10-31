'use client';

import { useState } from 'react';

export default function ColorMixer({ onColorChange }: { onColorChange: (color: string) => void }) {
  const [colors, setColors] = useState({
    red: false,
    blue: false,
    yellow: false,
    white: false,
    black: false
  });

  const mixColors = () => {
    const active = Object.entries(colors).filter(([_, active]) => active).map(([color]) => color);
    
    if (active.length === 0) return '#ffffff';
    if (active.length === 1) {
      return active[0] === 'red' ? '#ff0000' : 
             active[0] === 'blue' ? '#0000ff' :
             active[0] === 'yellow' ? '#ffff00' :
             active[0] === 'white' ? '#ffffff' : '#000000';
    }
    
    // Simple mixing logic
    if (active.includes('red') && active.includes('blue')) return '#800080';
    if (active.includes('blue') && active.includes('yellow')) return '#00ff00';
    if (active.includes('red') && active.includes('yellow')) return '#ffa500';
    
    return '#808080';
  };

  const resultColor = mixColors();

  return (
    <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
      <h3 className="text-amber-400 font-bold mb-3">مزيج الألوان</h3>
      <div className="grid grid-cols-5 gap-2 mb-4">
        {Object.entries(colors).map(([color, active]) => (
          <button
            key={color}
            onClick={() => setColors(prev => ({ ...prev, [color]: !prev[color as keyof typeof colors] }))}
            className={`h-12 rounded-lg border-2 transition ${
              active ? 'border-amber-400 scale-110' : 'border-slate-700'
            }`}
            style={{ 
              backgroundColor: 
                color === 'red' ? '#ff0000' :
                color === 'blue' ? '#0000ff' :
                color === 'yellow' ? '#ffff00' :
                color === 'white' ? '#ffffff' : '#000000'
            }}
          />
        ))}
      </div>
      <div 
        className="h-20 rounded-lg border-2 border-slate-700 mb-3"
        style={{ backgroundColor: resultColor }}
      />
      <button 
        onClick={() => onColorChange(resultColor)}
        className="w-full py-2 bg-amber-500 text-slate-900 rounded-lg font-bold"
      >
        استخدام اللون
      </button>
    </div>
  );
}

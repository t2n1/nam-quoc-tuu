
import React from 'react';

interface RadarProps {
  scales: {
    sweetness: number;
    aroma: number;
    body: number;
    finish: number;
    intensity: number;
  };
}

const FlavorRadar: React.FC<RadarProps> = ({ scales }) => {
  const points = [
    { label: 'Ngọt', val: scales.sweetness, x: 50, y: 10 },
    { label: 'Hương', val: scales.aroma, x: 90, y: 40 },
    { label: 'Hậu vị', val: scales.finish, x: 75, y: 85 },
    { label: 'Cấu trúc', val: scales.body, x: 25, y: 85 },
    { label: 'Nồng độ', val: scales.intensity, x: 10, y: 40 },
  ];

  const getPath = (factor: number) => {
    return points.map(p => {
      const cx = 50;
      const cy = 50;
      const dx = (p.x - cx) * (p.val / 5) * factor + cx;
      const dy = (p.y - cy) * (p.val / 5) * factor + cy;
      return `${dx},${dy}`;
    }).join(' ');
  };

  return (
    <div className="relative w-full aspect-square max-w-[300px] mx-auto">
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
        {/* Background webs */}
        {[0.2, 0.4, 0.6, 0.8, 1].map(f => (
          <polygon 
            key={f}
            points={points.map(p => `${(p.x-50)*f+50},${(p.y-50)*f+50}`).join(' ')} 
            fill="none" 
            stroke="white" 
            strokeOpacity="0.05"
          />
        ))}
        {/* Lines from center */}
        {points.map((p, i) => (
          <line key={i} x1="50" y1="50" x2={p.x} y2={p.y} stroke="white" strokeOpacity="0.1" strokeDasharray="1 2" />
        ))}
        {/* Data polygon */}
        <polygon 
          points={getPath(1)} 
          fill="rgba(245, 158, 11, 0.2)" 
          stroke="#f59e0b" 
          strokeWidth="1"
          className="animate-pulse-soft"
        />
        {/* Labels */}
        {points.map((p, i) => (
          <text 
            key={i} 
            x={p.x} 
            y={p.y < 50 ? p.y - 5 : p.y + 10} 
            textAnchor="middle" 
            className="fill-amber-500/50 text-[4px] uppercase font-bold tracking-widest"
          >
            {p.label}
          </text>
        ))}
      </svg>
    </div>
  );
};

export default FlavorRadar;

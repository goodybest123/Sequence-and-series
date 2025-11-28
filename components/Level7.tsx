
import React, { useState } from 'react';

const Level7: React.FC = () => {
  const [depth, setDepth] = useState(0);

  // Calculate Triangle Points
  const size = 300;
  const height = size * (Math.sqrt(3) / 2);
  const p1 = { x: size / 2, y: 0 };
  const p2 = { x: 0, y: height };
  const p3 = { x: size, y: height };

  const renderSierpinski = (x: number, y: number, s: number, d: number): React.ReactNode => {
    if (d === 0) {
      const h = s * (Math.sqrt(3) / 2);
      return (
        <polygon
          points={`${x + s / 2},${y} ${x},${y + h} ${x + s},${y + h}`}
          fill="#EC4899"
          stroke="#831843"
          strokeWidth="1"
        />
      );
    }

    const newSize = s / 2;
    const newH = newSize * (Math.sqrt(3) / 2);

    return (
      <g>
        {renderSierpinski(x + newSize / 2, y, newSize, d - 1)} {/* Top */}
        {renderSierpinski(x, y + newH, newSize, d - 1)} {/* Left */}
        {renderSierpinski(x + newSize, y + newH, newSize, d - 1)} {/* Right */}
      </g>
    );
  };

  const numTriangles = Math.pow(3, depth);
  const areaFraction = Math.pow(0.75, depth);

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-pink-700">Level 7: Infinite Fractals 🔺</h2>
      <p className="mt-2 text-gray-600">
        Fractals are patterns that repeat forever. See how a simple triangle becomes infinitely complex!
      </p>

      <div className="flex justify-center my-8">
        <div className="w-[350px] h-[300px] flex items-center justify-center filter drop-shadow-xl transition-all duration-500">
          <svg width={size} height={height} viewBox={`0 0 ${size} ${height}`}>
            {renderSierpinski(0, 0, size, depth)}
          </svg>
        </div>
      </div>

      <div className="bg-pink-50 rounded-xl p-6 max-w-2xl mx-auto shadow-inner border border-pink-100">
        <div className="grid grid-cols-2 gap-4 text-left">
           <div>
             <h3 className="font-bold text-pink-800">Recursion Depth:</h3>
             <p className="text-3xl font-black text-pink-600">{depth}</p>
           </div>
           <div>
             <h3 className="font-bold text-pink-800">Number of Triangles:</h3>
             <p className="text-3xl font-black text-pink-600">{numTriangles}</p>
             <p className="text-xs text-gray-500">Sequence: 1, 3, 9, 27...</p>
           </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-pink-200">
             <p className="text-sm text-gray-700">
               <strong>Math Fact:</strong> At each step, we remove the middle triangle (1/4th of the area). 
               The remaining area is <span className="font-bold text-pink-700">{(areaFraction * 100).toFixed(1)}%</span> of the original!
             </p>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <button 
          onClick={() => setDepth(Math.max(0, depth - 1))}
          disabled={depth === 0}
          className="bg-gray-400 hover:bg-gray-500 disabled:opacity-50 text-white font-bold py-3 px-6 rounded-lg shadow transition-transform transform active:scale-95"
        >
          - Remove Level
        </button>
        <button 
          onClick={() => setDepth(Math.min(6, depth + 1))}
          disabled={depth >= 6}
          className="bg-pink-500 hover:bg-pink-600 disabled:opacity-50 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform transform active:scale-95 hover:scale-105"
        >
          + Add Level
        </button>
      </div>
    </div>
  );
};

export default Level7;
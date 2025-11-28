import React, { useState, useEffect } from 'react';
import NumberPad from './NumberPad';
import Feedback from './Feedback';

// Pre-calculated positions for the Golden Spiral visualization
// x, y are coordinates, s is size (side length), labelPos determines where the number sits
const fibLayout = [
  { val: 1, x: 0, y: 0, s: 10, color: 'bg-red-400', path: 'M 0 10 A 10 10 0 0 1 10 0' },
  { val: 1, x: 10, y: 0, s: 10, color: 'bg-orange-400', path: 'M 10 0 A 10 10 0 0 1 20 10' },
  { val: 2, x: 0, y: 10, s: 20, color: 'bg-yellow-400', path: 'M 20 10 A 20 20 0 0 1 0 30' },
  { val: 3, x: -30, y: 0, s: 30, color: 'bg-green-400', path: 'M 0 30 A 30 30 0 0 1 -30 0' },
  { val: 5, x: -30, y: -50, s: 50, color: 'bg-teal-400', path: 'M -30 0 A 50 50 0 0 1 20 -50' },
  { val: 8, x: 20, y: -50, s: 80, color: 'bg-blue-400', path: 'M 20 -50 A 80 80 0 0 1 100 30' },
  { val: 13, x: -30, y: 30, s: 130, color: 'bg-indigo-400', path: 'M 100 30 A 130 130 0 0 1 -30 160' },
  { val: 21, x: -240, y: -50, s: 210, color: 'bg-purple-400', path: 'M -30 160 A 210 210 0 0 1 -240 -50' }
];

const Level6: React.FC = () => {
  const [sequence, setSequence] = useState<number[]>([1, 1]); // Start with 1, 1
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' | 'celebration' } | null>(null);
  
  // To handle the visualization scaling
  const maxIndex = fibLayout.length;
  
  const currentTarget = sequence.length < maxIndex 
    ? sequence[sequence.length - 1] + sequence[sequence.length - 2] 
    : null;

  const checkAnswer = () => {
    if (!currentTarget) return;

    if (parseInt(input, 10) === currentTarget) {
      setFeedback({ message: 'Correct! The spiral grows...', type: 'success' });
      setSequence(prev => [...prev, currentTarget]);
      setInput('');
      
      if (sequence.length + 1 === maxIndex) {
        setTimeout(() => {
             setFeedback({ message: 'You built the Golden Spiral! This pattern appears in shells, flowers, and galaxies.', type: 'celebration' });
        }, 1000);
      }
    } else {
       setFeedback({ message: `Not quite. Add the last two numbers: ${sequence[sequence.length-2]} + ${sequence[sequence.length-1]}`, type: 'error' });
    }
  };

  const resetGame = () => {
    setSequence([1, 1]);
    setInput('');
    setFeedback(null);
  };

  // Calculate viewBox to keep the spiral centered as it grows
  // This is a rough estimation based on the layout logic
  const getViewBox = () => {
      const len = sequence.length;
      if (len <= 2) return "-20 -20 60 60";
      if (len <= 4) return "-40 -20 80 80";
      if (len <= 5) return "-50 -70 140 140";
      if (len <= 6) return "-50 -70 170 170";
      if (len <= 7) return "-100 -50 250 250";
      return "-250 -100 500 500";
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-teal-700">Level 6: Nature's Code 🐚</h2>
      <p className="mt-2 text-gray-600">
        This is the <span className="font-bold text-teal-600">Fibonacci Sequence</span>. 
        Add the last two numbers to find the next one and build the spiral!
      </p>

      {/* Visualization Area */}
      <div className="my-6 mx-auto bg-white border-4 border-teal-100 rounded-xl shadow-inner overflow-hidden relative" style={{ height: '350px', maxWidth: '100%' }}>
        <svg viewBox={getViewBox()} className="w-full h-full transition-all duration-1000 ease-in-out">
            {sequence.map((num, i) => {
                const layout = fibLayout[i];
                if (!layout) return null;
                
                // Color mapping from tailwind classes to hex for SVG
                const colors = ['#F87171', '#FB923C', '#FACC15', '#4ADE80', '#2DD4BF', '#60A5FA', '#818CF8', '#C084FC'];

                return (
                    <g key={i} className="transition-all duration-700 animate-in fade-in zoom-in">
                        <rect 
                            x={layout.x} 
                            y={layout.y} 
                            width={layout.s} 
                            height={layout.s} 
                            fill={colors[i]} 
                            stroke="white"
                            strokeWidth="1"
                            opacity="0.8"
                        />
                        <path 
                            d={layout.path}
                            fill="none"
                            stroke="#444"
                            strokeWidth={layout.s / 20}
                            strokeLinecap="round"
                        />
                        <text 
                            x={layout.x + layout.s/2} 
                            y={layout.y + layout.s/2} 
                            dominantBaseline="middle" 
                            textAnchor="middle" 
                            fontSize={layout.s / 2.5}
                            fill="white"
                            fontWeight="bold"
                            style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}
                        >
                            {num}
                        </text>
                    </g>
                );
            })}
        </svg>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center mt-8">
        <div className="text-center">
          <h3 className="text-xl font-bold">What is the next number?</h3>
          <p className="text-gray-600 text-lg">
             Sequence: {sequence.join(', ')}...
          </p>
          <div className="mt-4 p-4 bg-gray-100 rounded-lg max-w-sm mx-auto">
             <p className="font-bold text-lg">
                 {sequence[sequence.length-2]} + {sequence[sequence.length-1]} = ?
             </p>
            <div className="text-4xl font-black text-teal-600 h-12 my-2">{input || '?'}</div>
          </div>
           {feedback && <Feedback message={feedback.message} type={feedback.type} />}
        </div>
        <div>
          {sequence.length < maxIndex ? (
             <NumberPad value={input} onValueChange={setInput} onSubmit={checkAnswer} />
          ) : (
              <div className="flex flex-col items-center justify-center h-full">
                  <p className="text-2xl font-bold text-teal-600 mb-4">Complete!</p>
                  <button onClick={resetGame} className="bg-teal-500 text-white font-bold py-3 px-8 rounded-lg text-xl shadow-lg hover:bg-teal-600 transition-all transform hover:scale-105">
                    Start Again
                  </button>
              </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Level6;

import React, { useState, useMemo } from 'react';
import { SequenceType } from '../types';

const Level4: React.FC = () => {
  const [type, setType] = useState<SequenceType>('arithmetic');
  const [terms, setTerms] = useState<number[]>([]);
  const start = 1;
  const commonValue = type === 'arithmetic' ? 1 : 2;

  const nextTerm = useMemo(() => {
    if (terms.length === 0) return start;
    if (type === 'arithmetic') {
      return terms[terms.length - 1] + commonValue;
    }
    return terms[terms.length - 1] * commonValue;
  }, [terms, type, commonValue]);
  
  const sum = useMemo(() => terms.reduce((acc, val) => acc + val, 0), [terms]);

  const addTerm = () => {
    if (terms.length >= 8) return; // limit visualization
    setTerms(prev => [...prev, nextTerm]);
  };

  const reset = () => {
    setTerms([]);
  };

  const handleTypeChange = (newType: SequenceType) => {
    setType(newType);
    reset();
  };
  
  const Visualizer = () => {
    if (type === 'arithmetic') {
      return (
        <div className="flex items-end justify-center gap-1 h-64 bg-gray-200 p-4 rounded-lg">
          {terms.map((term, index) => (
            <div key={index} className="flex flex-col-reverse gap-1" style={{width: 'calc(12.5% - 4px)'}}>
              {[...Array(term)].map((_, i) => (
                <div key={i} className="w-full h-4 bg-blue-500 rounded-sm" style={{animation: 'pop-in 0.3s ease-out'}}></div>
              ))}
            </div>
          ))}
          <style>{`
            @keyframes pop-in {
              0% { transform: scale(0.5); opacity: 0; }
              100% { transform: scale(1); opacity: 1; }
            }
          `}</style>
        </div>
      );
    } else { // Geometric
      const maxTerm = Math.max(...terms, 1);
      return (
        <div className="flex items-end justify-center gap-2 h-64 bg-sky-100 p-4 rounded-lg">
           {terms.map((term, index) => (
             <div key={index} className="w-16 h-full border-2 border-blue-400 bg-white rounded-t-lg relative flex flex-col-reverse" style={{animation: 'pop-in 0.3s ease-out'}}>
                <div className="bg-blue-400 transition-all duration-500" style={{ height: `${(term / maxTerm) * 100}%`}}></div>
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 font-bold">{term}</span>
             </div>
           ))}
        </div>
      );
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-indigo-700">Level 4: Building Sums 🧱💧</h2>
      <p className="mt-2 text-gray-600">Visualize how series add up by adding terms one by one.</p>
      
      <div className="flex justify-center gap-4 my-6">
        <button onClick={() => handleTypeChange('arithmetic')} className={`px-4 py-2 rounded-lg font-bold ${type === 'arithmetic' ? 'bg-indigo-500 text-white' : 'bg-gray-200'}`}>Arithmetic Series</button>
        <button onClick={() => handleTypeChange('geometric')} className={`px-4 py-2 rounded-lg font-bold ${type === 'geometric' ? 'bg-indigo-500 text-white' : 'bg-gray-200'}`}>Geometric Series</button>
      </div>

      <div className="max-w-3xl mx-auto my-8">
        <Visualizer />
      </div>

      <div className="bg-gray-50 p-6 rounded-lg max-w-3xl mx-auto">
        <h3 className="text-xl font-bold">Sum Calculation</h3>
        <p className="text-gray-600 text-lg my-4 h-12 break-words">
          Sum = {terms.length > 0 ? terms.join(' + ') : '0'}
        </p>
        <p className="text-3xl font-black text-indigo-700">
          Total = {sum}
        </p>
      </div>
      
      <div className="mt-8 flex justify-center gap-4">
        <button onClick={addTerm} disabled={terms.length >= 8} className="bg-green-500 text-white font-bold py-3 px-6 rounded-lg text-xl shadow-lg hover:bg-green-600 transition-all disabled:bg-gray-400">
          Add Next Term ({nextTerm})
        </button>
        <button onClick={reset} className="bg-red-500 text-white font-bold py-3 px-6 rounded-lg text-xl shadow-lg hover:bg-red-600 transition-all">
          Reset
        </button>
      </div>
    </div>
  );
};

export default Level4;

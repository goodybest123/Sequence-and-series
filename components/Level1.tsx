
import React, { useState, useMemo, useCallback } from 'react';
import NumberPad from './NumberPad';
import Feedback from './Feedback';
import RabbitIcon from './icons/RabbitIcon';

const Level1: React.FC = () => {
  const [start, setStart] = useState(2);
  const [diff, setDiff] = useState(3);
  const [sequence, setSequence] = useState<number[]>([2]);
  const [prediction, setPrediction] = useState('');
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const nextTerm = useMemo(() => sequence[sequence.length - 1] + diff, [sequence, diff]);

  const handleStart = () => {
    setSequence([start]);
    setIsGameStarted(true);
    setFeedback(null);
    setPrediction('');
  };

  const checkPrediction = useCallback(() => {
    if (parseInt(prediction, 10) === nextTerm) {
      setFeedback({ message: 'Great! The pattern continues perfectly!', type: 'success' });
      setTimeout(() => {
        setSequence(prev => [...prev, nextTerm]);
        setPrediction('');
        setFeedback(null);
      }, 1000);
    } else {
      setFeedback({ message: 'Not quite. Look for what changes each time.', type: 'error' });
    }
  }, [prediction, nextTerm]);

  const resetGame = () => {
      setIsGameStarted(false);
      setSequence([start]);
      setFeedback(null);
      setPrediction('');
  }

  if (!isGameStarted) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-blue-700">Level 1: Arithmetic Hops 🐇</h2>
        <p className="mt-2 text-gray-600">Set the rabbit's starting position and how much it hops each time.</p>
        <div className="flex justify-center items-center gap-4 mt-6">
          <label className="font-bold">Starting Number: <input type="number" value={start} onChange={e => setStart(parseInt(e.target.value, 10))} className="w-20 p-2 border-transparent text-center bg-blue-700 text-white font-bold rounded-md" /></label>
          <label className="font-bold">Common Difference: <input type="number" value={diff} onChange={e => setDiff(parseInt(e.target.value, 10))} className="w-20 p-2 border-transparent text-center bg-blue-700 text-white font-bold rounded-md" /></label>
        </div>
        <button onClick={handleStart} className="mt-6 bg-green-500 text-white font-bold py-3 px-6 rounded-lg text-xl shadow-lg hover:bg-green-600 transition-all transform hover:scale-105">Start Hopping!</button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-700 text-center">Level 1: Arithmetic Hops 🐇</h2>
      <div className="relative h-32 mt-8 mb-4 p-4 bg-green-200 rounded-lg overflow-hidden">
        <div className="absolute bottom-4 left-0 right-0 h-1 bg-yellow-700"></div>
        {sequence.map((term, index) => (
          <div key={index} style={{ left: `${5 + index * 15}%` }} className="absolute bottom-6 transition-all duration-500">
            <div className="bg-gray-400 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">{term}</div>
          </div>
        ))}
        <RabbitIcon 
            className="w-12 h-12 text-yellow-800 absolute bottom-16 transition-all duration-500"
            style={{ left: `${-2 + (sequence.length - 1) * 15}%` }}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center mt-8">
        <div className="text-center">
          <h3 className="text-xl font-bold">Predict the next hop!</h3>
          <p className="text-gray-600">The sequence is: {sequence.join(', ')}, ...</p>
          <div className="mt-4 p-4 bg-gray-100 rounded-lg max-w-sm mx-auto">
            <p className="font-bold text-lg">Your Prediction:</p>
            <div className="text-4xl font-black text-blue-600 h-12 my-2">{prediction || '?'}</div>
          </div>
           {feedback && <Feedback message={feedback.message} type={feedback.type} />}
        </div>
        <div>
          <NumberPad value={prediction} onValueChange={setPrediction} onSubmit={checkPrediction} />
        </div>
      </div>
       <div className="text-center mt-8">
        <button onClick={resetGame} className="bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600 transition-all">Reset Level</button>
      </div>
    </div>
  );
};

export default Level1;


import React, { useState, useMemo, useCallback } from 'react';
import NumberPad from './NumberPad';
import Feedback from './Feedback';
import PlantIcon from './icons/PlantIcon';

const Level2: React.FC = () => {
  const [firstTerm, setFirstTerm] = useState(1);
  const [ratio, setRatio] = useState(2);
  const [sequence, setSequence] = useState<number[]>([1]);
  const [prediction, setPrediction] = useState('');
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const nextTerm = useMemo(() => sequence[sequence.length - 1] * ratio, [sequence, ratio]);

  const handleStart = () => {
    setSequence([firstTerm]);
    setIsGameStarted(true);
    setFeedback(null);
    setPrediction('');
  };

  const checkPrediction = useCallback(() => {
    if (parseInt(prediction, 10) === nextTerm) {
      setFeedback({ message: 'Amazing growth! That\'s correct!', type: 'success' });
      setTimeout(() => {
        setSequence(prev => [...prev, nextTerm]);
        setPrediction('');
        setFeedback(null);
      }, 1000);
    } else {
      setFeedback({ message: 'Not quite. Remember, it\'s multiplying each day!', type: 'error' });
    }
  }, [prediction, nextTerm]);
  
  const resetGame = () => {
      setIsGameStarted(false);
      setSequence([firstTerm]);
      setFeedback(null);
      setPrediction('');
  }

  if (!isGameStarted) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-green-700">Level 2: Geometric Growth 🌱</h2>
        <p className="mt-2 text-gray-600">Set the plant's starting height and how much it multiplies by each day.</p>
        <div className="flex justify-center items-center gap-4 mt-6">
          <label className="font-bold">Starting Height (Day 1): <input type="number" value={firstTerm} onChange={e => setFirstTerm(parseInt(e.target.value, 10))} className="w-20 p-2 border-transparent text-center bg-green-700 text-white font-bold rounded-md" /></label>
          <label className="font-bold">Growth Multiplier: <input type="number" value={ratio} onChange={e => setRatio(parseInt(e.target.value, 10))} className="w-20 p-2 border-transparent text-center bg-green-700 text-white font-bold rounded-md" /></label>
        </div>
        <button onClick={handleStart} className="mt-6 bg-green-500 text-white font-bold py-3 px-6 rounded-lg text-xl shadow-lg hover:bg-green-600 transition-all transform hover:scale-105">Start Growing!</button>
      </div>
    );
  }

  const currentHeight = sequence[sequence.length - 1];

  return (
    <div>
      <h2 className="text-2xl font-bold text-green-700 text-center">Level 2: Geometric Growth 🌱</h2>
      <div className="flex justify-center items-end h-64 mt-8 mb-4 p-4 bg-sky-200 rounded-lg">
        <div className="flex flex-col items-center">
          <PlantIcon height={currentHeight * 5} className="w-24 h-48" />
          <p className="mt-2 font-bold text-lg bg-white/70 px-3 py-1 rounded-full">Day {sequence.length}: {currentHeight} cm</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center mt-8">
        <div className="text-center">
          <h3 className="text-xl font-bold">Predict the height for Day {sequence.length + 1}!</h3>
          <p className="text-gray-600">The growth sequence is: {sequence.join(', ')}, ...</p>
          <div className="mt-4 p-4 bg-gray-100 rounded-lg max-w-sm mx-auto">
            <p className="font-bold text-lg">Your Prediction:</p>
            <div className="text-4xl font-black text-green-600 h-12 my-2">{prediction || '?'}</div>
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

export default Level2;

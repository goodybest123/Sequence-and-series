
import React, { useState, useEffect, useCallback } from 'react';
import { generateProblem } from '../services/geminiService';
import { GeneratedProblem } from '../types';
import NumberPad from './NumberPad';
import Feedback from './Feedback';

const Level5: React.FC = () => {
  const [problem, setProblem] = useState<GeneratedProblem | null>(null);
  const [loading, setLoading] = useState(true);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' | 'celebration' } | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);

  const fetchNewProblem = useCallback(async () => {
    setLoading(true);
    setFeedback(null);
    setUserAnswer('');
    setIsCorrect(false);
    const newProblem = await generateProblem();
    setProblem(newProblem);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchNewProblem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAnswer = () => {
    if (!problem) return;
    const answer = parseInt(userAnswer, 10);
    if (answer === problem.answer) {
      setFeedback({ message: `You got it! The correct answer is ${problem.answer}. Fantastic work! 🌈`, type: 'celebration' });
      setIsCorrect(true);
    } else {
      let hint = '';
      if(problem.sequenceType === 'arithmetic') {
          hint = `Remember, for an arithmetic sequence, you add ${problem.commonValue} each time.`;
      } else {
          hint = `For a geometric sequence, you multiply by ${problem.commonValue} each time.`
      }
      setFeedback({ message: `Not quite. ${hint} Try to trace the pattern again.`, type: 'error' });
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-orange-700">Level 5: Real World Puzzles 🌍</h2>
      <p className="mt-2 text-gray-600">Apply your pattern-finding skills to solve these story problems!</p>

      <div className="my-8 p-6 bg-yellow-100 border-l-4 border-yellow-500 rounded-r-lg min-h-[150px] flex items-center justify-center">
        {loading ? (
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-700"></div>
        ) : (
          <p className="text-xl text-gray-800 leading-relaxed">{problem?.problemText}</p>
        )}
      </div>
      
      {feedback && <Feedback message={feedback.message} type={feedback.type} />}

      <div className="grid md:grid-cols-2 gap-8 items-center mt-8">
        <div className="text-center">
          <h3 className="text-xl font-bold">What's your answer?</h3>
          <div className="mt-4 p-4 bg-gray-100 rounded-lg max-w-sm mx-auto">
            <p className="font-bold text-lg">Your Answer:</p>
            <div className="text-4xl font-black text-orange-600 h-12 my-2">{userAnswer || '?'}</div>
          </div>
        </div>
        <div>
          <NumberPad value={userAnswer} onValueChange={setUserAnswer} onSubmit={checkAnswer} disabled={isCorrect}/>
        </div>
      </div>

       <div className="text-center mt-8">
        <button onClick={fetchNewProblem} className="bg-orange-500 text-white font-bold py-3 px-6 rounded-lg text-xl shadow-lg hover:bg-orange-600 transition-all">
          {isCorrect ? 'Next Challenge!' : 'New Problem'}
        </button>
      </div>

    </div>
  );
};

export default Level5;


import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Feedback from './Feedback';
import { SequenceType } from '../types';

const generateSequence = () => {
    const type: SequenceType = Math.random() > 0.5 ? 'arithmetic' : 'geometric';
    const start = Math.floor(Math.random() * 5) + 1;
    let commonValue: number;
    if (type === 'arithmetic') {
        commonValue = Math.floor(Math.random() * 5) + 2;
    } else {
        commonValue = Math.floor(Math.random() * 2) + 2; // Keep ratio small (2 or 3)
    }

    const sequence = [start];
    for (let i = 0; i < 4; i++) {
        if (type === 'arithmetic') {
            sequence.push(sequence[i] + commonValue);
        } else {
            sequence.push(sequence[i] * commonValue);
        }
    }

    const hiddenIndex = Math.floor(Math.random() * 3) + 1; // hide index 1, 2 or 3
    const hiddenValue = sequence[hiddenIndex];

    return { sequence, hiddenIndex, hiddenValue, type, commonValue };
};


const Level3: React.FC = () => {
    const [gameState, setGameState] = useState(generateSequence());
    const [guessType, setGuessType] = useState<SequenceType>('arithmetic');
    const [guessValue, setGuessValue] = useState('');
    const [guessHidden, setGuessHidden] = useState('');
    const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' | 'celebration' } | null>(null);
    const [solved, setSolved] = useState(false);

    const resetGame = useCallback(() => {
        setGameState(generateSequence());
        setGuessType('arithmetic');
        setGuessValue('');
        setGuessHidden('');
        setFeedback(null);
        setSolved(false);
    }, []);

    const checkAnswer = () => {
        const isTypeCorrect = guessType === gameState.type;
        const isValueCorrect = parseInt(guessValue, 10) === gameState.commonValue;
        const isHiddenCorrect = parseInt(guessHidden, 10) === gameState.hiddenValue;

        if (isTypeCorrect && isValueCorrect && isHiddenCorrect) {
            setFeedback({ message: 'You cracked the code! Perfect!', type: 'celebration' });
            setSolved(true);
        } else {
            let message = 'Not quite! ';
            if(!isTypeCorrect) message += "Check if it's adding or multiplying. ";
            else if (!isValueCorrect) message += "The rule isn't quite right. ";
            else if (!isHiddenCorrect) message += "The missing number is incorrect. ";
            setFeedback({ message, type: 'error' });
        }
    }

    return (
        <div className="text-center">
            <h2 className="text-2xl font-bold text-purple-700">Level 3: Pattern Detective 🧠</h2>
            <p className="mt-2 text-gray-600">Find the rule and fill in the missing number in the sequence!</p>
            
            <div className="flex justify-center items-center gap-4 my-8">
                {gameState.sequence.map((term, index) => (
                    <div key={index} className={`w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center font-bold text-2xl sm:text-3xl rounded-lg shadow-md transition-all duration-500 ${
                        index === gameState.hiddenIndex ? 'bg-yellow-300 text-yellow-800' : 'bg-blue-200 text-blue-800'
                    } ${
                        (solved && index === gameState.hiddenIndex) ? 'transform scale-110' : ''
                    }`}>
                        {(index === gameState.hiddenIndex && !solved) ? '?' : term}
                    </div>
                ))}
            </div>

            {feedback && <Feedback message={feedback.message} type={feedback.type} />}

            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto items-end bg-gray-50 p-6 rounded-lg">
                <div>
                    <label className="font-bold text-lg">1. What's the Rule?</label>
                    <div className="flex gap-2 mt-2">
                        <button onClick={() => setGuessType('arithmetic')} className={`w-full p-2 rounded ${guessType === 'arithmetic' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>Add (+)</button>
                        <button onClick={() => setGuessType('geometric')} className={`w-full p-2 rounded ${guessType === 'geometric' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>Multiply (x)</button>
                    </div>
                    <input type="number" placeholder="e.g., 3" value={guessValue} onChange={e => setGuessValue(e.target.value)} className="w-full p-2 mt-2 border-transparent text-center bg-purple-700 text-white font-bold rounded disabled:bg-gray-500 placeholder-purple-300" disabled={solved} />
                </div>
                <div>
                    <label className="font-bold text-lg">2. What's the Missing Number?</label>
                    <input type="number" placeholder="?" value={guessHidden} onChange={e => setGuessHidden(e.target.value)} className="w-full p-2 mt-2 border-transparent text-center bg-purple-700 text-white font-bold rounded disabled:bg-gray-500 placeholder-purple-300" disabled={solved} />
                </div>
                <div className="md:col-span-3 lg:col-span-1">
                     <button onClick={checkAnswer} disabled={solved || !guessValue || !guessHidden} className="w-full bg-blue-500 text-white font-bold py-3 px-6 rounded-lg text-xl shadow-lg hover:bg-blue-600 transition-all disabled:bg-gray-400">Solve!</button>
                </div>
            </div>
            
            <button onClick={resetGame} className="mt-8 bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600 transition-all">New Puzzle</button>
        </div>
    );
};

export default Level3;

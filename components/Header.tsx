
import React from 'react';
import { Level } from '../types';

interface HeaderProps {
  currentLevel: Level;
  setCurrentLevel: (level: Level) => void;
}

const levelData = [
  { id: Level.Arithmetic, title: 'Level 1: Arithmetic Hops', icon: '🐇' },
  { id: Level.Geometric, title: 'Level 2: Growing Plants', icon: '🌱' },
  { id: Level.Recognition, title: 'Level 3: Pattern Detective', icon: '🧠' },
  { id: Level.Series, title: 'Level 4: Building Sums', icon: '🧱' },
  { id: Level.Challenge, title: 'Level 5: Real World Puzzles', icon: '🌍' },
  { id: Level.Fibonacci, title: 'Level 6: Nature\'s Code', icon: '🐚' },
];

const Header: React.FC<HeaderProps> = ({ currentLevel, setCurrentLevel }) => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-black text-blue-800 drop-shadow-md">
        Pattern Path
      </h1>
      <p className="text-lg text-gray-600 mt-2">The Journey of Sequences and Series</p>
      <nav className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-4">
        {levelData.map((level) => (
          <button
            key={level.id}
            onClick={() => setCurrentLevel(level.id)}
            className={`flex-shrink-0 px-3 sm:px-4 py-2 text-sm sm:text-base font-bold rounded-full transition-all duration-300 transform hover:scale-105 ${
              currentLevel === level.id
                ? 'bg-yellow-400 text-yellow-900 shadow-lg scale-105'
                : 'bg-white text-blue-700 hover:bg-yellow-200 shadow-md'
            }`}
          >
            <span className="hidden sm:inline-block mr-2">{level.icon}</span>
            {level.title}
          </button>
        ))}
      </nav>
    </header>
  );
};

export default Header;
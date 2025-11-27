
import React, { useState, useCallback } from 'react';
import { Level } from './types';
import Header from './components/Header';
import Level1 from './components/Level1';
import Level2 from './components/Level2';
import Level3 from './components/Level3';
import Level4 from './components/Level4';
import Level5 from './components/Level5';
import Level6 from './components/Level6';
import Background from './components/Background';

const App: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState<Level>(Level.Arithmetic);

  const renderLevel = useCallback(() => {
    switch (currentLevel) {
      case Level.Arithmetic:
        return <Level1 />;
      case Level.Geometric:
        return <Level2 />;
      case Level.Recognition:
        return <Level3 />;
      case Level.Series:
        return <Level4 />;
      case Level.Challenge:
        return <Level5 />;
      case Level.Fibonacci:
        return <Level6 />;
      default:
        return <Level1 />;
    }
  }, [currentLevel]);

  return (
    <div className="relative min-h-screen text-gray-800 overflow-hidden">
      <Background />
      <div className="relative z-10 container mx-auto px-4 py-8">
        <Header currentLevel={currentLevel} setCurrentLevel={setCurrentLevel} />
        <main className="mt-8 bg-white/70 backdrop-blur-sm p-4 sm:p-8 rounded-2xl shadow-lg">
          {renderLevel()}
        </main>
      </div>
      <footer className="relative z-10 text-center py-4 text-gray-500 text-sm">
        <p>Pattern Path: The Journey of Sequences and Series</p>
      </footer>
    </div>
  );
};

export default App;
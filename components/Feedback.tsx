
import React from 'react';

interface FeedbackProps {
  message: string;
  type: 'success' | 'error' | 'info' | 'celebration';
}

const Feedback: React.FC<FeedbackProps> = ({ message, type }) => {
  const baseClasses = 'p-4 rounded-lg text-center font-bold text-lg my-4 transition-all duration-300';
  const typeClasses = {
    success: 'bg-green-200 text-green-800',
    error: 'bg-red-200 text-red-800',
    info: 'bg-blue-200 text-blue-800',
    celebration: 'bg-yellow-200 text-yellow-800 animate-pulse',
  };

  if (!message) return null;

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`}>
      {type === 'success' && '✅ '}
      {type === 'error' && '💡 '}
      {type === 'celebration' && '🌈 '}
      {message}
    </div>
  );
};

export default Feedback;

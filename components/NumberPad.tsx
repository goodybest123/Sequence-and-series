
import React from 'react';

interface NumberPadProps {
  value: string;
  onValueChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
}

const NumberPad: React.FC<NumberPadProps> = ({ value, onValueChange, onSubmit, disabled = false }) => {
  const handleNumberClick = (num: string) => {
    if (disabled) return;
    onValueChange(value + num);
  };

  const handleBackspace = () => {
    if (disabled) return;
    onValueChange(value.slice(0, -1));
  };
  
  const handleClear = () => {
    if (disabled) return;
    onValueChange('');
  };

  const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'];

  const renderButton = (btn: string) => {
    switch (btn) {
      case 'C':
        return <button key={btn} onClick={handleClear} className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-lg text-xl transition-transform transform hover:scale-105" disabled={disabled}>C</button>;
      case '⌫':
        return <button key={btn} onClick={handleBackspace} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-lg text-xl transition-transform transform hover:scale-105" disabled={disabled}>⌫</button>;
      default:
        return <button key={btn} onClick={() => handleNumberClick(btn)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg text-xl transition-transform transform hover:scale-105" disabled={disabled}>{btn}</button>;
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="grid grid-cols-3 gap-2">
        {buttons.map(renderButton)}
      </div>
      <button 
        onClick={onSubmit} 
        disabled={disabled || value === ''}
        className="w-full mt-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg text-xl transition-transform transform hover:scale-105">
        Check
      </button>
    </div>
  );
};

export default NumberPad;

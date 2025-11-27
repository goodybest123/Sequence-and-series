
import React from 'react';

const PlantIcon: React.FC<{ height: number, className?: string }> = ({ height, className }) => {
  const stemHeight = Math.max(0, height - 20);
  const leafScale = Math.min(1, height / 50);

  return (
    <svg 
      viewBox="0 0 50 100" 
      className={className} 
      style={{ transition: 'all 0.5s ease-in-out', overflow: 'visible' }}
    >
      {/* Pot */}
      <path d="M10 90 H40 L35 100 H15 Z" fill="#D2691E" />
      <path d="M8 85 H42 V90 H8 Z" fill="#8B4513" />
      
      {/* Stem */}
      {height > 0 && <rect x="22.5" y={85 - stemHeight} width="5" height={stemHeight} fill="green" />}
      
      {/* Leaves */}
      {height > 10 && (
        <g transform={`translate(25, ${85 - stemHeight}) scale(${leafScale})`}>
          <path d="M-2.5 0 C-15 -10 -15 -20 0 -30" stroke="green" strokeWidth="3" fill="none" />
          <path d="M2.5 0 C15 -10 15 -20 0 -30" stroke="green" strokeWidth="3" fill="none" />
        </g>
      )}

      {/* Flower */}
      {height > 40 && (
        <g transform={`translate(25, ${85 - stemHeight - 30*leafScale})`}>
            <circle cx="0" cy="0" r="8" fill="yellow" />
            <circle cx="0" cy="0" r="4" fill="#C46200" />
        </g>
      )}
    </svg>
  );
};

export default PlantIcon;

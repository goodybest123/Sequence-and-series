import React from 'react';

// FIX: Added style prop to allow dynamic positioning of the icon.
const RabbitIcon: React.FC<{className?: string; style?: React.CSSProperties}> = ({className, style}) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    style={style}
  >
    <path d="M16,3c0,1.1-0.9,2-2,2s-2-0.9-2-2c0-1.1-0.9-2-2-2S8,1.9,8,3c0,1.1-0.9,2-2,2s-2-0.9-2-2H2v2c0,3.3,2.7,6,6,6v2H6v2h2v4h4v-4h2v-2h-2v-2c3.3,0,6-2.7,6-6V3H16z M12,11c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S13.1,11,12,11z M6,7C4.9,7,4,6.1,4,5V4h1v1c0,0.6,0.4,1,1,1s1-0.4,1-1V4h1v1C8,6.1,7.1,7,6,7z M18,7c-1.1,0-2-0.9-2-2V4h1v1c0,0.6,0.4,1,1,1s1-0.4,1-1V4h1v1C20,6.1,19.1,7,18,7z"/>
  </svg>
);

export default RabbitIcon;

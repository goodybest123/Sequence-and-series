import React from 'react';

const Tree = () => (
  <div className="absolute bottom-[calc(33.33%-20px)] left-[5%] w-32 md:w-48 h-48 md:h-72 opacity-90">
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 md:w-8 h-24 md:h-40 bg-[#8B5E3C] rounded-t-lg"></div>
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 md:w-48 h-32 md:h-48 bg-[#66A646] rounded-full"></div>
    <div className="absolute top-4 left-[-10px] md:left-0 w-24 md:w-36 h-24 md:h-36 bg-[#7CB342] rounded-full"></div>
    <div className="absolute top-4 right-[-10px] md:right-0 w-24 md:w-36 h-24 md:h-36 bg-[#8BC34A] rounded-full"></div>
  </div>
);

const StrawberryPlant = () => (
  <div className="absolute bottom-[33.33%] right-[8%] w-24 h-24 md:w-32 md:h-32 opacity-95">
      {/* Stems */}
      <div className="absolute bottom-0 left-1/2 w-1 h-12 bg-green-700 origin-bottom -rotate-12"></div>
      <div className="absolute bottom-0 left-1/2 w-1 h-16 bg-green-700 origin-bottom rotate-6"></div>
      <div className="absolute bottom-0 left-1/2 w-1 h-10 bg-green-700 origin-bottom rotate-20"></div>
      {/* Leaves */}
      <div className="absolute top-4 left-4 w-8 h-8 bg-green-600 rounded-full -rotate-12"></div>
      <div className="absolute top-8 left-12 w-10 h-10 bg-green-600 rounded-tl-full rounded-br-full"></div>
      {/* Strawberries */}
      <div className="absolute top-0 right-4 w-5 h-5 md:w-6 md:h-6 bg-red-500 rounded-full"><div className="w-2 h-2 bg-green-800 rounded-full ml-2 -mt-1"></div></div>
      <div className="absolute top-8 right-0 w-4 h-4 md:w-5 md:h-5 bg-red-500 rounded-full"><div className="w-1.5 h-1.5 bg-green-800 rounded-full ml-1.5 -mt-1"></div></div>
      <div className="absolute top-12 right-12 md:right-16 w-4 h-4 md:w-5 md:h-5 bg-red-500 rounded-full"><div className="w-1.5 h-1.5 bg-green-800 rounded-full ml-1.5 -mt-1"></div></div>
  </div>
);


const Background: React.FC = () => {
  return (
    <div className="absolute inset-0 -z-50 overflow-hidden bg-gradient-to-b from-[#87CEEB] to-[#B0E0E6]">
      {/* Clouds */}
      <div className="absolute top-[10%] left-[10%] w-40 h-12 bg-white/70 rounded-full blur-md animate-[cloud-flow_80s_linear_infinite]"></div>
      <div className="absolute top-[20%] left-[60%] w-60 h-20 bg-white/70 rounded-full blur-md animate-[cloud-flow_120s_linear_infinite_5s]"></div>
      <div className="absolute top-[15%] left-[80%] w-32 h-10 bg-white/70 rounded-full blur-md animate-[cloud-flow_95s_linear_infinite_10s]"></div>

      {/* Hill */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-[#7CBB69]">
        <div className="absolute -top-16 md:-top-24 left-[-25%] w-[150%] h-32 md:h-48 bg-[#7CBB69] rounded-[50%]"></div>
      </div>
      
      <Tree />
      <StrawberryPlant />

      <style>{`
        @keyframes cloud-flow {
          0% {
            transform: translateX(-150%);
            opacity: 0.8;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(800%);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
};

export default Background;
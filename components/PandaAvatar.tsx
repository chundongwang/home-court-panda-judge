import React from 'react';

interface PandaAvatarProps {
  isThinking: boolean;
}

export const PandaAvatar: React.FC<PandaAvatarProps> = ({ isThinking }) => {
  return (
    <div className="relative flex flex-col items-center justify-start mt-4">
      
      {/* Avatar Container */}
      <div className={`relative z-10 transition-transform duration-500 ${isThinking ? 'scale-105' : ''}`}>
        
        {/* The Image Frame - Designed to look like a framed portrait */}
        <div className="relative w-80 h-80 rounded-2xl overflow-hidden shadow-2xl border-[6px] border-yellow-900 bg-gray-100 ring-2 ring-yellow-700/50">
             {/* 
                 Displaying the specific etching-style Panda Judge avatar.
                 The system expects 'panda-judge.png' to be available.
                 If missing, it falls back to a placeholder.
             */}
             <img 
                src="panda-judge.png" 
                alt="The Honorable Panda Judge" 
                className="w-full h-full object-cover filter contrast-110 sepia-[.15]"
                onError={(e) => {
                    // Fallback to a styled placeholder if the image file is not found
                    e.currentTarget.src = "https://placehold.co/600x600/eaddcf/2d2d2d?text=Hon.+Panda+Judge\n(Image+Missing)";
                }}
             />
             
             {/* Inner Shadow / Vignette for depth */}
             <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.3)] pointer-events-none"></div>
        </div>
        
        {/* Nameplate */}
        <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 bg-panda-black text-white px-8 py-2 rounded-lg shadow-xl border-2 border-yellow-600 font-serif text-xl tracking-widest whitespace-nowrap z-20 flex flex-col items-center">
          <span>Hon. Panda</span>
        </div>
      </div>

      {/* Judging Animation - Distinctly below the frame */}
      <div className="h-28 w-full flex items-center justify-center mt-8 z-0">
        {isThinking ? (
          <div className="flex flex-col items-center animate-pulse">
            <div className="text-6xl gavel-animation filter drop-shadow-xl mb-3">
              🔨
            </div>
            <span className="font-serif text-panda-darkgreen font-bold tracking-widest text-sm uppercase bg-white/50 px-3 py-1 rounded-full">
              Deliberating...
            </span>
          </div>
        ) : (
          /* Empty space placeholder to prevent layout jump if desired, or just empty */
          <div className="h-full"></div>
        )}
      </div>
    </div>
  );
};
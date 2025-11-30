import React from 'react';
import { Verdict } from '../types';

interface VerdictDisplayProps {
  verdict: Verdict;
  plaintiffName: string;
  defendantName: string;
  onReset: () => void;
}

export const VerdictDisplay: React.FC<VerdictDisplayProps> = ({
  verdict,
  plaintiffName,
  defendantName,
  onReset,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm animate-fade-in">
      {/* Main Modal Card */}
      <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col border-4 border-panda-black overflow-hidden relative">
        
        {/* Header - Fixed at top */}
        <div className="bg-panda-black text-white p-6 text-center rounded-t-none relative overflow-hidden flex-shrink-0">
           <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400"></div>
           <h2 className="text-3xl font-serif font-bold tracking-widest mb-2">OFFICIAL DECREE</h2>
           <p className="text-sm opacity-80 uppercase tracking-widest">In the High Court of Home</p>
        </div>

        {/* Scrollable Content Area */}
        <div className="p-8 space-y-8 overflow-y-auto flex-grow bg-white">
          
          {/* Responsibility Meter */}
          <div>
            <h3 className="text-lg font-bold text-center mb-4 text-gray-700 uppercase tracking-wide">
              Determination of Responsibility
            </h3>
            <div className="relative h-12 bg-gray-200 rounded-full overflow-hidden flex shadow-inner border-2 border-gray-300">
               {/* Plaintiff Bar */}
              <div 
                style={{ width: `${verdict.plaintiffResponsibility}%` }}
                className="bg-blue-400 flex items-center justify-start pl-4 text-white font-bold transition-all duration-1000 ease-out"
              >
                {verdict.plaintiffResponsibility > 10 && `${verdict.plaintiffResponsibility}%`}
              </div>
              
              {/* Defendant Bar */}
              <div 
                style={{ width: `${verdict.defendantResponsibility}%` }}
                className="bg-red-400 flex items-center justify-end pr-4 text-white font-bold transition-all duration-1000 ease-out"
              >
                {verdict.defendantResponsibility > 10 && `${verdict.defendantResponsibility}%`}
              </div>
            </div>
            <div className="flex justify-between mt-2 text-sm font-bold text-gray-500 px-2">
              <span>{plaintiffName || 'Plaintiff'}</span>
              <span>{defendantName || 'Defendant'}</span>
            </div>
          </div>

          {/* The Decree */}
          <div className="bg-amber-50 p-6 rounded-xl border border-amber-200 shadow-sm relative">
            <span className="absolute -top-3 left-4 bg-amber-100 text-amber-800 px-2 py-0.5 text-xs font-bold uppercase tracking-wide rounded border border-amber-200">
              Judicial Opinion
            </span>
            <p className="font-serif text-lg leading-relaxed text-gray-800 italic">
              "{verdict.decree}"
            </p>
            <div className="mt-4 flex justify-end">
               <span className="font-dancing-script text-xl opacity-70 rotate-[-5deg] font-serif">Hon. Panda Judge</span>
            </div>
          </div>

          {/* Reparations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100">
              <h4 className="font-bold text-blue-800 mb-2 uppercase text-sm">
                Order for {plaintiffName || 'Plaintiff'}
              </h4>
              <p className="text-gray-700 font-medium">
                👉 {verdict.plaintiffReparation}
              </p>
            </div>
            <div className="bg-red-50 p-5 rounded-2xl border border-red-100">
              <h4 className="font-bold text-red-800 mb-2 uppercase text-sm">
                Order for {defendantName || 'Defendant'}
              </h4>
              <p className="text-gray-700 font-medium">
                👉 {verdict.defendantReparation}
              </p>
            </div>
          </div>
          
          {/* Extra padding at bottom of scroll area to ensure content isn't cut off visually */}
          <div className="h-4"></div>
        </div>

        {/* Footer Actions - Fixed outside scroll view */}
        <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-center flex-shrink-0 z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <button
            onClick={onReset}
            className="bg-panda-black text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-gray-800 transform hover:scale-105 transition-all"
          >
            Case Closed (Start New)
          </button>
        </div>

      </div>
    </div>
  );
};
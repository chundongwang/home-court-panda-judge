import React from 'react';
import { PartyRole } from '../types';

interface PartyCardProps {
  role: PartyRole;
  name: string;
  setName: (name: string) => void;
  statement: string;
  setStatement: (statement: string) => void;
  disabled: boolean;
}

export const PartyCard: React.FC<PartyCardProps> = ({
  role,
  name,
  setName,
  statement,
  setStatement,
  disabled,
}) => {
  const isPlaintiff = role === PartyRole.PLAINTIFF;
  
  // Styling based on role
  const cardColor = isPlaintiff ? 'bg-blue-50 border-blue-200' : 'bg-red-50 border-red-200';
  const headerColor = isPlaintiff ? 'text-blue-800' : 'text-red-800';
  const label = isPlaintiff ? 'Plaintiff (The Upset One)' : 'Defendant (The Accused)';
  const placeholderName = isPlaintiff ? 'e.g., Colin' : 'e.g., Mommy';
  const placeholderText = isPlaintiff 
    ? "I was practicing violin and..." 
    : "I was just trying to help with the tempo...";

  return (
    <div className={`flex flex-col flex-1 p-6 rounded-3xl border-2 shadow-lg ${cardColor} transition-all duration-300 hover:shadow-xl`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-xl font-bold font-serif uppercase tracking-wider ${headerColor}`}>
          {label}
        </h2>
        <span className="text-2xl">{isPlaintiff ? '🥺' : '😤'}</span>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-bold mb-1 opacity-70">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={placeholderName}
          disabled={disabled}
          className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-panda-green bg-white bg-opacity-80 font-semibold"
        />
      </div>

      <div className="flex-1 flex flex-col">
        <label className="block text-sm font-bold mb-1 opacity-70">Testimony</label>
        <textarea
          value={statement}
          onChange={(e) => setStatement(e.target.value)}
          placeholder={placeholderText}
          disabled={disabled}
          className="w-full flex-1 min-h-[150px] p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-panda-green resize-none bg-white bg-opacity-80 leading-relaxed"
        />
        <p className="text-xs mt-2 opacity-50 italic text-right">
          "The truth, the whole truth, and nothing but the truth..."
        </p>
      </div>
    </div>
  );
};

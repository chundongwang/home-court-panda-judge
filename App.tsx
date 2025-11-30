import React, { useState } from 'react';
import { PartyCard } from './components/PartyCard';
import { PandaAvatar } from './components/PandaAvatar';
import { VerdictDisplay } from './components/VerdictDisplay';
import { judgeCase } from './services/geminiService';
import { PartyRole, Verdict } from './types';

const App: React.FC = () => {
  // State
  const [plaintiffName, setPlaintiffName] = useState('');
  const [plaintiffStatement, setPlaintiffStatement] = useState('');
  
  const [defendantName, setDefendantName] = useState('');
  const [defendantStatement, setDefendantStatement] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!plaintiffStatement.trim() || !defendantStatement.trim()) {
      setError("Both parties must provide a statement before the court can rule!");
      return;
    }
    
    setError(null);
    setIsLoading(true);

    try {
      const result = await judgeCase({
        plaintiffName: plaintiffName || 'Plaintiff',
        plaintiffStatement,
        defendantName: defendantName || 'Defendant',
        defendantStatement,
      });
      setVerdict(result);
    } catch (e: any) {
      setError(e.message || "An error occurred in the court.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setVerdict(null);
    setPlaintiffStatement('');
    setDefendantStatement('');
    setPlaintiffName('');
    setDefendantName('');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-panda-white text-gray-800 font-sans selection:bg-panda-green selection:text-white pb-20">
      
      {/* Header */}
      <header className="bg-panda-black text-white py-6 shadow-md border-b-4 border-panda-green relative">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight mb-2">
            🏛️ Home Court
          </h1>
          <p className="text-panda-bamboo opacity-90 text-sm md:text-base font-medium tracking-wider uppercase">
            Conflict Resolution &bull; Fairness &bull; Panda Justice
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        
        {/* Error Banner */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8 rounded shadow-sm" role="alert">
            <p className="font-bold">Objection!</p>
            <p>{error}</p>
          </div>
        )}

        {/* The Courtroom Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          
          {/* Left: Plaintiff */}
          <div className="flex-1 order-2 lg:order-1 flex">
            <PartyCard
              role={PartyRole.PLAINTIFF}
              name={plaintiffName}
              setName={setPlaintiffName}
              statement={plaintiffStatement}
              setStatement={setPlaintiffStatement}
              disabled={isLoading}
            />
          </div>

          {/* Center: The Judge */}
          <div className="flex-none order-1 lg:order-2 flex flex-col items-center justify-center py-4 lg:py-0">
             <PandaAvatar isThinking={isLoading} />
             
             {/* Sticky Action Button for Mobile, or placed here for Desktop */}
             <div className="mt-8 z-30">
               <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className={`
                    px-8 py-4 rounded-full font-bold text-lg md:text-xl shadow-xl border-4 
                    transition-all transform active:scale-95 flex items-center gap-3
                    ${isLoading 
                      ? 'bg-gray-400 border-gray-500 cursor-not-allowed text-gray-100' 
                      : 'bg-panda-green border-panda-darkgreen text-white hover:bg-panda-darkgreen hover:scale-105'
                    }
                  `}
               >
                 {isLoading ? (
                   <>
                     <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                     </svg>
                     <span>Deliberating...</span>
                   </>
                 ) : (
                   <>
                     <span>⚖️</span>
                     <span>Order in the Court!</span>
                   </>
                 )}
               </button>
             </div>
          </div>

          {/* Right: Defendant */}
          <div className="flex-1 order-3 lg:order-3 flex">
            <PartyCard
              role={PartyRole.DEFENDANT}
              name={defendantName}
              setName={setDefendantName}
              statement={defendantStatement}
              setStatement={setDefendantStatement}
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Helper Text */}
        <div className="text-center mt-12 opacity-60 text-sm max-w-2xl mx-auto">
          <p>
            The Honorable Panda Judge uses advanced conflict resolution algorithms (and parenting books) to help families find peace. 
            Remember: We are all on the same team.
          </p>
        </div>

      </main>

      {/* Verdict Modal */}
      {verdict && (
        <VerdictDisplay
          verdict={verdict}
          plaintiffName={plaintiffName}
          defendantName={defendantName}
          onReset={handleReset}
        />
      )}
    </div>
  );
};

export default App;

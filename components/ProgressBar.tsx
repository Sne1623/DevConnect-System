
import React from 'react';

interface ProgressBarProps {
  progress: number;
  sprintName?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, sprintName = "Sprint Progress: Q2-Infrastructure" }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{sprintName}</span>
        <span className="text-xs font-bold text-indigo-400">{progress}%</span>
      </div>
      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
        <div 
          className="h-full bg-gradient-to-r from-indigo-600 to-violet-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(99,102,241,0.5)]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;

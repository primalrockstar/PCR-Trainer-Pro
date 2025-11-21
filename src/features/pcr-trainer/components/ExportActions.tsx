import React from 'react';
import { PCRDocument } from '../types';

interface ExportActionsProps {
  pcrDocument: PCRDocument | null;
}

export const ExportActions: React.FC<ExportActionsProps> = ({ pcrDocument }) => {
  const handleExport = (format: string) => {
    console.log(`Exporting as ${format}...`);
    // Implementation would go here
  };

  return (
    <div className="flex items-center gap-2">
      <button 
        onClick={() => handleExport('pdf')}
        disabled={!pcrDocument}
        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        title="Export as PDF"
      >
        <span className="text-lg">📄</span>
      </button>
      <button 
        onClick={() => handleExport('copy')}
        disabled={!pcrDocument}
        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        title="Copy to Clipboard"
      >
        <span className="text-lg">📋</span>
      </button>
    </div>
  );
};

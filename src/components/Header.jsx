import React from 'react';
import { Users, HelpCircle } from 'lucide-react';

const Header = ({ onOpenHelp }) => {
  return (
    <header className="bg-gradient-to-r from-pink-600 to-purple-700 text-white p-4 sm:p-6 shadow-lg relative z-10">
      <div className="max-w-6xl mx-auto flex flex-row items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <Users className="w-6 h-6 sm:w-8 sm:h-8" />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">InstaAnalyzer</h1>
        </div>
        <button 
          onClick={onOpenHelp}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors backdrop-blur-sm border border-white/20"
        >
          <HelpCircle size={16} className="sm:w-[18px] sm:h-[18px]" />
          <span className="hidden sm:inline">Guía JSON</span>
          <span className="sm:hidden">Ayuda</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
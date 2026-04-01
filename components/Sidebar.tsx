
import React, { useState, useEffect } from 'react';
import { SIDEBAR_ITEMS } from '../constants';
import { Command, ExternalLink, LogOut, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  activeTab: string;
  onTabChange: (id: string) => void;
  onLogout?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, onLogout }) => {
  const [showProfile, setShowProfile] = useState(false);

  // Close profile on click outside
  useEffect(() => {
    const handleClickOutside = () => setShowProfile(false);
    if (showProfile) {
      window.addEventListener('click', handleClickOutside);
    }
    return () => window.removeEventListener('click', handleClickOutside);
  }, [showProfile]);

  return (
    <aside className="w-64 border-r border-slate-800 flex flex-col bg-slate-950 z-50">
      {/* Brand */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]">
          <Command size={24} />
        </div>
        <div>
          <h1 className="text-lg font-black text-slate-100 leading-none">DevConnect</h1>
          <p className="text-[10px] text-indigo-400 font-bold tracking-widest uppercase mt-1">Enterprise IT</p>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-4 py-4 space-y-1">
        {SIDEBAR_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`
                relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group overflow-hidden
                ${isActive 
                  ? 'text-indigo-400 bg-indigo-600/10 border border-indigo-500/20' 
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 border border-transparent'}
              `}
            >
              {isActive && (
                <motion.div 
                  layoutId="active-pill"
                  className="absolute left-0 w-1 h-5 bg-indigo-500 rounded-r-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon size={18} className={`transition-colors ${isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
              {item.label}
              
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"></div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Profile/Footer */}
      <div className="p-4 border-t border-slate-800 relative">
        <AnimatePresence>
          {showProfile && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="absolute bottom-full left-4 right-4 mb-4 bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl p-4 z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="https://picsum.photos/seed/admin/100/100" 
                  alt="Admin" 
                  className="w-12 h-12 rounded-xl border-2 border-indigo-500/30 shadow-lg shadow-indigo-500/10" 
                />
                <div>
                  <p className="text-sm font-bold text-slate-50">Admin Console</p>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck size={12} className="text-indigo-400" />
                    <p className="text-[10px] text-indigo-400/80 font-bold uppercase tracking-wider">Superuser</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-1">
                <button className="w-full flex items-center justify-between p-2 text-xs text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-all group">
                  Account Settings
                  <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <button className="w-full flex items-center justify-between p-2 text-xs text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-all group">
                  Billing & Plan
                  <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <div className="h-px bg-slate-800 my-2"></div>
                <button 
                  onClick={() => onLogout?.()}
                  className="w-full flex items-center gap-2 p-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-400/5 rounded-lg transition-all"
                >
                  <LogOut size={14} />
                  Sign Out
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            setShowProfile(!showProfile);
          }}
          className={`w-full flex items-center gap-3 p-2 rounded-xl border transition-all group ${showProfile ? 'bg-indigo-600/10 border-indigo-500/50' : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'}`}
        >
          <img 
            src="https://picsum.photos/seed/admin/100/100" 
            alt="User" 
            className="w-10 h-10 rounded-lg border border-slate-700 group-hover:border-indigo-500/50 transition-colors" 
          />
          <div className="overflow-hidden text-left">
            <p className="text-sm font-bold text-slate-100 truncate group-hover:text-indigo-300 transition-colors">Admin Console</p>
            <p className="text-[10px] text-slate-500 font-medium">Standard Plan</p>
          </div>
          <div className={`ml-auto w-1.5 h-1.5 rounded-full transition-all ${showProfile ? 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]' : 'bg-slate-700'}`}></div>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

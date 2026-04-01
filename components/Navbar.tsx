
import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Settings, Filter, Users, Check } from 'lucide-react';
import StatusIndicator from './StatusIndicator';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_USERS } from '../constants';

interface NavbarProps {
  onSettingsClick?: () => void;
  notifications?: string[];
}

const Navbar: React.FC<NavbarProps> = ({ onSettingsClick, notifications = [] }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Close popovers on click outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowFilters(false);
      setShowMembers(false);
      setShowNotifications(false);
    };
    if (showFilters || showMembers || showNotifications) {
      window.addEventListener('click', handleClickOutside);
    }
    return () => window.removeEventListener('click', handleClickOutside);
  }, [showFilters, showMembers, showNotifications]);

  return (
    <header className="h-16 border-b border-slate-800 px-8 flex items-center justify-between bg-slate-950/50 backdrop-blur-xl sticky top-0 z-40">
      <div className="flex items-center gap-8">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Search tasks, docs, code..."
            className="bg-slate-900/50 border border-slate-800 rounded-full py-2 pl-10 pr-4 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 w-64 transition-all"
          />
        </div>
        
        <div className="h-6 w-px bg-slate-800"></div>

        <div className="flex items-center gap-4">
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => {
                setShowFilters(!showFilters);
                setShowMembers(false);
                setShowNotifications(false);
              }}
              className={`flex items-center gap-2 text-xs font-bold transition-colors px-3 py-1.5 rounded-lg ${showFilters ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-400 hover:text-indigo-400 hover:bg-slate-800'}`}
            >
              <Filter size={14} />
              Filters
            </button>
            <AnimatePresence>
              {showFilters && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full left-0 mt-2 w-48 bg-slate-900 border border-slate-700/50 rounded-xl shadow-2xl p-2 z-50 overflow-hidden"
                >
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold px-3 py-2">Filter By Priority</p>
                  {['High', 'Medium', 'Low'].map((p) => (
                    <button key={p} className="w-full flex items-center justify-between px-3 py-2 text-xs text-slate-300 hover:bg-indigo-500/10 hover:text-indigo-300 rounded-lg transition-colors group text-left">
                      {p} Priority
                      <Check size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                  <div className="h-px bg-slate-800 my-1 mx-2"></div>
                  <button className="w-full text-left px-3 py-2 text-[10px] font-bold text-red-400/70 hover:text-red-400 hover:bg-red-400/5 rounded-lg transition-colors">
                    Clear All Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => {
                setShowMembers(!showMembers);
                setShowFilters(false);
                setShowNotifications(false);
              }}
              className={`flex items-center gap-2 text-xs font-bold transition-colors px-3 py-1.5 rounded-lg ${showMembers ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-400 hover:text-indigo-400 hover:bg-slate-800'}`}
            >
              <Users size={14} />
              Members
            </button>
            <AnimatePresence>
              {showMembers && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full left-0 mt-2 w-64 bg-slate-900 border border-slate-700/50 rounded-xl shadow-2xl p-3 z-50"
                >
                  <div className="flex items-center justify-between mb-3 px-1">
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Team Access</p>
                    <button className="text-[10px] text-indigo-400 font-bold hover:underline">Invite</button>
                  </div>
                  <div className="space-y-2">
                    {MOCK_USERS.map((user) => (
                      <div key={user.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer group">
                        <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border border-slate-700" />
                        <div>
                          <p className="text-xs font-bold text-slate-200 group-hover:text-indigo-300 transition-colors">{user.name}</p>
                          <p className="text-[10px] text-slate-500">{user.role}</p>
                        </div>
                        <div className="ml-auto w-2 h-2 rounded-full bg-green-500/50 ring-4 ring-green-500/10"></div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <StatusIndicator />
        
        <div className="flex items-center gap-3">
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowFilters(false);
                setShowMembers(false);
              }}
              className={`p-2 relative rounded-lg transition-colors ${showNotifications ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'}`}
            >
              <Bell size={20} />
              {notifications.length > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-slate-950"></span>
              )}
            </button>
            <AnimatePresence>
              {showNotifications && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full right-0 mt-2 w-80 bg-slate-900 border border-slate-700/50 rounded-xl shadow-2xl p-4 z-50"
                >
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">System Alerts</p>
                    <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-400 text-[10px] font-bold rounded-full">{notifications.length} New</span>
                  </div>
                  <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
                    {notifications.length > 0 ? (
                      notifications.map((note, i) => (
                        <div key={i} className="p-3 bg-slate-800/50 border border-slate-700/50 rounded-lg hover:border-indigo-500/30 transition-colors">
                          <p className="text-xs text-slate-200 font-medium leading-relaxed">{note}</p>
                          <p className="text-[10px] text-slate-500 mt-2">Just now</p>
                        </div>
                      ))
                    ) : (
                      <div className="py-8 text-center">
                        <Bell className="mx-auto text-slate-700 mb-2 opacity-20" size={32} />
                        <p className="text-xs text-slate-500 font-medium">No active alerts</p>
                      </div>
                    )}
                  </div>
                  {notifications.length > 0 && (
                    <button className="w-full mt-4 py-2 text-[10px] font-bold text-slate-400 hover:text-indigo-400 transition-colors border-t border-slate-800 pt-3">
                      View All Activity Logs
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button 
            onClick={onSettingsClick}
            className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <Settings size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

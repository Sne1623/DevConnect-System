
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Activity as ActivityIcon, Zap, Target, MessageSquare, Clock } from 'lucide-react';
import { Task, User } from '../types';
import { MOCK_USERS } from '../constants';

interface TeamPulseProps {
  tasks: Task[];
}

const TeamPulse: React.FC<TeamPulseProps> = ({ tasks }) => {
  // Extract all activities from all tasks and sort by time (simulated)
  const allActivities = tasks.flatMap(task => 
    task.activities.map(a => ({ ...a, taskTitle: task.title }))
  ).sort((a, b) => b.id.localeCompare(a.id)).slice(0, 15);

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-black text-slate-50 tracking-tight">Team Pulse</h2>
            <p className="text-slate-500 font-medium mt-1 italic">Real-time collaboration and presence monitoring</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
            </span>
            <span className="text-sm font-bold text-indigo-400">Live Sync Active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Team Status */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MOCK_USERS.map((user, idx) => {
                const userTasks = tasks.filter(t => t.assignedTo.id === user.id);
                const activeCount = userTasks.filter(t => t.columnId === 'inprogress').length;
                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={user.id} 
                    className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/30 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <img src={user.avatar} className="w-14 h-14 rounded-2xl border-2 border-slate-800 group-hover:border-indigo-500/50 transition-colors" alt={user.name} />
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-slate-900 rounded-full"></div>
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-slate-100">{user.name}</h4>
                          <p className="text-xs text-slate-500 font-medium">{user.role}</p>
                        </div>
                      </div>
                      <div className="bg-slate-950 p-2 rounded-lg text-indigo-400">
                        <MessageSquare size={18} />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-950/50 rounded-xl p-3 border border-slate-800/50">
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Workload</p>
                        <p className="text-xl font-black text-slate-100">{userTasks.length} <span className="text-xs text-slate-500 font-normal">tasks</span></p>
                      </div>
                      <div className="bg-slate-950/50 rounded-xl p-3 border border-slate-800/50">
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Active</p>
                        <p className="text-xl font-black text-indigo-400">{activeCount}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Workload Visualization */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8">
               <div className="flex items-center gap-3 mb-6">
                <Target className="text-indigo-400" />
                <h3 className="text-xl font-bold text-slate-100">Task Velocity</h3>
              </div>
              <div className="space-y-6">
                {['To Do', 'In Progress', 'Done'].map((col, i) => {
                  const count = tasks.filter(t => t.columnId === (col === 'To Do' ? 'todo' : col === 'In Progress' ? 'inprogress' : 'done')).length;
                  const percent = (count / tasks.length) * 100;
                  return (
                    <div key={col}>
                      <div className="flex justify-between text-xs font-bold mb-2">
                        <span className="text-slate-400 uppercase tracking-widest">{col}</span>
                        <span className="text-slate-100">{count} Tasks</span>
                      </div>
                      <div className="h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${percent}%` }}
                          className={`h-full rounded-full ${col === 'Done' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : col === 'In Progress' ? 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]' : 'bg-slate-700'}`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Activity Feed */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden flex flex-col h-[700px] shadow-2xl">
            <div className="p-6 border-b border-slate-800 bg-slate-900/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ActivityIcon className="text-indigo-400" size={20} />
                <h3 className="font-bold text-slate-100">Live Stream</h3>
              </div>
              <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-400 rounded text-[10px] font-black animate-pulse">LIVE</span>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {allActivities.map((activity, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={activity.id + idx} 
                  className="relative pl-6 border-l border-slate-800"
                >
                  <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_5px_rgba(99,102,241,1)]"></div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-100">{activity.user}</span>
                      <span className="text-[10px] text-slate-500 flex items-center gap-1">
                        <Clock size={10} /> {activity.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {activity.action} on <span className="text-indigo-300 font-medium">"{activity.taskTitle}"</span>
                    </p>
                  </div>
                </motion.div>
              ))}

              {allActivities.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full opacity-30 text-center">
                  <Zap size={48} className="mb-4" />
                  <p className="text-sm font-bold">No live data detected</p>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-slate-800 bg-slate-900/50">
              <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-all border border-slate-700/50">
                Download Pulse Export
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPulse;

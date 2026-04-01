
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User as UserIcon, Tag, Clock, CheckCircle2, Trash2, Edit3, MessageSquare } from 'lucide-react';
import { Task, Priority } from '../types';

interface TaskModalProps {
  task: Task | null;
  onClose: () => void;
  onDelete?: (id: string) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, onClose, onDelete }) => {
  if (!task) return null;

  const getPriorityStyles = (p: Priority) => {
    switch (p) {
      case Priority.HIGH: return 'bg-red-500/20 text-red-400 border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]';
      case Priority.MEDIUM: return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case Priority.LOW: return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border ${getPriorityStyles(task.priority)}`}>
                {task.priority} Priority
              </span>
              <span className="text-slate-500 flex items-center gap-1.5 text-sm">
                <CheckCircle2 size={14} className="text-indigo-400" />
                {task.columnId.charAt(0).toUpperCase() + task.columnId.slice(1)}
              </span>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-slate-100 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="p-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
            <h2 className="text-3xl font-bold text-slate-50 mb-6 leading-tight">
              {task.title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 bg-slate-800/50 rounded-lg text-indigo-400">
                    <UserIcon size={18} />
                  </div>
                  <div>
                    <h5 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1.5">Assigned To</h5>
                    <div className="flex items-center gap-3">
                      <img src={task.assignedTo.avatar} alt={task.assignedTo.name} className="w-8 h-8 rounded-full border border-slate-700" />
                      <div>
                        <p className="text-sm font-semibold text-slate-100">{task.assignedTo.name}</p>
                        <p className="text-xs text-slate-500">{task.assignedTo.role}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 bg-slate-800/50 rounded-lg text-indigo-400">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <h5 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1.5">Due Date</h5>
                    <p className="text-sm font-semibold text-slate-100">{task.dueDate}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                 <div>
                    <h5 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-3">Activity Log</h5>
                    <div className="space-y-3">
                      {task.activities.length > 0 ? task.activities.map(activity => (
                        <div key={activity.id} className="flex gap-3 items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_5px_rgba(99,102,241,1)]" />
                          <p className="text-xs text-slate-300">
                            <span className="font-semibold text-slate-100">{activity.user}</span> {activity.action}
                          </p>
                          <span className="text-[10px] text-slate-500 ml-auto">{activity.timestamp}</span>
                        </div>
                      )) : (
                        <p className="text-xs text-slate-500 italic">No recent activity.</p>
                      )}
                    </div>
                 </div>
              </div>
            </div>

            <div className="mb-8">
              <h5 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                <Tag size={14} />
                Description
              </h5>
              <div className="p-4 bg-slate-950/50 border border-slate-800 rounded-xl">
                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                  {task.description}
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 bg-slate-900/50 border-t border-slate-800 flex items-center justify-between">
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-medium transition-colors">
                <Edit3 size={16} />
                Edit Task
              </button>
              <button 
                onClick={() => onDelete?.(task.id)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-red-900/30 text-slate-300 hover:text-red-400 rounded-lg text-sm font-medium transition-colors border border-transparent hover:border-red-500/20"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
            
            <div className="flex gap-2">
               <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-bold transition-all shadow-lg shadow-indigo-600/20">
                <MessageSquare size={16} />
                Add Comment
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TaskModal;

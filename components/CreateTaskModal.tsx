
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User as UserIcon, Tag, AlertCircle, Check } from 'lucide-react';
import { Priority, Task, User } from '../types';
import { MOCK_USERS } from '../constants';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (taskData: Omit<Task, 'id' | 'activities' | 'columnId'>) => void;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>(Priority.MEDIUM);
  const [assigneeId, setAssigneeId] = useState(MOCK_USERS[0].id);
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const assignedTo = MOCK_USERS.find(u => u.id === assigneeId) || MOCK_USERS[0];
    onSave({
      title,
      description,
      priority,
      assignedTo,
      dueDate
    });
    // Reset form
    setTitle('');
    setDescription('');
    setPriority(Priority.MEDIUM);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-xl bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between p-6 border-b border-slate-800">
            <h3 className="text-xl font-bold text-slate-50 flex items-center gap-2">
              <AlertCircle size={20} className="text-indigo-400" />
              Create New Objective
            </h3>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-slate-100 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
            {/* Title */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2">Title</label>
              <input
                required
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Upgrade Kubernetes Cluster"
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2">Description</label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the scope and technical requirements..."
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Priority */}
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as Priority)}
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all appearance-none cursor-pointer"
                >
                  <option value={Priority.HIGH}>High</option>
                  <option value={Priority.MEDIUM}>Medium</option>
                  <option value={Priority.LOW}>Low</option>
                </select>
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2">Due Date</label>
                <div className="relative">
                  <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                  <input
                    type="date"
                    required
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Assignee */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2">Assign To</label>
              <div className="grid grid-cols-1 gap-2">
                {MOCK_USERS.map((user) => (
                  <label 
                    key={user.id}
                    className={`
                      flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all
                      ${assigneeId === user.id ? 'bg-indigo-500/10 border-indigo-500/50' : 'bg-slate-950/30 border-slate-800 hover:border-slate-700'}
                    `}
                  >
                    <input
                      type="radio"
                      name="assignee"
                      value={user.id}
                      checked={assigneeId === user.id}
                      onChange={() => setAssigneeId(user.id)}
                      className="hidden"
                    />
                    <img src={user.avatar} className="w-8 h-8 rounded-full border border-slate-700" alt={user.name} />
                    <div className="flex-1">
                      <p className="text-xs font-bold text-slate-100">{user.name}</p>
                      <p className="text-[10px] text-slate-500">{user.role}</p>
                    </div>
                    {assigneeId === user.id && <Check size={16} className="text-indigo-400" />}
                  </label>
                ))}
              </div>
            </div>
          </form>

          <div className="p-6 bg-slate-900/50 border-t border-slate-800 flex justify-end gap-3">
            <button 
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-400 hover:text-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              className="px-8 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-2"
            >
              <Check size={18} />
              Launch Task
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CreateTaskModal;

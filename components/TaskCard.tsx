
import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Task, Priority } from '../types';
import { Calendar, AlignLeft, User as UserIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface TaskCardProps {
  task: Task;
  index: number;
  onClick: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index, onClick }) => {
  const getPriorityStyles = (p: Priority) => {
    switch (p) {
      case Priority.HIGH:
        return 'bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_12px_rgba(239,68,68,0.1)]';
      case Priority.MEDIUM:
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case Priority.LOW:
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <motion.div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02, y: -2 }}
          transition={{ duration: 0.2 }}
          onClick={() => onClick(task)}
          className={`
            group mb-3 p-4 rounded-xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-sm
            hover:border-indigo-500/50 hover:bg-slate-800/80 transition-all cursor-pointer select-none
            ${snapshot.isDragging ? 'shadow-2xl shadow-indigo-500/20 border-indigo-500 scale-105 z-50' : 'shadow-lg shadow-black/20'}
          `}
        >
          <div className="flex items-start justify-between mb-3">
            <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded border ${getPriorityStyles(task.priority)}`}>
              {task.priority}
            </span>
          </div>

          <h4 className="text-slate-100 font-semibold text-sm mb-2 group-hover:text-indigo-300 transition-colors">
            {task.title}
          </h4>

          <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed mb-4">
            {task.description}
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-slate-800/50">
            <div className="flex items-center gap-2">
              <div className="relative">
                <img 
                  src={task.assignedTo.avatar} 
                  alt={task.assignedTo.name} 
                  className="w-6 h-6 rounded-full border border-slate-700 ring-2 ring-transparent group-hover:ring-indigo-500/30 transition-all"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 border border-slate-900 rounded-full"></div>
              </div>
              <span className="text-[10px] font-medium text-slate-500 group-hover:text-slate-300 transition-colors">
                {task.assignedTo.name.split(' ')[0]}
              </span>
            </div>

            <div className="flex items-center gap-2 text-slate-500 text-[10px] font-medium">
              <Calendar size={12} />
              <span>{task.dueDate}</span>
            </div>
          </div>
        </motion.div>
      )}
    </Draggable>
  );
};

export default TaskCard;

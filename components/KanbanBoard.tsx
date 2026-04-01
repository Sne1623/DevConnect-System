
import React from 'react';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { Task, Column, KanbanState } from '../types';
import TaskCard from './TaskCard';
import { Plus, MoreHorizontal, LayoutGrid } from 'lucide-react';
import { motion } from 'framer-motion';

interface KanbanBoardProps {
  state: KanbanState;
  onDragEnd: (result: DropResult) => void;
  onTaskClick: (task: Task) => void;
  onAddTask: (columnId: string) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ state, onDragEnd, onTaskClick, onAddTask }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-6 h-full overflow-x-auto pb-4 custom-scrollbar px-2">
        {state.columns.map((column) => {
          const columnTasks = state.tasks.filter(t => t.columnId === column.id);

          return (
            <div key={column.id} className="flex-shrink-0 w-80 flex flex-col group">
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                  <h3 className="font-bold text-slate-200 text-sm uppercase tracking-widest">{column.title}</h3>
                  <span className="px-2 py-0.5 bg-slate-800 text-slate-400 rounded-full text-[10px] font-bold">
                    {columnTasks.length}
                  </span>
                </div>
                <button className="text-slate-500 hover:text-slate-200 p-1 rounded-md hover:bg-slate-800 transition-colors">
                  <MoreHorizontal size={16} />
                </button>
              </div>

              {/* Droppable Area */}
              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`
                      flex-1 rounded-2xl p-3 transition-colors duration-200 min-h-[150px]
                      ${snapshot.isDraggingOver ? 'bg-slate-800/40 border-2 border-dashed border-indigo-500/30' : 'bg-slate-800/20 border-2 border-transparent'}
                    `}
                  >
                    {columnTasks.length === 0 && !snapshot.isDraggingOver ? (
                      <div className="flex flex-col items-center justify-center h-48 text-slate-600 border border-dashed border-slate-700/50 rounded-xl">
                        <LayoutGrid size={32} className="mb-2 opacity-20" />
                        <p className="text-xs">No tasks found</p>
                      </div>
                    ) : (
                      columnTasks.map((task, index) => (
                        <TaskCard 
                          key={task.id} 
                          task={task} 
                          index={index} 
                          onClick={onTaskClick}
                        />
                      ))
                    )}
                    {provided.placeholder}
                    
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onAddTask(column.id)}
                      className="w-full mt-2 p-3 flex items-center justify-center gap-2 rounded-xl border border-dashed border-slate-700 text-slate-500 hover:text-indigo-400 hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all text-sm font-medium"
                    >
                      <Plus size={16} />
                      Add Task
                    </motion.button>
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;

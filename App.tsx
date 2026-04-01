
import React, { useState, useEffect, useCallback } from 'react';
import { DropResult } from '@hello-pangea/dnd';
import { Task, KanbanState, Priority, Activity, UserRole, SystemConfig as ISystemConfig } from './types';
import { INITIAL_TASKS, MOCK_COLUMNS, MOCK_USERS } from './constants';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import KanbanBoard from './components/KanbanBoard';
import ProgressBar from './components/ProgressBar';
import TaskModal from './components/TaskModal';
import CreateTaskModal from './components/CreateTaskModal';
import TeamPulse from './components/TeamPulse';
import SecurityCenter from './components/SecurityCenter';
import CICDPipelines from './components/CICDPipelines';
import SystemConfig from './components/SystemConfig';
import Login from './components/Login';
import { Plus, Terminal, Shield, Users, Settings, Layout, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [state, setState] = useState<KanbanState>({
    tasks: INITIAL_TASKS,
    columns: MOCK_COLUMNS,
  });

  // Global System Configuration
  const [systemConfig, setSystemConfig] = useState<ISystemConfig>({
    darkMode: true,
    notifications: true,
    sprintDuration: 14,
    enableAI: true,
    enableActivityLogs: true
  });
  
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isBoardLoading, setIsBoardLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [targetColumnId, setTargetColumnId] = useState('todo');
  const [notifications, setNotifications] = useState<string[]>([]);

  // Simulate current user as Admin for demonstration
  const isAdmin = true;

  // Simulate initial load
  useEffect(() => {
    if (isAuthenticated) {
      const timer = setTimeout(() => setIsBoardLoading(false), 800);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  // REAL-TIME SIMULATION ENGINE
  useEffect(() => {
    if (!isAuthenticated || !systemConfig.enableActivityLogs) return;

    const interval = setInterval(() => {
      // Chance of activity increases if AI is enabled
      const threshold = systemConfig.enableAI ? 0.7 : 0.9;
      
      if (Math.random() > threshold) {
        const otherUsers = MOCK_USERS.filter(u => u.name !== 'Admin Console');
        const randomUser = otherUsers[Math.floor(Math.random() * otherUsers.length)];
        const eventType = Math.random();

        if (eventType > 0.6 && state.tasks.length > 0) {
          const randomTaskIndex = Math.floor(Math.random() * state.tasks.length);
          const task = state.tasks[randomTaskIndex];
          const newCol = MOCK_COLUMNS[Math.floor(Math.random() * MOCK_COLUMNS.length)].id;
          
          if (task.columnId !== newCol) {
            const updatedTask = { 
              ...task, 
              columnId: newCol,
              activities: [
                { id: `ext-${Date.now()}`, user: randomUser.name, action: `moved this task to ${newCol}`, timestamp: 'Just now' },
                ...task.activities
              ]
            };
            const newTasks = [...state.tasks];
            newTasks[randomTaskIndex] = updatedTask;
            setState(prev => ({ ...prev, tasks: newTasks }));
            
            if (systemConfig.notifications) {
              addNotification(`${randomUser.name} moved "${task.title}" to ${newCol}`);
            }
          }
        } else if (eventType > 0.3) {
          const titles = systemConfig.enableAI 
            ? ["Optimize LLM Weights", "Auto-scale GPU cluster", "Refactor Neural Gateway", "Audit Training Set"]
            : ["Fix CI pipeline", "Update README", "Audit logs", "Refactor Auth"];
            
          const newTitle = titles[Math.floor(Math.random() * titles.length)];
          const newTask: Task = {
            id: `ext-task-${Date.now()}`,
            title: `${systemConfig.enableAI ? '[AI Suggested] ' : '[Remote] '}${newTitle}`,
            description: 'This task was added by a team member remotely.',
            priority: [Priority.LOW, Priority.MEDIUM, Priority.HIGH][Math.floor(Math.random() * 3)],
            assignedTo: randomUser,
            dueDate: new Date().toISOString().split('T')[0],
            columnId: 'todo',
            activities: [{ id: `ext-a-${Date.now()}`, user: randomUser.name, action: 'created this task', timestamp: 'Just now' }]
          };
          setState(prev => ({ ...prev, tasks: [newTask, ...prev.tasks] }));
          
          if (systemConfig.notifications) {
            addNotification(`${randomUser.name} created task: "${newTitle}"`);
          }
        }
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [state.tasks, isAuthenticated, systemConfig.enableAI, systemConfig.enableActivityLogs, systemConfig.notifications]);

  const addNotification = (msg: string) => {
    setNotifications(prev => [msg, ...prev].slice(0, 5));
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n !== msg));
    }, 5000);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const newTasks: Task[] = Array.from(state.tasks);
    const taskIndex = newTasks.findIndex((t: Task) => t.id === draggableId);
    
    if (taskIndex !== -1) {
      const task = newTasks[taskIndex];
      const updatedTask: Task = { 
        ...task, 
        columnId: destination.droppableId,
        activities: [
          { 
            id: `act-${Date.now()}`, 
            user: 'You', 
            action: `Moved from ${source.droppableId} to ${destination.droppableId}`, 
            timestamp: 'Just now' 
          },
          ...task.activities
        ]
      };
      
      newTasks.splice(taskIndex, 1);
      const targetColumnTasks = newTasks.filter((t: Task) => t.columnId === destination.droppableId);
      const otherColumnTasks = newTasks.filter((t: Task) => t.columnId !== destination.droppableId);
      targetColumnTasks.splice(destination.index, 0, updatedTask);
      setState({ ...state, tasks: [...otherColumnTasks, ...targetColumnTasks] });
    }
  };

  const openCreateModal = (columnId: string) => {
    setTargetColumnId(columnId);
    setIsCreateModalOpen(true);
  };

  const handleSaveNewTask = (taskData: Omit<Task, 'id' | 'activities' | 'columnId'>) => {
    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}`,
      columnId: targetColumnId,
      activities: [{ id: `act-${Date.now()}`, user: 'System', action: 'Created task', timestamp: 'Just now' }]
    };
    setState(prev => ({ ...prev, tasks: [newTask, ...prev.tasks] }));
  };

  const handleDeleteTask = (id: string) => {
    if (!isAdmin) {
      addNotification("Unauthorized: Only Admins can delete objectives.");
      return;
    }
    setState(prev => ({ ...prev, tasks: prev.tasks.filter(t => t.id !== id) }));
    setSelectedTask(null);
  };

  const completedCount = state.tasks.filter(t => t.columnId === 'done').length;
  const totalCount = state.tasks.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch(activeTab) {
      case 'team': return <TeamPulse tasks={state.tasks} />;
      case 'security': return <SecurityCenter isAdmin={isAdmin} />;
      case 'ci-cd': return <CICDPipelines />;
      case 'settings': return <SystemConfig globalConfig={systemConfig} setGlobalConfig={setSystemConfig} />;
      case 'sprints':
      case 'dashboard':
        return (
          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="p-8 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-50 tracking-tight">
                    {activeTab === 'sprints' ? 'Active Sprints' : 'System Dashboard'}
                  </h2>
                  <p className="text-slate-500 text-sm mt-1 font-medium">Monitoring cluster health and deployment pipelines</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3 mr-4">
                    {MOCK_USERS.map((user) => (
                      <img 
                        key={user.id} 
                        src={user.avatar} 
                        alt={user.name} 
                        className="w-8 h-8 rounded-full border-2 border-slate-950 ring-1 ring-slate-800"
                      />
                    ))}
                    <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-950 flex items-center justify-center text-[10px] font-bold text-slate-400">
                      +4
                    </div>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openCreateModal('todo')}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all border border-indigo-500/50"
                  >
                    <Plus size={18} />
                    New Task
                  </motion.button>
                </div>
              </div>

              <div className="w-full max-w-2xl">
                <ProgressBar progress={progressPercent} sprintName={`Sprint Cycle (${systemConfig.sprintDuration}d)`} />
              </div>
            </div>

            <div className="flex-1 px-8 pb-8 overflow-hidden">
              {isBoardLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
                    <p className="text-slate-500 font-bold text-xs uppercase tracking-widest animate-pulse">Syncing System Data...</p>
                  </div>
                </div>
              ) : (
                <KanbanBoard 
                  state={state} 
                  onDragEnd={onDragEnd} 
                  onTaskClick={setSelectedTask}
                  onAddTask={openCreateModal}
                />
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`flex h-screen w-screen bg-slate-950 overflow-hidden text-slate-200 antialiased ${!systemConfig.darkMode ? 'bg-slate-900' : ''}`}>
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} onLogout={handleLogout} />

      <div className="flex-1 flex flex-col min-w-0 bg-grid">
        <Navbar 
          onSettingsClick={() => setActiveTab('settings')} 
          notifications={notifications}
        />
        
        <div className="fixed top-20 right-8 z-[60] flex flex-col gap-2 pointer-events-none">
          <AnimatePresence>
            {notifications.map((note, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-indigo-600/90 backdrop-blur-md text-white px-4 py-3 rounded-xl shadow-2xl border border-indigo-400/50 flex items-center gap-3 max-w-xs pointer-events-auto"
              >
                <div className="p-1.5 bg-white/20 rounded-lg">
                  <Bell size={16} />
                </div>
                <p className="text-xs font-bold leading-tight">{note}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <main className="flex-1 overflow-hidden flex flex-col">
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </main>
      </div>

      <TaskModal 
        task={selectedTask} 
        onClose={() => setSelectedTask(null)}
        onDelete={handleDeleteTask}
      />

      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleSaveNewTask}
      />
      
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => openCreateModal('todo')}
        className="fixed bottom-8 right-8 w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-2xl shadow-indigo-600/50 border border-indigo-400/50 z-50 md:hidden"
      >
        <Plus size={28} />
      </motion.button>
    </div>
  );
};

export default App;

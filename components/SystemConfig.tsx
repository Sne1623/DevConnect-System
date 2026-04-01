
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Bell, Moon, Cpu, Globe, Rocket, Save, Check } from 'lucide-react';
import { SystemConfig as ISystemConfig } from '../types';

interface SystemConfigProps {
  globalConfig: ISystemConfig;
  setGlobalConfig: (config: ISystemConfig) => void;
}

const SystemConfig: React.FC<SystemConfigProps> = ({ globalConfig, setGlobalConfig }) => {
  // Local state for the form, initialized from props
  const [config, setConfig] = useState<ISystemConfig>(globalConfig);
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Synchronize local state if global config changes (e.g. from a reset)
  useEffect(() => {
    setConfig(globalConfig);
  }, [globalConfig]);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call persistence
    setTimeout(() => {
      setGlobalConfig(config);
      setIsSaving(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 800);
  };

  const Toggle = ({ active, onToggle, label, icon: Icon }: any) => (
    <div className="flex items-center justify-between p-4 bg-slate-950/30 border border-slate-800 rounded-2xl group hover:border-indigo-500/30 transition-all">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${active ? 'bg-indigo-500/10 text-indigo-400' : 'bg-slate-800 text-slate-500'}`}>
          <Icon size={18} />
        </div>
        <span className="text-sm font-bold text-slate-200">{label}</span>
      </div>
      <button 
        type="button"
        onClick={onToggle}
        className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${active ? 'bg-indigo-600' : 'bg-slate-800'}`}
      >
        <motion.div 
          animate={{ x: active ? 26 : 4 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg"
        />
      </button>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black text-slate-50 tracking-tight flex items-center gap-3">
              <Settings className="text-indigo-500" size={32} />
              System Configuration
            </h2>
            <p className="text-slate-500 font-medium mt-1">Global application parameters and environment variables</p>
          </div>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/20 border border-indigo-400/30 disabled:opacity-50 transition-all"
          >
            {isSaving ? <Cpu className="animate-spin" size={18} /> : <Save size={18} />}
            Save Configuration
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* App Settings */}
          <section className="space-y-4">
            <h3 className="text-[10px] uppercase tracking-widest font-black text-slate-500 px-1">Application Controls</h3>
            <Toggle 
              label="Appearance: Dark Mode" 
              active={config.darkMode} 
              icon={Moon}
              onToggle={() => setConfig({...config, darkMode: !config.darkMode})} 
            />
            <Toggle 
              label="Real-time Notifications" 
              active={config.notifications} 
              icon={Bell}
              onToggle={() => setConfig({...config, notifications: !config.notifications})} 
            />
            <div className="p-4 bg-slate-950/30 border border-slate-800 rounded-2xl">
              <label className="block text-sm font-bold text-slate-200 mb-2">Sprint Duration (Days)</label>
              <input 
                type="number"
                value={config.sprintDuration}
                onChange={(e) => setConfig({...config, sprintDuration: parseInt(e.target.value) || 0})}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm text-indigo-400 font-black focus:outline-none focus:border-indigo-500 transition-all"
              />
            </div>
          </section>

          {/* Feature Toggles */}
          <section className="space-y-4">
            <h3 className="text-[10px] uppercase tracking-widest font-black text-slate-500 px-1">Infrastructure Features</h3>
            <Toggle 
              label="Enable Gemini-3 AI Tasks" 
              active={config.enableAI} 
              icon={Rocket}
              onToggle={() => setConfig({...config, enableAI: !config.enableAI})} 
            />
             <Toggle 
              label="Verbose Activity Logging" 
              active={config.enableActivityLogs} 
              icon={Globe}
              onToggle={() => setConfig({...config, enableActivityLogs: !config.enableActivityLogs})} 
            />
          </section>

          {/* Environment Info */}
          <section className="md:col-span-2 bg-slate-900/40 border border-slate-800 rounded-3xl p-8 relative overflow-hidden">
             <div className="relative z-10">
               <div className="flex items-center gap-3 mb-6">
                  <Cpu className="text-indigo-400" />
                  <h3 className="text-xl font-bold text-slate-100">Environment Meta</h3>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                     <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Build Version</p>
                     <p className="text-sm font-mono text-indigo-300">v2.5.1-stable.hotfix</p>
                  </div>
                  <div>
                     <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Project ID</p>
                     <p className="text-sm font-mono text-slate-300">devconnect-enterprise-74x</p>
                  </div>
                  <div>
                     <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Runtime Status</p>
                     <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-[10px] font-black">PRODUCTION</span>
                  </div>
               </div>
             </div>
             <div className="absolute top-0 right-0 p-8 opacity-5">
               <Settings size={120} />
             </div>
          </section>
        </div>
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 z-[100] border border-green-400/30"
          >
            <div className="p-1 bg-white/20 rounded-lg">
              <Check size={18} />
            </div>
            <span className="font-bold text-sm">System configuration updated successfully</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SystemConfig;

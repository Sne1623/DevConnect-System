
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, Zap, Play, CheckCircle2, XCircle, Clock, Server, Loader2, X } from 'lucide-react';
import { MOCK_DEPLOYMENTS } from '../constants';
import { Deployment } from '../types';

const CICDPipelines: React.FC = () => {
  const [deployments, setDeployments] = useState<Deployment[]>(MOCK_DEPLOYMENTS);
  const [isDeploying, setIsDeploying] = useState(false);
  const [selectedLog, setSelectedLog] = useState<Deployment | null>(null);

  const runDeployment = () => {
    setIsDeploying(true);
    setTimeout(() => {
      const success = Math.random() > 0.2;
      const newDeployment: Deployment = {
        id: `dep-${Date.now()}`,
        version: `v2.5.${deployments.length + 1}`,
        environment: 'Production',
        status: success ? 'Success' : 'Failed',
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
        logs: [
          'Initializing pipeline node...',
          'Fetching main branch...',
          'Running security audit...',
          success ? 'Security check passed.' : 'Error: Dependency vulnerability detected!',
          success ? 'Compressing build artifacts...' : 'Aborting deployment build.',
          success ? 'Pushed to production cluster.' : 'Sending alert to Slack.'
        ]
      };
      setDeployments([newDeployment, ...deployments]);
      setIsDeploying(false);
    }, 4000);
  };

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black text-slate-50 tracking-tight flex items-center gap-3">
              <TerminalIcon className="text-indigo-500" size={32} />
              CI/CD Pipelines
            </h2>
            <p className="text-slate-500 font-medium mt-1 italic">Automated deployment triggers and build telemetry</p>
          </div>
          
          <button 
            onClick={runDeployment}
            disabled={isDeploying}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-xl
              ${isDeploying 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700' 
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20 border border-indigo-400/30'}
            `}
          >
            {isDeploying ? <Loader2 size={18} className="animate-spin" /> : <Play size={18} fill="currentColor" />}
            {isDeploying ? 'Deploying...' : 'Run New Deployment'}
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Build Queue */}
          <div className="lg:col-span-3 space-y-4">
             {deployments.map((dep, idx) => (
               <motion.div 
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: idx * 0.05 }}
                 key={dep.id} 
                 onClick={() => setSelectedLog(dep)}
                 className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 hover:border-indigo-500/50 transition-all cursor-pointer group flex items-center gap-6"
               >
                 <div className={`p-3 rounded-xl ${dep.status === 'Success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                   {dep.status === 'Success' ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
                 </div>
                 
                 <div className="flex-1">
                   <div className="flex items-center gap-3 mb-1">
                     <span className="text-sm font-black text-slate-100">{dep.version}</span>
                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-2 py-0.5 bg-slate-950 rounded border border-slate-800">
                       {dep.environment}
                     </span>
                   </div>
                   <p className="text-xs text-slate-500 font-medium">{dep.timestamp}</p>
                 </div>

                 <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    VIEW LOGS <TerminalIcon size={12} />
                 </div>
               </motion.div>
             ))}
          </div>

          {/* Build Stats Panel */}
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6">Pipeline Health</h3>
              <div className="flex flex-col items-center gap-4 py-6">
                <div className={`w-24 h-24 rounded-full border-4 flex items-center justify-center transition-colors duration-1000 ${isDeploying ? 'border-indigo-500 animate-pulse' : 'border-green-500/20'}`}>
                   <Server className={isDeploying ? 'text-indigo-500' : 'text-green-500'} size={40} />
                </div>
                <div className="text-center">
                   <p className="text-lg font-black text-slate-100">{isDeploying ? 'PROVISIONING' : 'STABLE'}</p>
                   <p className="text-[10px] text-slate-500 font-bold">LATEST BUILD: {deployments[0].version}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Terminal Modal */}
      <AnimatePresence>
        {selectedLog && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedLog(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="bg-slate-800/80 p-4 flex items-center justify-between border-b border-slate-700">
                 <div className="flex items-center gap-2">
                    <TerminalIcon size={16} className="text-indigo-400" />
                    <span className="text-xs font-bold text-slate-300 font-mono">Build Logs: {selectedLog.version}</span>
                 </div>
                 <button onClick={() => setSelectedLog(null)} className="text-slate-500 hover:text-white transition-colors">
                    <X size={18} />
                 </button>
              </div>
              <div className="p-6 bg-slate-950 font-mono text-xs text-indigo-300/80 leading-relaxed max-h-[400px] overflow-y-auto custom-scrollbar">
                 {selectedLog.logs.map((line, i) => (
                   <div key={i} className="flex gap-4 mb-1">
                      <span className="text-slate-700 select-none">[{i+1}]</span>
                      <span>{line}</span>
                   </div>
                 ))}
                 <div className="mt-4 flex items-center gap-2 text-green-400 animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    Ready for new instructions_
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CICDPipelines;


import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Command, Mail, Lock, ChevronRight, ShieldCheck } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      onLogin();
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 bg-grid relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/10 blur-[120px] rounded-full"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md p-8 relative z-10"
      >
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-[0_0_30px_rgba(99,102,241,0.4)] mb-6">
            <Command size={36} />
          </div>
          <h1 className="text-3xl font-black text-slate-50 tracking-tight">DevConnect</h1>
          <p className="text-slate-500 font-medium mt-2">Enterprise IT Management Console</p>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center gap-2 mb-8 p-3 bg-indigo-500/5 border border-indigo-500/10 rounded-xl">
            <ShieldCheck className="text-indigo-400" size={18} />
            <p className="text-[10px] uppercase tracking-widest font-black text-indigo-400">Secure Gateway Access</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2 px-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@devconnect.com"
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-sm text-slate-100 placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2 px-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-sm text-slate-100 placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all"
                />
              </div>
            </div>

            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-800 bg-slate-950/50 text-indigo-600 focus:ring-offset-0 focus:ring-indigo-500/20" />
                <span className="text-xs text-slate-500 group-hover:text-slate-300 transition-colors">Keep session active</span>
              </label>
              <button type="button" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors">Forgot Access Code?</button>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              className={`
                w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl py-4 font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/20 transition-all border border-indigo-400/30
                ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}
              `}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Initialize System
                  <ChevronRight size={18} />
                </>
              )}
            </motion.button>
          </form>
        </div>

        <p className="mt-8 text-center text-slate-600 text-xs">
          By continuing, you agree to our <span className="text-slate-400 hover:underline cursor-pointer">Terms of Service</span> and <span className="text-slate-400 hover:underline cursor-pointer">Security Protocols</span>.
        </p>
      </motion.div>
    </div>
  );
};

export default Login;

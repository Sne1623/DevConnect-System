
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Key, History, UserCheck, ShieldAlert, ChevronDown } from 'lucide-react';
import { MOCK_USERS, MOCK_AUTH_LOGS } from '../constants';
import { UserRole } from '../types';

const SecurityCenter: React.FC<{ isAdmin: boolean }> = ({ isAdmin }) => {
  const [users, setUsers] = useState(MOCK_USERS);
  const [logs] = useState(MOCK_AUTH_LOGS);

  const updateRole = (userId: string, newRole: UserRole) => {
    if (!isAdmin) return;
    setUsers(users.map(u => u.id === userId ? { ...u, systemRole: newRole } : u));
  };

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header>
          <h2 className="text-3xl font-black text-slate-50 tracking-tight flex items-center gap-3">
            <Shield className="text-indigo-500" size={32} />
            Security Center
          </h2>
          <p className="text-slate-500 font-medium mt-1">Manage infrastructure access and audit authentication traffic</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Access Management */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <UserCheck size={20} className="text-indigo-400" />
                  IAM Control Plane
                </h3>
              </div>
              
              <div className="overflow-hidden border border-slate-800 rounded-2xl">
                <table className="w-full text-left">
                  <thead className="bg-slate-950/50 text-[10px] uppercase tracking-widest font-black text-slate-500">
                    <tr>
                      <th className="px-6 py-4">User</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Access Level</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-indigo-500/5 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img src={user.avatar} className="w-8 h-8 rounded-full border border-slate-700" alt="" />
                            <div>
                              <p className="text-sm font-bold text-slate-100">{user.name}</p>
                              <p className="text-[10px] text-slate-500">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="flex items-center gap-1.5 text-[10px] font-bold text-green-500">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            ACTIVE
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="relative inline-block">
                            <select 
                              disabled={!isAdmin}
                              value={user.systemRole}
                              onChange={(e) => updateRole(user.id, e.target.value as UserRole)}
                              className={`
                                appearance-none bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-[10px] font-black uppercase tracking-wider focus:outline-none focus:border-indigo-500 transition-colors
                                ${!isAdmin ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-slate-600'}
                              `}
                            >
                              {Object.values(UserRole).map(role => (
                                <option key={role} value={role}>{role}</option>
                              ))}
                            </select>
                            {isAdmin && <ChevronDown size={10} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Security Rules Panel */}
            <div className="bg-gradient-to-br from-indigo-900/20 to-slate-900 border border-indigo-500/20 rounded-3xl p-8 relative overflow-hidden">
               <div className="relative z-10">
                 <h3 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
                   <ShieldAlert className="text-indigo-400" />
                   Infrastructure Security Rules
                 </h3>
                 <p className="text-sm text-slate-400 leading-relaxed mb-6">
                   DevConnect uses strict <strong>RBAC (Role Based Access Control)</strong>. 
                   Only Users with the <span className="text-indigo-300 font-bold">Admin</span> role can perform destructive actions like deleting tasks or managing user permissions.
                 </p>
                 <div className="flex gap-4">
                   <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800 flex-1">
                      <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-2">Read Access</p>
                      <p className="text-xs text-slate-300">Public for all authenticated employees.</p>
                   </div>
                   <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800 flex-1">
                      <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-2">Write Access</p>
                      <p className="text-xs text-slate-300">Limited to Developer & Admin roles.</p>
                   </div>
                 </div>
               </div>
               <div className="absolute top-0 right-0 p-8 opacity-10">
                 <Shield size={120} />
               </div>
            </div>
          </div>

          {/* Sidebar: Auth Logs */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden flex flex-col h-[600px]">
            <div className="p-6 border-b border-slate-800 bg-slate-950/30 flex items-center gap-3">
              <History className="text-indigo-400" size={20} />
              <h3 className="font-bold text-slate-100">Auth Audit Log</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {logs.map((log) => (
                <div key={log.id} className="p-4 bg-slate-950/50 rounded-2xl border border-slate-800/50 group">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${log.status === 'Success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {log.status}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">{log.timestamp}</span>
                  </div>
                  <p className="text-xs font-bold text-slate-200">{log.user}</p>
                  <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
                    <Key size={10} />
                    Source: {log.ip}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityCenter;

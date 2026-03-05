import { useState } from 'react';
import { 
  ShieldCheck, 
  Eye, 
  Edit3, 
  Lock, 
  Info,
  Check,
  X,
  Fingerprint
} from 'lucide-react';
import { cn } from '@/utils';

interface Permission {
  id: string;
  name: string;
  description: string;
  category: 'core' | 'finance' | 'users' | 'system';
}

interface RolePermissions {
  [permissionId: string]: boolean;
}

export function RolePermissionMatrix() {
  const [activeRole, setActiveRole] = useState<'admin' | 'editor' | 'viewer'>('editor');

  const roles = [
    { id: 'admin', name: 'Super Admin', icon: <ShieldCheck className="w-4 h-4" />, color: 'text-rose-600 bg-rose-50' },
    { id: 'editor', name: 'Workspace Editor', icon: <Edit3 className="w-4 h-4" />, color: 'text-blue-600 bg-blue-50' },
    { id: 'viewer', name: 'Basic Viewer', icon: <Eye className="w-4 h-4" />, color: 'text-slate-600 bg-slate-50' },
  ];

  const permissions: Permission[] = [
    { id: 'p1', name: 'Edit Billing Info', description: 'Modify payment methods and company tax ID', category: 'finance' },
    { id: 'p2', name: 'Delete User Accounts', description: 'Permantently remove workspace members', category: 'users' },
    { id: 'p3', name: 'Invite External Guests', description: 'Add 3rd party consultants to shared folders', category: 'users' },
    { id: 'p4', name: 'System API Access', description: 'Generate and revoke global API tokens', category: 'system' },
    { id: 'p5', name: 'Export Raw Metrics', description: 'Download CSV/JSON data blobs for analysis', category: 'system' },
    { id: 'p6', name: 'Modify Workflow Rules', description: 'Change automatic status triggers in Kanban', category: 'core' },
  ];

  const [matrix, setMatrix] = useState<{ [roleId: string]: RolePermissions }>({
    admin: { p1: true, p2: true, p3: true, p4: true, p5: true, p6: true },
    editor: { p1: false, p2: false, p3: true, p4: false, p5: true, p6: true },
    viewer: { p1: false, p2: false, p3: false, p4: false, p5: true, p6: false },
  });

  const togglePermission = (roleId: string, permId: string) => {
    setMatrix(prev => ({
      ...prev,
      [roleId]: {
        ...prev[roleId],
        [permId]: !prev[roleId][permId]
      }
    }));
  };

  return (
    <div className="w-full h-full bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-50/50">
         <div className="flex flex-col gap-1">
            <h3 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
               Governance Matrix
               <Fingerprint className="w-6 h-6 text-blue-600" />
            </h3>
            <p className="text-sm font-medium text-gray-400">Manage granular access control policies across all workspace roles.</p>
         </div>
         
         <div className="flex p-1 bg-gray-200/50 rounded-2xl w-fit">
            {roles.map(role => (
              <button
                key={role.id}
                onClick={() => setActiveRole(role.id as any)}
                className={cn(
                  "flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black transition-all uppercase tracking-widest",
                  activeRole === role.id ? "bg-white text-gray-900 shadow-md scale-[1.05]" : "text-gray-400 hover:text-gray-600"
                )}
              >
                 {role.icon}
                 {role.name}
              </button>
            ))}
         </div>
      </div>

      {/* Matrix Table */}
      <div className="overflow-x-auto">
         <table className="w-full border-collapse">
            <thead>
               <tr className="bg-white">
                  <th className="p-8 pb-4 text-left text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 border-b border-gray-100">Functional Module</th>
                  <th className="p-8 pb-4 text-center text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 border-b border-gray-100 w-32">Status</th>
                  <th className="p-8 pb-4 text-right text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 border-b border-gray-100 w-48">Audit Log</th>
               </tr>
            </thead>
            <tbody>
               {permissions.map((perm) => (
                 <tr 
                   key={perm.id} 
                   className="group hover:bg-gray-50/80 transition-colors border-b border-gray-50 last:border-none"
                 >
                    <td className="p-8 flex flex-col gap-1.5">
                       <div className="flex items-center gap-3">
                          <span className="text-base font-black text-gray-900">{perm.name}</span>
                          <span className={cn(
                            "px-2 py-0.5 rounded-full text-[9px] font-black uppercase",
                            perm.category === 'finance' ? "bg-amber-100 text-amber-600" :
                            perm.category === 'users' ? "bg-blue-100 text-blue-600" :
                            perm.category === 'system' ? "bg-slate-800 text-white" : "bg-gray-100 text-gray-500"
                          )}>
                            {perm.category}
                          </span>
                       </div>
                       <p className="text-xs font-medium text-gray-400 max-w-sm">{perm.description}</p>
                    </td>

                    <td className="p-8 text-center">
                       <button
                         onClick={() => togglePermission(activeRole, perm.id)}
                         disabled={activeRole === 'admin'}
                         className={cn(
                           "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 relative mx-auto group/chk",
                           matrix[activeRole][perm.id] 
                             ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                             : "bg-gray-50 text-gray-300 border border-transparent grayscale hover:grayscale-0",
                           activeRole === 'admin' ? "cursor-not-allowed opacity-80" : "hover:scale-110 active:scale-95 shadow-sm"
                         )}
                       >
                          {matrix[activeRole][perm.id] ? <Check className="w-6 h-6" /> : <X className="w-6 h-6" />}
                          {activeRole === 'admin' && <Lock className="absolute -top-1 -right-1 w-3.5 h-3.5 text-gray-400 bg-white rounded-full p-0.5" />}
                       </button>
                    </td>

                    <td className="p-8 text-right">
                       <div className="flex items-center justify-end gap-3 text-gray-300 group-hover:text-gray-400 transition-colors">
                          <span className="text-[10px] font-bold italic">Modified Oct 12</span>
                          <Info className="w-4 h-4 cursor-help" />
                       </div>
                    </td>
                 </tr>
               ))}
            </tbody>
         </table>
      </div>

      {/* Footer Info */}
      <div className="mt-auto p-4 px-8 bg-slate-900 flex items-center justify-between">
         <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Live Policy Sync Active</span>
            </div>
            <div className="w-[1px] h-4 bg-slate-700" />
            <p className="text-[10px] font-bold text-slate-500 uppercase">Changes will propagate to {activeRole} members immediately.</p>
         </div>
         <button 
           className="px-6 py-2 bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20"
         >
           Save Changes
         </button>
      </div>
    </div>
  );
}

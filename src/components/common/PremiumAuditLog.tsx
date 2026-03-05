import { History, ArrowRight, Calendar, Shield, Cpu, ExternalLink } from 'lucide-react';
import { cn } from '@/utils';

interface AuditLogEntry {
  id: string;
  action: string;
  category: 'security' | 'financial' | 'operational' | 'system';
  timestamp: string;
  user: {
    name: string;
    role: string;
    avatar: string;
  };
  changes?: {
    field: string;
    oldValue: string;
    newValue: string;
  }[];
  ipAddress: string;
}

export function PremiumAuditLog() {
  const logs: AuditLogEntry[] = [
    {
      id: 'L1',
      action: 'API Configuration Updated',
      category: 'system',
      timestamp: 'Just now',
      user: {
        name: 'Jordan Smith',
        role: 'CTO / Admin',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan'
      },
      changes: [
        { field: 'Rate Limit', oldValue: '10,000 req/min', newValue: '50,000 req/min' },
        { field: 'Webhook URL', oldValue: 'http://legacy-stg.api', newValue: 'https://prod-events.cloud' }
      ],
      ipAddress: '192.168.1.104'
    },
    {
      id: 'L2',
      action: 'User Permissions Escalated',
      category: 'security',
      timestamp: '15m ago',
      user: {
        name: 'Security Bot',
        role: 'Internal Automation',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Security'
      },
      changes: [
        { field: 'Sarah J. Role', oldValue: 'Viewer', newValue: 'Full Editor' }
      ],
      ipAddress: '10.0.4.12'
    },
    {
      id: 'L3',
      action: 'Batch Refund Processed',
      category: 'financial',
      timestamp: '2h ago',
      user: {
        name: 'Alice Finance',
        role: 'Billing Lead',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice'
      },
      ipAddress: '24.182.9.22'
    }
  ];

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'security': return 'bg-rose-50 text-rose-600 border-rose-100';
      case 'financial': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'system': return 'bg-blue-50 text-blue-600 border-blue-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'security': return <Shield className="w-4 h-4" />;
      case 'financial': return <Calendar className="w-4 h-4" />;
      case 'system': return <Cpu className="w-4 h-4" />;
      default: return <History className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full flex justify-center p-4">
      <div className="w-full max-w-5xl bg-slate-900 rounded-[40px] shadow-3xl overflow-hidden border border-slate-800">
        <div className="p-10 border-b border-slate-800 flex items-center justify-between">
           <div className="space-y-1">
              <h3 className="text-3xl font-black text-white tracking-tighter flex items-center gap-3">
                 System Audit Log
                 <Shield className="w-8 h-8 text-blue-500" />
              </h3>
              <p className="text-slate-400 font-medium">Compliance-ready event stream with immutable delta tracking.</p>
           </div>
           <button className="px-6 py-3 bg-slate-800 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-700 transition-all border border-slate-700">
              Export SOC2 JSON
           </button>
        </div>

        <div className="divide-y divide-slate-800">
           {logs.map((log) => (
             <div key={log.id} className="p-10 group hover:bg-slate-800/30 transition-all duration-500">
                <div className="flex flex-col xl:flex-row gap-10">
                   {/* Left Section: User Meta */}
                   <div className="xl:w-64 space-y-4">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-2xl bg-slate-700 flex items-center justify-center text-slate-300 border border-slate-600 overflow-hidden">
                             <img src={log.user.avatar} alt={log.user.name} />
                         </div>
                         <div className="flex flex-col">
                            <span className="text-sm font-black text-white">{log.user.name}</span>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{log.user.role}</span>
                         </div>
                      </div>
                      <div className="space-y-2">
                         <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600 uppercase tabular-nums tracking-widest">
                            <Calendar className="w-3.5 h-3.5" />
                            {log.timestamp}
                         </div>
                         <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600 uppercase tabular-nums tracking-widest">
                            <Shield className="w-3.5 h-3.5" />
                            IP: {log.ipAddress}
                         </div>
                      </div>
                   </div>

                   {/* Right Section: Action Detail */}
                   <div className="flex-1 space-y-6">
                      <div className="flex items-center gap-4">
                         <div className={cn(
                           "px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2",
                           getCategoryColor(log.category)
                         )}>
                            {getCategoryIcon(log.category)}
                            {log.category}
                         </div>
                         <h4 className="text-lg font-black text-white tracking-tight">{log.action}</h4>
                         <button className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity p-2 text-slate-500 hover:text-white">
                            <ExternalLink className="w-5 h-5" />
                         </button>
                      </div>

                      {log.changes && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           {log.changes.map((change, idx) => (
                             <div key={idx} className="p-4 bg-slate-950/50 rounded-2xl border border-slate-800 space-y-3">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">{change.field}</span>
                                <div className="flex items-center gap-3">
                                   <div className="flex-1 px-3 py-2 bg-rose-500/10 text-rose-400 rounded-lg text-xs font-bold line-through border border-rose-500/20 truncate">
                                      {change.oldValue}
                                   </div>
                                   <ArrowRight className="w-4 h-4 text-slate-700 flex-shrink-0" />
                                   <div className="flex-1 px-3 py-2 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs font-bold border border-emerald-500/20 truncate">
                                      {change.newValue}
                                   </div>
                                </div>
                             </div>
                           ))}
                        </div>
                      )}
                   </div>
                </div>
             </div>
           ))}
        </div>

        <div className="p-6 bg-slate-950/50 text-center">
           <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">Hardware ID: X882-AF02P-Z911</p>
        </div>
      </div>
    </div>
  );
}

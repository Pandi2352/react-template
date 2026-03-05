import { Hammer, Clock, Shield, Zap, Info, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { cn } from '@/utils';

export function MaintenancePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Decorative BG */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[150px] animate-pulse" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600 rounded-full blur-[150px] animate-pulse" />
      </div>

      <div className="w-full max-w-4xl flex flex-col gap-12 text-center relative z-10">
         <div className="flex flex-col items-center gap-6">
            <div className="w-24 h-24 bg-blue-600 rounded-[40px] flex items-center justify-center text-white shadow-2xl shadow-blue-500/50 animate-bounce">
               <Hammer className="w-12 h-12" />
            </div>
            
            <div className="space-y-4">
               <h1 className="text-6xl font-black text-white tracking-tighter leading-none">
                  Scheduled <span className="text-blue-500 underline decoration-blue-500/30">Enhancement</span>
               </h1>
               <p className="text-xl text-slate-400 font-medium max-w-xl mx-auto leading-relaxed">
                  We are currently upgrading our global compute architecture. Systems will be back online in approximately <span className="text-white font-bold">45 minutes</span>.
               </p>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Clock className="w-6 h-6" />, label: "ETA", value: "18:45 UTC", color: "text-blue-500" },
              { icon: <Shield className="w-6 h-6" />, label: "Status", value: "Secure Layer UP", color: "text-emerald-500" },
              { icon: <Zap className="w-6 h-6" />, label: "Progress", value: "82% Sync Complete", color: "text-amber-500" },
            ].map(stat => (
              <div key={stat.label} className="p-8 bg-slate-800/50 rounded-3xl border border-slate-700/50 backdrop-blur-md flex flex-col items-center gap-3">
                 <div className={stat.color}>{stat.icon}</div>
                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{stat.label}</span>
                 <span className="text-lg font-black text-white tracking-tight">{stat.value}</span>
              </div>
            ))}
         </div>

         <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-6">
            <button 
               onClick={() => navigate(ROUTES.HOME)}
               className="flex items-center gap-3 px-10 py-5 bg-white text-slate-900 rounded-2xl text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/10"
            >
               <ChevronLeft className="w-4 h-4" />
               Go Home
            </button>
            <button className="flex items-center gap-3 px-10 py-5 bg-slate-800 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-700 transition-all border border-slate-700">
               <Info className="w-4 h-4" />
               View Status Page
            </button>
         </div>

         <div className="pt-12 border-t border-slate-800/50 flex flex-col items-center gap-4">
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em]">Global System Heartbeat</p>
            <div className="flex gap-1.5 justify-center">
               {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
                 <div 
                   key={i} 
                   className={cn(
                     "w-1 h-4 rounded-full transition-all duration-1000",
                     i < 8 ? "bg-emerald-500/40 animate-pulse" : i === 8 ? "bg-amber-500/40 animate-pulse" : "bg-slate-800"
                   )} 
                   style={{ animationDelay: `${i * 100}ms` }}
                 />
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}

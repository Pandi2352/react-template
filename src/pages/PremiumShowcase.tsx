import { 
  PremiumFileUploader,
  PremiumActivityFeed,
  PremiumOnboardingWizard, 
  RolePermissionMatrix,
  PremiumPricingTable,
  PremiumStatsGrid,
  PremiumTimeline,
  PremiumAuditLog
} from '@/components/common';
import { 
  Sparkles, 
  ShieldCheck, 
  Target, 
  BellRing, 
  CloudUpload,
  CreditCard,
  LayoutGrid,
  ShieldAlert
} from 'lucide-react';

export function PremiumShowcase() {
  return (
    <div className="flex flex-col gap-12 max-w-[1600px] mx-auto pb-32">
      {/* Header Section */}
      <div className="flex flex-col gap-6 border-b border-gray-100 pb-12">
        <div className="space-y-4">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 rounded-full border border-amber-100/50">
              <Sparkles className="w-4 h-4 text-amber-600 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-700">Enterprise High Fidelity</span>
           </div>
           <h1 className="text-5xl font-black text-gray-900 tracking-tighter leading-none">
              Premium UI Components
           </h1>
           <p className="text-xl text-gray-500 max-w-3xl leading-relaxed font-medium">
              A curated collection of professional-grade, interactive components designed for high-end SaaS dashboards and enterprise portals.
           </p>
        </div>
      </div>

      {/* KPI Section */}
      <section className="space-y-6">
         <div className="flex items-center gap-3 ml-2">
            <LayoutGrid className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">System Global KPIs</h2>
         </div>
         <PremiumStatsGrid />
      </section>

      {/* Grid for Onboarding & Lifecycle */}
      <div className="flex flex-col gap-12">
        <section className="space-y-6">
           <div className="flex items-center gap-3 ml-2">
              <Target className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">Lifecycle & Onboarding</h2>
           </div>
           <div className="flex flex-col xl:flex-row gap-12 items-start">
              <PremiumOnboardingWizard />
              <div className="flex-1 w-full">
                 <PremiumTimeline />
              </div>
           </div>
        </section>

        <section className="space-y-6">
           <div className="flex items-center gap-3 ml-2">
              <ShieldAlert className="w-6 h-6 text-rose-600" />
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">Immutable Audit logs</h2>
           </div>
           <PremiumAuditLog />
        </section>

        <section className="space-y-6">
           <div className="flex items-center gap-3 ml-2">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">Policy Governance</h2>
           </div>
           <div className="max-w-6xl mx-auto w-full">
              <RolePermissionMatrix />
           </div>
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
           <section className="xl:col-span-7 space-y-6">
              <div className="flex items-center gap-3 ml-2">
                 <CloudUpload className="w-6 h-6 text-blue-500" />
                 <h2 className="text-2xl font-black text-gray-900 tracking-tight">Premium File Intake</h2>
              </div>
              <PremiumFileUploader />
           </section>

           <section className="xl:col-span-5 space-y-6">
              <div className="flex items-center gap-3 ml-2">
                 <BellRing className="w-6 h-6 text-rose-500" />
                 <h2 className="text-2xl font-black text-gray-900 tracking-tight">System Activity Pulse</h2>
              </div>
              <PremiumActivityFeed />
           </section>
        </div>

        <section className="space-y-8 pt-12 border-t border-gray-100">
           <div className="flex flex-col items-center gap-3 text-center">
              <CreditCard className="w-8 h-8 text-blue-600 mb-2" />
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">Revenue Conversion Tiers</h2>
              <p className="text-sm font-medium text-gray-500 max-w-lg">Optimized pricing visuals for high-ticket enterprise subscriptions.</p>
           </div>
           <PremiumPricingTable />
        </section>
      </div>

      {/* Footer Meta */}
      <div className="mt-20 p-12 bg-slate-900 rounded-[40px] text-center space-y-6 relative overflow-hidden group">
         <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-3xl rounded-full scale-150" />
         <h2 className="text-4xl font-black text-white tracking-tighter relative z-10">Scale Faster. Build Smarter.</h2>
         <p className="text-slate-400 font-medium max-w-xl mx-auto relative z-10">
            Every component in this suite is optimized for high-performance and accessible interaction. Perfect for fintech, healthtech, and security-first platforms.
         </p>
         <button className="px-10 py-5 bg-white text-slate-900 rounded-2xl text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all relative z-10">
            Request Source Files
         </button>

         <div className="pt-8 border-t border-slate-800/50 flex flex-wrap justify-center gap-12 relative z-10">
            {['Lucide v0.4', 'Recharts Core', 'Full Responsive', 'Type-Safe Props'].map(tag => (
              <div key={tag} className="flex items-center gap-2 group/tag cursor-help">
                 <div className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover/tag:scale-150 transition-transform" />
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{tag}</span>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}

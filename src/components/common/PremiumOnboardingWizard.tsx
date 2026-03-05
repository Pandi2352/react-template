import { useState } from 'react';
import { 
  User, 
  Shield, 
  Check, 
  ChevronRight, 
  Sparkles, 
  Wallet, 
  Rocket,
  CheckCircle2,
  Lock,
  Globe
} from 'lucide-react';
import { cn } from '@/utils';

interface Step {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  status: 'pending' | 'active' | 'completed';
}

export function PremiumOnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const steps: Step[] = [
    { 
      id: 1, 
      title: 'Profile Setup', 
      subtitle: 'Personalize your workspace', 
      icon: <User className="w-5 h-5" />,
      status: currentStep > 1 ? 'completed' : currentStep === 1 ? 'active' : 'pending'
    },
    { 
      id: 2, 
      title: 'Security Sync', 
      subtitle: 'Enable zero-trust layers', 
      icon: <Shield className="w-5 h-5" />,
      status: currentStep > 2 ? 'completed' : currentStep === 2 ? 'active' : 'pending'
    },
    { 
      id: 3, 
      title: 'Billing Tier', 
      subtitle: 'Select your compute power', 
      icon: <Wallet className="w-5 h-5" />,
      status: currentStep > 3 ? 'completed' : currentStep === 3 ? 'active' : 'pending'
    },
    { 
      id: 4, 
      title: 'Final Launch', 
      subtitle: 'System verification', 
      icon: <Rocket className="w-5 h-5" />,
      status: currentStep === 4 ? 'active' : 'pending'
    },
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setDirection('right');
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection('left');
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="w-full max-w-5xl bg-white rounded-[40px] border border-gray-100 shadow-2xl p-2 flex flex-col md:flex-row min-h-[640px] overflow-hidden">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-80 bg-gray-50/50 rounded-[34px] p-8 flex flex-col gap-10">
        <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
               <Sparkles className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
               <span className="text-sm font-black text-gray-900 tracking-tight">Onboarding</span>
               <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">v2.0 Beta</span>
            </div>
        </div>

        <nav className="flex flex-col gap-4">
           {steps.map((step) => (
             <div 
               key={step.id}
               className={cn(
                 "flex items-center gap-4 p-4 rounded-2xl transition-all duration-300",
                 step.status === 'active' ? "bg-white shadow-md scale-[1.05] z-10" : "opacity-60 grayscale hover:grayscale-0 hover:opacity-100"
               )}
             >
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                  step.status === 'active' ? "bg-blue-600 text-white" : step.status === 'completed' ? "bg-emerald-50 text-emerald-600" : "bg-gray-200 text-gray-400"
                )}>
                   {step.status === 'completed' ? <CheckCircle2 className="w-6 h-6" /> : step.icon}
                </div>
                <div className="flex flex-col">
                   <h4 className={cn("text-xs font-black uppercase tracking-wider", step.status === 'active' ? "text-gray-900" : "text-gray-400")}>
                     {step.title}
                   </h4>
                   <p className="text-[11px] font-medium text-gray-400 truncate w-32">{step.subtitle}</p>
                </div>
                {step.status === 'active' && <div className="ml-auto w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />}
             </div>
           ))}
        </nav>

        <div className="mt-auto p-4 bg-white border border-gray-100 rounded-2xl flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 overflow-hidden">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" />
            </div>
            <div className="flex flex-col">
               <span className="text-xs font-black text-gray-900">Felix Vance</span>
               <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Admin Access</span>
            </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 md:p-16 flex flex-col items-center justify-center relative">
         <div className={cn(
           "w-full max-w-lg transition-all duration-500",
           direction === 'right' ? "animate-in slide-in-from-right-8 fade-in" : "animate-in slide-in-from-left-8 fade-in"
         )}>
            {currentStep === 1 && (
              <div className="space-y-8">
                 <div className="space-y-2">
                   <h2 className="text-4xl font-black text-gray-900 tracking-tight">Identity Profile</h2>
                   <p className="text-lg text-gray-500 font-medium">How should we address you across the workspace?</p>
                 </div>
                 
                 <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Full Legal Name</label>
                       <input type="text" placeholder="e.g. Felix Vance" className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 font-bold text-gray-900 transition-all outline-none" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Company Handle</label>
                       <div className="flex items-center gap-2 bg-gray-50 p-1 px-4 rounded-2xl border-none focus-within:ring-2 focus-within:ring-blue-500 transition-all">
                          <span className="text-gray-400 font-bold">@</span>
                          <input type="text" placeholder="handle" className="flex-1 bg-transparent py-3 font-bold text-gray-900 outline-none" />
                       </div>
                    </div>
                 </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-8">
                 <div className="space-y-2">
                   <h2 className="text-4xl font-black text-gray-900 tracking-tight">Zero-Trust Shield</h2>
                   <p className="text-lg text-gray-500 font-medium">Configure your hardware keys and MFA authentication.</p>
                 </div>
                 
                 <div className="grid grid-cols-1 gap-4">
                    <div className="p-6 bg-blue-50 border border-blue-100 rounded-3xl flex items-center gap-6 cursor-pointer hover:bg-blue-100 transition-all group">
                       <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm group-hover:scale-110 transition-transform">
                          <Lock className="w-7 h-7" />
                       </div>
                       <div className="flex flex-col">
                          <span className="text-lg font-black text-gray-900">Authenticator App</span>
                          <p className="text-xs font-medium text-blue-600">Recommended for mobile security</p>
                       </div>
                    </div>
                    <div className="p-6 bg-gray-50 border border-transparent rounded-3xl flex items-center gap-6 cursor-pointer hover:bg-white hover:border-gray-100 hover:shadow-lg transition-all group opacity-60 hover:opacity-100">
                       <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-gray-400 shadow-sm group-hover:scale-110 transition-transform group-hover:text-blue-600">
                          <Globe className="w-7 h-7" />
                       </div>
                       <div className="flex-1 flex flex-col">
                          <div className="flex items-center justify-between">
                             <span className="text-lg font-black text-gray-900">IP Whitelisting</span>
                             <span className="px-2 py-0.5 bg-gray-200 text-gray-600 rounded-full text-[9px] font-black uppercase">Alpha</span>
                          </div>
                          <p className="text-xs font-medium text-gray-500">Restricts access by geographic location</p>
                       </div>
                    </div>
                 </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-8">
                 <div className="space-y-2 text-center items-center flex flex-col">
                   <h2 className="text-4xl font-black text-gray-900 tracking-tight">Power Your Growth</h2>
                   <p className="text-lg text-gray-500 font-medium">Select a tier that matches your monthly volume.</p>
                 </div>
                 
                 <div className="grid grid-cols-1 gap-3">
                    {['Starter', 'Professional', 'Enterprise'].map((tier, idx) => (
                      <div key={tier} className={cn(
                        "p-4 border-2 rounded-2xl flex items-center justify-between cursor-pointer transition-all",
                        idx === 1 ? "border-blue-600 bg-blue-50/20" : "border-gray-100 hover:border-gray-300"
                      )}>
                         <div className="flex items-center gap-4">
                            <div className={cn(
                              "w-8 min-w-[32px] h-8 rounded-full border-2 flex items-center justify-center transition-all",
                              idx === 1 ? "bg-blue-600 border-blue-600 text-white" : "border-gray-200"
                            )}>
                               {idx === 1 && <Check className="w-5 h-5" />}
                            </div>
                            <div className="flex flex-col">
                               <span className="text-sm font-black text-gray-900 uppercase tracking-wide">{tier}</span>
                               <span className="text-xs font-medium text-gray-500">{idx === 0 ? 'Free' : idx === 1 ? '$29 / mo' : 'Custom'}</span>
                            </div>
                         </div>
                         <div className="flex -space-x-1.5">
                            {[1, 2, 3].map(i => (
                              <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 overflow-hidden">
                                 <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${tier}${i}`} alt="" />
                              </div>
                            ))}
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="text-center space-y-8 py-10">
                 <div className="w-24 h-24 bg-emerald-50 rounded-[40px] flex items-center justify-center text-emerald-600 mx-auto shadow-xl shadow-emerald-50/50 animate-bounce">
                    <CheckCircle2 className="w-12 h-12" />
                 </div>
                 <div className="space-y-2">
                    <h2 className="text-4xl font-black text-gray-900 tracking-tight">You're Ready!</h2>
                    <p className="text-lg text-gray-500 font-medium max-w-xs mx-auto">
                      All systems are verified. Your workspace is configured and ready for launch.
                    </p>
                 </div>
                 <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-3 w-fit mx-auto">
                    <Globe className="w-4 h-4 text-blue-500 animate-spin-slow" />
                    <span className="text-xs font-black text-gray-400 tracking-widest uppercase">System Region: US-EAST-1</span>
                 </div>
              </div>
            )}
         </div>

         {/* Navigation Buttons */}
         <div className="absolute bottom-16 right-16 flex items-center gap-4">
            {currentStep > 1 && currentStep < 4 && (
              <button 
                onClick={handleBack}
                className="px-8 py-5 text-sm font-black text-gray-400 hover:text-gray-900 transition-all uppercase tracking-widest"
              >
                Back
              </button>
            )}
            
            {currentStep === 4 ? (
              <button className="px-12 py-5 bg-blue-600 text-white rounded-[24px] text-sm font-black shadow-xl shadow-blue-200 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-widest flex items-center gap-3">
                Enter Workspace
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button 
                 onClick={handleNext}
                 className="px-12 py-5 bg-gray-900 text-white rounded-[24px] text-sm font-black shadow-xl shadow-gray-200 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-widest flex items-center gap-3 group"
              >
                Continue
                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            )}
         </div>
      </div>
    </div>
  );
}

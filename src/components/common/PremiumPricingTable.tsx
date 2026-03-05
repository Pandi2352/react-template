import { Check, Sparkles, Zap, Shield } from 'lucide-react';
import { cn } from '@/utils';

export function PremiumPricingTable() {
  const tiers = [
    {
      name: 'Essential',
      price: '29',
      description: 'Ideal for small teams exploring zero-trust architecture.',
      features: ['Up to 5 Team Members', 'Basic Data Visualizer', '10GB Cloud Storage', 'Email Support'],
      buttonText: 'Start Free Trial',
      variant: 'standard'
    },
    {
      name: 'Growth',
      price: '79',
      description: 'The definitive power-house for scaling enterprise units.',
      features: ['Unlimited Members', 'Full Premium Chart Suite', '500GB NVMe Storage', '24/7 Priority Concierge', 'Custom Domain Aliasing'],
      buttonText: 'Scale Now',
      variant: 'premium',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Maximum governance for world-class corporations.',
      features: ['Unlimited Everything', 'Dedicated Success Manager', 'On-premise Deployment', 'SLA Guarantee', 'Granular Role Matrix'],
      buttonText: 'Contact Sales',
      variant: 'dark'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl mx-auto">
      {tiers.map((tier) => (
        <div 
          key={tier.name}
          className={cn(
            "relative flex flex-col p-8 rounded-[40px] transition-all duration-500 hover:scale-[1.02]",
            tier.variant === 'premium' ? "bg-white border-2 border-blue-600 shadow-2xl scale-[1.05] z-10" : 
            tier.variant === 'dark' ? "bg-slate-900 border border-slate-800 text-white" : 
            "bg-white border border-gray-100 shadow-sm"
          )}
        >
          {tier.popular && (
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 bg-blue-600 text-white rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-lg">
               <Sparkles className="w-4 h-4" />
               Most Popular
            </div>
          )}

          <div className="mb-8">
             <div className={cn(
               "w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:rotate-12",
               tier.variant === 'premium' ? "bg-blue-50 text-blue-600" : 
               tier.variant === 'dark' ? "bg-slate-800 text-blue-400" : "bg-gray-50 text-gray-500"
             )}>
                {tier.name === 'Essential' ? <Zap className="w-6 h-6" /> : tier.name === 'Growth' ? <Sparkles className="w-6 h-6" /> : <Shield className="w-6 h-6" />}
             </div>
             <h3 className={cn("text-xl font-black tracking-tight", tier.variant === 'dark' ? "text-white" : "text-gray-900")}>{tier.name}</h3>
             <p className={cn("text-sm font-medium mt-2 leading-relaxed", tier.variant === 'dark' ? "text-slate-400" : "text-gray-500")}>{tier.description}</p>
          </div>

          <div className="mb-10 flex items-baseline gap-1">
             <span className={cn("text-5xl font-black tracking-tighter", tier.variant === 'dark' ? "text-white" : "text-gray-900")}>
                {tier.price !== 'Custom' && '$'}{tier.price}
             </span>
             {tier.price !== 'Custom' && <span className={cn("text-sm font-bold uppercase tracking-widest opacity-50", tier.variant === 'dark' ? "text-slate-400" : "text-gray-400")}>/ month</span>}
          </div>

          <div className="space-y-4 mb-10 flex-1">
             {tier.features.map(feature => (
               <div key={feature} className="flex items-center gap-3">
                  <div className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center transition-all",
                    tier.variant === 'premium' ? "bg-blue-600 text-white" : 
                    tier.variant === 'dark' ? "bg-blue-500 text-slate-900" : "bg-gray-100 text-gray-400"
                  )}>
                     <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className={cn("text-sm font-bold", tier.variant === 'dark' ? "text-slate-300" : "text-gray-600")}>{feature}</span>
               </div>
             ))}
          </div>

          <button className={cn(
            "w-full py-5 rounded-2xl text-sm font-black uppercase tracking-[0.2em] transition-all",
            tier.variant === 'premium' ? "bg-blue-600 text-white shadow-xl shadow-blue-200 hover:bg-blue-700 active:scale-95" :
            tier.variant === 'dark' ? "bg-white text-slate-900 hover:bg-gray-200 active:scale-95 shadow-xl shadow-slate-900/50" : 
            "bg-gray-100 text-gray-900 hover:bg-gray-200 active:scale-95"
          )}>
            {tier.buttonText}
          </button>
        </div>
      ))}
    </div>
  );
}

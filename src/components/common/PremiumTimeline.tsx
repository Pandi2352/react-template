import { CheckCircle2, Circle, Clock, AlertCircle, ChevronRight, MessageSquare, History } from 'lucide-react';
import { cn } from '@/utils';

interface TimelineEvent {
  id: string;
  status: 'completed' | 'current' | 'upcoming' | 'error';
  title: string;
  subtitle: string;
  timestamp: string;
  author: {
    name: string;
    avatar: string;
  };
  comments?: number;
}

export function PremiumTimeline() {
  const events: TimelineEvent[] = [
    {
      id: '1',
      status: 'completed',
      title: 'Infrastructure Provisioned',
      subtitle: 'Successfully deployed 12 nodes across 3 availability zones.',
      timestamp: 'Oct 12, 10:45 AM',
      author: { name: 'Terraform Bot', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bot' },
      comments: 2
    },
    {
      id: '2',
      status: 'completed',
      title: 'Security Audit Passed',
      subtitle: 'Zero critical vulnerabilities found in the latest CI/CD pipeline scan.',
      timestamp: 'Oct 12, 11:30 AM',
      author: { name: 'Security Chief', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chief' }
    },
    {
      id: '3',
      status: 'current',
      title: 'Global Database Migration',
      subtitle: 'Moving 4TB of production data to the new encrypted cluster.',
      timestamp: 'In Progress',
      author: { name: 'DB Lead', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DB' },
      comments: 5
    },
    {
      id: '4',
      status: 'error',
      title: 'SSL Certificate Renewal',
      subtitle: 'Failed to auto-renew domain certs due to DNS propagation delay.',
      timestamp: 'Retry in 5m',
      author: { name: 'Cloud Ops', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ops' }
    },
    {
      id: '5',
      status: 'upcoming',
      title: 'Public Launch v2.0',
      subtitle: 'Awaiting green-light from the product marketing team.',
      timestamp: 'Scheduled for 4:00 PM',
      author: { name: 'Product VP', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=VP' }
    }
  ];

  return (
    <div className="w-full max-w-4xl bg-white rounded-[40px] border border-gray-100 shadow-xl overflow-hidden">
      <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-white sticky top-0 z-10">
         <div className="flex flex-col gap-1">
            <h3 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
               Process Lifecycle
               <History className="w-6 h-6 text-blue-600" />
            </h3>
            <p className="text-sm font-medium text-gray-400">Deterministic view of global system events and deployments.</p>
         </div>
         <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-2xl text-xs font-black uppercase tracking-widest">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
            Live Sync
         </div>
      </div>

      <div className="p-10 relative">
         {/* Vertical Line */}
         <div className="absolute left-[59px] top-10 bottom-10 w-0.5 bg-gray-100" />

         <div className="space-y-12">
            {events.map((event) => (
              <div key={event.id} className="relative flex items-start gap-8 group">
                 {/* Icon Node */}
                 <div className={cn(
                   "relative z-10 w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500",
                   event.status === 'completed' ? "bg-emerald-50 text-emerald-600 shadow-lg shadow-emerald-50/50" :
                   event.status === 'current' ? "bg-blue-600 text-white shadow-xl shadow-blue-200 animate-pulse" :
                   event.status === 'error' ? "bg-rose-50 text-rose-600 shadow-lg shadow-rose-50/50" :
                   "bg-gray-100 text-gray-400"
                 )}>
                    {event.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> :
                     event.status === 'current' ? <Clock className="w-5 h-5" /> :
                     event.status === 'error' ? <AlertCircle className="w-5 h-5" /> :
                     <Circle className="w-4 h-4" />}
                 </div>

                 {/* Content */}
                 <div className="flex-1 flex flex-col md:flex-row gap-6 p-6 rounded-3xl transition-all duration-300 hover:bg-gray-50/80 border border-transparent hover:border-gray-100 active:scale-[0.99]">
                    <div className="flex-1 space-y-2">
                       <div className="flex items-center justify-between">
                          <h4 className={cn("text-lg font-black tracking-tight", event.status === 'upcoming' ? "text-gray-400" : "text-gray-900")}>
                             {event.title}
                          </h4>
                          <span className="text-[10px] font-black uppercase tracking-widest text-gray-300 tabular-nums">
                             {event.timestamp}
                          </span>
                       </div>
                       <p className="text-sm font-medium text-gray-500 leading-relaxed">
                          {event.subtitle}
                       </p>
                       
                       <div className="flex items-center gap-4 pt-2">
                          <div className="flex items-center gap-2">
                             <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-100">
                                <img src={event.author.avatar} alt={event.author.name} />
                             </div>
                             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{event.author.name}</span>
                          </div>
                          {event.comments && (
                            <div className="flex items-center gap-1.5 text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
                               <MessageSquare className="w-3.5 h-3.5" />
                               <span className="text-[10px] font-black">{event.comments}</span>
                            </div>
                          )}
                       </div>
                    </div>
                    
                    <button className="self-center p-3 rounded-2xl bg-white border border-gray-100 text-gray-400 hover:text-blue-600 hover:border-blue-100 shadow-sm transition-all group/btn">
                       <ChevronRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                 </div>
              </div>
            ))}
         </div>
      </div>

      <div className="p-6 bg-gray-50 border-t border-gray-100 text-center">
         <button className="text-xs font-black text-gray-400 hover:text-gray-900 uppercase tracking-widest transition-colors">
            Load Full System History
         </button>
      </div>
    </div>
  );
}

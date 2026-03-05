import { useState } from 'react';
import { 
  Package, 
  MessageSquare, 
  AlertTriangle, 
  CheckCircle, 
  UserPlus, 
  Settings,
  Mail,
  Zap,
  Clock
} from 'lucide-react';
import { cn } from '@/utils';

interface ActivityItem {
  id: string;
  type: 'order' | 'message' | 'alert' | 'success' | 'user' | 'system';
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
}

const ICONS = {
  order: <Package className="w-4 h-4" />,
  message: <MessageSquare className="w-4 h-4" />,
  alert: <AlertTriangle className="w-4 h-4" />,
  success: <CheckCircle className="w-4 h-4" />,
  user: <UserPlus className="w-4 h-4" />,
  system: <Zap className="w-4 h-4" />,
};

const COLORS = {
  order: "bg-blue-50 text-blue-600",
  message: "bg-purple-50 text-purple-600",
  alert: "bg-amber-50 text-amber-600",
  success: "bg-emerald-50 text-emerald-600",
  user: "bg-indigo-50 text-indigo-600",
  system: "bg-slate-50 text-slate-600",
};

export function PremiumActivityFeed() {
  const [activities, setActivities] = useState<ActivityItem[]>([
    {
      id: '1',
      type: 'order',
      title: 'New High-Value Order',
      description: 'Order #8829-X was placed by Enterprise Client "Globex".',
      timestamp: 'Just now',
      isRead: false,
      priority: 'high'
    },
    {
      id: '2',
      type: 'alert',
      title: 'Server Latency Spike',
      description: 'US-EAST-1 is reporting 400ms+ response times.',
      timestamp: '12m ago',
      isRead: false,
      priority: 'high'
    },
    {
      id: '3',
      type: 'user',
      title: 'Member Invitation Accepted',
      description: 'Sarah Jenkins joined the Marketing workspace.',
      timestamp: '45m ago',
      isRead: true,
      priority: 'low'
    },
    {
      id: '4',
      type: 'message',
      title: 'New Support Ticket',
      description: 'Customer requested a billing reconciliation report.',
      timestamp: '2h ago',
      isRead: true,
      priority: 'medium'
    },
    {
      id: '5',
      type: 'success',
      title: 'Backup Successful',
      description: 'Weekly encrypted snapshot was saved to S3 bucket.',
      timestamp: '5h ago',
      isRead: true,
      priority: 'low'
    },
  ]);

  const markAllAsRead = () => {
    setActivities(prev => prev.map(a => ({ ...a, isRead: true })));
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden min-w-[380px] max-w-md">
      <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex flex-col gap-0.5">
          <h3 className="text-lg font-black text-gray-900 tracking-tight flex items-center gap-2">
            Activity Center
            <span className="flex h-5 p-1 px-2 items-center justify-center bg-blue-600 text-white rounded-full text-[10px] font-black">
              {activities.filter(a => !a.isRead).length}
            </span>
          </h3>
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Real-time system pulse</p>
        </div>
        <button 
          onClick={markAllAsRead}
          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
          title="Mark all as read"
        >
          <Mail className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 scrollbar-hide">
        <div className="flex flex-col gap-4">
          {activities.map((item) => (
            <div 
              key={item.id}
              className={cn(
                "group relative flex gap-4 p-4 rounded-2xl transition-all duration-300 border border-transparent",
                item.isRead ? "opacity-75 grayscale-[0.5] hover:opacity-100 hover:grayscale-0" : "bg-white shadow-sm hover:shadow-md border-gray-50",
                !item.isRead && item.priority === 'high' && "before:absolute before:left-[-4px] before:top-4 before:bottom-4 before:w-1 before:bg-blue-600 before:rounded-full"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110",
                COLORS[item.type]
              )}>
                {ICONS[item.type]}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                   <h4 className={cn("text-sm transition-colors", item.isRead ? "font-bold text-gray-500" : "font-black text-gray-900")}>
                     {item.title}
                   </h4>
                   <span className="text-[10px] font-bold text-gray-300 tabular-nums">{item.timestamp}</span>
                </div>
                <p className="text-[13px] font-medium text-gray-500 leading-snug">
                  {item.description}
                </p>
                {!item.isRead && (
                  <div className="mt-3 flex items-center gap-2 animate-in fade-in slide-in-from-left-2 duration-500">
                    <button className="text-[10px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                      View details
                    </button>
                    <button className="text-[10px] font-black uppercase tracking-wider text-gray-400 hover:text-gray-900 px-3 py-1.5 rounded-lg transition-all">
                      Dismiss
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-gray-50/50 border-t border-gray-50 flex items-center justify-center gap-6">
          <button className="flex items-center gap-2 text-xs font-black text-gray-400 hover:text-gray-900 transition-colors">
            <Settings className="w-3.5 h-3.5" />
            Config
          </button>
          <div className="w-[1px] h-3 bg-gray-200" />
          <button className="flex items-center gap-2 text-xs font-black text-gray-400 hover:text-gray-900 transition-colors">
            <Clock className="w-3.5 h-3.5" />
            Archives
          </button>
      </div>
    </div>
  );
}

import { ArrowUpRight, ArrowDownRight, Users, DollarSign, MousePointer2, Clock } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { cn } from '@/utils';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
  data: { v: number }[];
  color: 'blue' | 'emerald' | 'rose' | 'amber';
}

const StatCard = ({ title, value, change, trend, icon, data, color }: StatCardProps) => {
  const colorMap = {
    blue: "text-blue-600 bg-blue-50 border-blue-100",
    emerald: "text-emerald-600 bg-emerald-50 border-emerald-100",
    rose: "text-rose-600 bg-rose-50 border-rose-100",
    amber: "text-amber-600 bg-amber-50 border-amber-100",
  };

  const chartColor = {
    blue: "#3b82f6",
    emerald: "#10b981",
    rose: "#ef4444",
    amber: "#f59e0b",
  };

  return (
    <div className="group bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col gap-4 relative overflow-hidden">
      <div className="flex justify-between items-start relative z-10">
        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", colorMap[color])}>
           {icon}
        </div>
        <div className={cn(
          "flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
          trend === 'up' ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
        )}>
          {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {change}
        </div>
      </div>

      <div className="space-y-1 relative z-10">
         <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{title}</p>
         <h4 className="text-3xl font-black text-gray-900 tracking-tighter">{value}</h4>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 opacity-20 group-hover:opacity-40 transition-opacity">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColor[color]} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={chartColor[color]} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area 
              type="monotone" 
              dataKey="v" 
              stroke={chartColor[color]} 
              strokeWidth={2} 
              fillOpacity={1} 
              fill={`url(#gradient-${color})`} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export function PremiumStatsGrid() {
  const stats: StatCardProps[] = [
    {
      title: 'Total Revenue',
      value: '$84,290',
      change: '+12.5%',
      trend: 'up',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'emerald',
      data: [{v: 40}, {v: 35}, {v: 55}, {v: 45}, {v: 70}, {v: 60}, {v: 85}]
    },
    {
      title: 'Active Users',
      value: '12,402',
      change: '+8.2%',
      trend: 'up',
      icon: <Users className="w-6 h-6" />,
      color: 'blue',
      data: [{v: 20}, {v: 40}, {v: 30}, {v: 50}, {v: 45}, {v: 60}, {v: 55}]
    },
    {
      title: 'Conversion',
      value: '3.42%',
      change: '-1.4%',
      trend: 'down',
      icon: <MousePointer2 className="w-6 h-6" />,
      color: 'rose',
      data: [{v: 60}, {v: 55}, {v: 70}, {v: 50}, {v: 45}, {v: 40}, {v: 35}]
    },
    {
      title: 'Avg. Session',
      value: '14m 2s',
      change: '+2.1%',
      trend: 'up',
      icon: <Clock className="w-6 h-6" />,
      color: 'amber',
      data: [{v: 30}, {v: 35}, {v: 32}, {v: 45}, {v: 40}, {v: 48}, {v: 52}]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}

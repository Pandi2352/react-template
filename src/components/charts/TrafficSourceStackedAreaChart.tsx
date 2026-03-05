import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { month: 'Jan', organic: 1000, referral: 500, direct: 800 },
  { month: 'Feb', organic: 1200, referral: 600, direct: 900 },
  { month: 'Mar', organic: 1500, referral: 400, direct: 1200 },
  { month: 'Apr', organic: 2200, referral: 800, direct: 1100 },
  { month: 'May', organic: 1800, referral: 700, direct: 1500 },
  { month: 'Jun', organic: 2400, referral: 900, direct: 1300 },
];

/**
 * Purpose: Tracking total volume while seeing breakdown of components.
 * Helpful for: Traffic source analysis, Infrastructure costs over time, or Department-wise budget.
 */
export function TrafficSourceStackedAreaChart() {
  return (
    <div className="w-full h-[300px] bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">Traffic Source Mix</h3>
      <ResponsiveContainer width="100%" height="90%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis 
            dataKey="month" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#9ca3af', fontSize: 12 }} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#9ca3af', fontSize: 12 }}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', background: 'rgba(255,255,255,0.95)' }}
          />
          <Legend iconType="circle" />
          <Area type="monotone" dataKey="organic" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
          <Area type="monotone" dataKey="referral" stackId="1" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} />
          <Area type="monotone" dataKey="direct" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

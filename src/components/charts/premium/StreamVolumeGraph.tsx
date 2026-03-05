import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * Purpose: Centered area chart for fluid volume changes.
 * Helpful for: Traffic peaks, Volume fluctuations, or Resource utilization.
 */
export function StreamVolumeGraph() {
  const data = [
    { name: '00:00', v1: 120, v2: 150, v3: 80 },
    { name: '04:00', v1: 210, v2: 180, v3: 120 },
    { name: '08:00', v1: 340, v2: 250, v3: 190 },
    { name: '12:00', v1: 280, v2: 310, v3: 220 },
    { name: '16:00', v1: 390, v2: 240, v3: 150 },
    { name: '20:00', v1: 250, v2: 190, v3: 110 },
    { name: '23:59', v1: 140, v2: 120, v3: 90 },
  ];

  return (
    <div className="w-full h-full min-h-[300px] bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-sm font-bold text-gray-700 mb-6 uppercase tracking-wider text-center">Fluid Resource Traffic Stream</h3>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748b' }} />
          <YAxis hide />
          <Tooltip 
             contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
          <Area type="monotone" dataKey="v1" stackId="1" fill="#3b82f6" fillOpacity={0.8} stroke="#2563eb" strokeWidth={2} />
          <Area type="monotone" dataKey="v2" stackId="1" fill="#10b981" fillOpacity={0.8} stroke="#059669" strokeWidth={2} />
          <Area type="monotone" dataKey="v3" stackId="1" fill="#6366f1" fillOpacity={0.8} stroke="#4f46e5" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

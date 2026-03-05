import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * Purpose: Categorical ranges with multiple data points.
 * Helpful for: Salary ranges per role, Server temperature ranges, or Price bandwidths.
 */
export function MultiMetricRangeBar() {
  const data = [
    { name: 'Engineer', low: 80, mid: 120, high: 160 },
    { name: 'Designer', low: 70, mid: 100, high: 140 },
    { name: 'Manager', low: 110, mid: 150, high: 220 },
    { name: 'Marketing', low: 60, mid: 90, high: 130 },
    { name: 'HR', low: 55, mid: 85, high: 115 },
  ];

  return (
    <div className="w-full h-full min-h-[300px] bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-sm font-bold text-gray-700 mb-6 uppercase tracking-wider text-center">Categorical Pay Scale Bandwidth</h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748b', fontWeight: 700 }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
          <Tooltip 
             contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
             cursor={{ fill: '#f8fafc' }}
          />
          <Bar dataKey="mid" stackId="a" fill="transparent" />
          <Bar dataKey="low" fill="#cbd5e1" radius={[4, 4, 4, 4]} barSize={30} />
          <Bar dataKey="mid" fill="#6366f1" radius={[4, 4, 4, 4]} barSize={30} />
          <Bar dataKey="high" fill="#3b82f6" radius={[4, 4, 4, 4]} barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

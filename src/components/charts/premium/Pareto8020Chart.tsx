import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart, Bar } from 'recharts';

/**
 * Purpose: Identifying the core drivers of results (80/20 rule).
 * Helpful for: Quality control (most common defects), Sales (top products), or App performance (most slow pages).
 */
export function Pareto8020Chart() {
  const data = [
    { name: 'Server Lag', value: 340, cumulative: 340 },
    { name: 'Missing Assets', value: 210, cumulative: 550 },
    { name: 'Auth Error', value: 145, cumulative: 695 },
    { name: '404 Page', value: 85, cumulative: 780 },
    { name: 'Slow Database', value: 65, cumulative: 845 },
    { name: 'DNS Fail', value: 30, cumulative: 875 },
  ];

  const total = 875;
  const chartData = data.map(item => ({
    ...item,
    percent: Math.round((item.cumulative / total) * 100)
  }));

  return (
    <div className="w-full h-full min-h-[300px] bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-sm font-bold text-gray-700 mb-6 uppercase tracking-wider text-center">Pareto Principle Analysis (80/20)</h3>
      <ResponsiveContainer width="100%" height={260}>
        <ComposedChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748b', fontWeight: 700 }} />
          <YAxis yAxisId="left" orientation="left" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
          <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#3b82f6' }} domain={[0, 100]} />
          <Tooltip 
             contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
          <Bar yAxisId="left" dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
          <Line yAxisId="right" type="monotone" dataKey="percent" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

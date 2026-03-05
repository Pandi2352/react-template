import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * Purpose: Comparing data points between exactly two states or time periods.
 * Helpful for: Pre vs Post intervention, 2024 vs 2025 growth, or Before/After testing.
 */
export function SlopeMetricCompare() {
  const data = [
    { name: 'Efficiency', start: 45, end: 85 },
    { name: 'Cost', start: 90, end: 60 },
    { name: 'Speed', start: 30, end: 75 },
    { name: 'Quality', start: 65, end: 95 },
  ];

  return (
    <div className="w-full h-full min-h-[300px] bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-sm font-bold text-gray-700 mb-6 uppercase tracking-wider text-center">Performance Shift (Pre vs Post)</h3>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700 }} dy={10} />
          <YAxis hide />
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            labelStyle={{ fontWeight: 'bold', color: '#1e293b' }}
          />
          <Line type="monotone" dataKey="start" stroke="#94a3b8" strokeWidth={3} dot={{ r: 6, strokeWidth: 2, fill: '#fff' }} strokeDasharray="5 5" />
          <Line type="monotone" dataKey="end" stroke="#3b82f6" strokeWidth={4} dot={{ r: 8, strokeWidth: 2, fill: '#fff' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

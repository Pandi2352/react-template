import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area } from 'recharts';

/**
 * Purpose: Visualizing non-continuous data changes.
 * Helpful for: Price step shifts, Inventory restocking points, or Server scale-up events.
 */
export function StepPriceChangeChart() {
  const data = [
    { name: 'Mon', value: 3200 },
    { name: 'Tue', value: 3200 },
    { name: 'Wed', value: 4500 },
    { name: 'Thu', value: 4500 },
    { name: 'Fri', value: 2900 },
    { name: 'Sat', value: 2900 },
    { name: 'Sun', value: 6500 },
  ];

  return (
    <div className="w-full h-full min-h-[300px] bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-sm font-bold text-gray-700 mb-6 uppercase tracking-wider text-center">Step-wise Valuation Analysis</h3>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} dy={10} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
          <Tooltip 
            cursor={{ stroke: '#cbd5e1', strokeWidth: 1 }}
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
          <Line 
            type="stepAfter" 
            dataKey="value" 
            stroke="#6366f1" 
            strokeWidth={4} 
            dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} 
            activeDot={{ r: 8, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

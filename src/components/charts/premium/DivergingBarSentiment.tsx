import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';

/**
 * Purpose: Visualizing sentiment or polar opposites.
 * Helpful for: NPS scores (Promoters vs Detractors), Profit vs Loss, or User survey agreement.
 */
export function DivergingBarSentiment() {
  const data = [
    { name: 'Stability', value: 85 },
    { name: 'Security', value: 45 },
    { name: 'Cost', value: -40 },
    { name: 'Performance', value: 65 },
    { name: 'Maintenance', value: -110 },
    { name: 'Innovation', value: 90 },
  ];

  return (
    <div className="w-full h-full min-h-[300px] bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-sm font-bold text-gray-700 mb-6 uppercase tracking-wider text-center">Sentiment Polar Variance Index</h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748b', fontWeight: 700 }} dy={10} />
          <YAxis hide />
          <Tooltip 
             contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
             cursor={{ fill: 'transparent' }}
          />
          <ReferenceLine y={0} stroke="#cbd5e1" strokeWidth={2} />
          <Bar dataKey="value" barSize={35} radius={[6, 6, 6, 6]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.value > 0 ? '#10b981' : '#ef4444'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

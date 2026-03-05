import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

/**
 * Purpose: Part-to-whole data with emphasis on scale.
 * Helpful for: Market capitalization sectors, Multi-level budget spend.
 */
export function VariableRadiusPieChart() {
  const data = [
    { name: 'SaaS', value: 300, r: 100, fill: '#3b82f6' },
    { name: 'Cloud', value: 300, r: 85, fill: '#10b981' },
    { name: 'Hardware', value: 300, r: 75, fill: '#6366f1' },
    { name: 'AI/ML', value: 300, r: 90, fill: '#f59e0b' },
    { name: 'Edge', value: 300, r: 65, fill: '#ef4444' },
    { name: 'Crypto', value: 300, r: 55, fill: '#ec4899' },
  ];

  return (
    <div className="w-full h-full min-h-[300px] bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-sm font-bold text-gray-700 mb-6 uppercase tracking-wider text-center">Variable Sector Allocation</h3>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Tooltip 
             contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
          {data.map((entry, index) => (
            <Pie
              key={entry.name}
              data={[{ value: entry.value }]}
              cx="50%"
              cy="50%"
              outerRadius={entry.r}
              innerRadius={0}
              dataKey="value"
              startAngle={90 - (index * 60)}
              endAngle={90 - ((index + 1) * 60)}
              stroke="#fff"
              strokeWidth={2}
            >
              <Cell fill={entry.fill} />
            </Pie>
          ))}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

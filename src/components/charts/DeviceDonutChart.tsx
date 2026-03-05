import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Mobile', value: 55 },
  { name: 'Desktop', value: 30 },
  { name: 'Tablet', value: 10 },
  { name: 'Other', value: 5 },
];

const COLORS = ['#3b82f6', '#6366f1', '#10b981', '#f59e0b'];

/**
 * Purpose: Part-to-whole data distribution.
 * Helpful for: User Device Stats, Market Share, or Budget Allocation.
 */
export function DeviceDonutChart() {
  return (
    <div className="w-full h-[300px] bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">Device Distribution</h3>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            animationBegin={0}
            animationDuration={800}
          >
            {data.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
             contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend layout="vertical" verticalAlign="middle" align="right" iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

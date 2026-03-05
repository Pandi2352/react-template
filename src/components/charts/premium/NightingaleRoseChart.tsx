import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

/**
 * Purpose: Visualizing proportional Area changes across categories.
 * Helpful for: Cause of Death (Florence Nightingale original), Budget variations, or Disease statistics.
 */
export function NightingaleRoseChart() {
  const data = [
    { name: 'Category 1', value: 400, fill: '#3b82f6' },
    { name: 'Category 2', value: 300, fill: '#6366f1' },
    { name: 'Category 3', value: 300, fill: '#10b981' },
    { name: 'Category 4', value: 200, fill: '#f59e0b' },
    { name: 'Category 5', value: 278, fill: '#ef4444' },
    { name: 'Category 6', value: 189, fill: '#ec4899' },
  ];

  return (
    <div className="w-full h-full min-h-[300px] bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center">
      <h3 className="text-sm font-bold text-gray-700 mb-6 uppercase tracking-wider text-center">Nightingale Rose Area Proportion</h3>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            animationBegin={0}
            animationDuration={1500}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} strokeWidth={2} stroke="#fff" />
            ))}
          </Pie>
          <Tooltip 
             contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

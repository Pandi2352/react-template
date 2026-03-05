import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { category: 'Search Engine', views: 4000 },
  { category: 'Social Media', views: 3200 },
  { category: 'Direct Email', views: 2400 },
  { category: 'Newsletter', views: 1800 },
  { category: 'External Logs', views: 1400 },
];

/**
 * Purpose: Ranking categories with long labels.
 * Helpful for: Top Selling Products, Referral Sources, or Team Leadboard.
 */
export function CategoryPerformanceHorizontalBarChart() {
  return (
    <div className="w-full h-[300px] bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">Top Traffic Categories</h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
        >
          <CartesianGrid stroke="#f1f5f9" horizontal={false} strokeDasharray="3 3" />
          <XAxis 
            type="number" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 10 }}
          />
          <YAxis 
            dataKey="category" 
            type="category" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#475569', fontSize: 10 }}
          />
          <Tooltip 
            cursor={{ fill: '#f8fafc' }}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Bar 
            dataKey="views" 
            fill="#3b82f6" 
            radius={[0, 4, 4, 0]} 
            barSize={18}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

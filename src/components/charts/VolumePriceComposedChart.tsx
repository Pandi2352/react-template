import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Week 1', orders: 1590, revenue: 800, count: 1400 },
  { name: 'Week 2', orders: 1280, revenue: 967, count: 1506 },
  { name: 'Week 3', orders: 1397, revenue: 1098, count: 989 },
  { name: 'Week 4', orders: 1480, revenue: 1200, count: 1228 },
  { name: 'Week 5', orders: 1520, revenue: 1108, count: 1100 },
  { name: 'Week 6', orders: 1400, revenue: 680, count: 1700 },
];

/**
 * Purpose: Comparing different yet related data points.
 * Helpful for: Volume vs Conversion Rate, Temperature vs Humidity, or Sales vs ROI.
 */
export function VolumePriceComposedChart() {
  return (
    <div className="w-full h-[300px] bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">Volume vs Profit Margin</h3>
      <ResponsiveContainer width="100%" height="90%">
        <ComposedChart data={data}>
          <CartesianGrid stroke="#f1f5f9" vertical={false} strokeDasharray="3 3" />
          <XAxis 
             dataKey="name" 
             axisLine={false} 
             tickLine={false} 
             tick={{ fill: '#94a3b8', fontSize: 10 }}
             dy={10}
          />
          <YAxis 
             axisLine={false} 
             tickLine={false} 
             tick={{ fill: '#94a3b8', fontSize: 10 }}
          />
          <Tooltip 
             contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend />
          <Bar 
            dataKey="revenue" 
            barSize={20} 
            fill="#3b82f6" 
            radius={[4, 4, 0, 0]} 
          />
          <Line 
            type="monotone" 
            dataKey="orders" 
            stroke="#ef4444" 
            strokeWidth={3} 
            dot={{ r: 4, fill: '#ef4444', strokeWidth: 2, stroke: '#fff' }} 
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

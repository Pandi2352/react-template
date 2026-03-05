import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { x: 100, y: 200, z: 200, name: 'Client A' },
  { x: 120, y: 100, z: 260, name: 'Client B' },
  { x: 170, y: 300, z: 400, name: 'Client C' },
  { x: 140, y: 250, z: 280, name: 'Client D' },
  { x: 150, y: 400, z: 500, name: 'Client E' },
  { x: 110, y: 280, z: 200, name: 'Client F' },
];

/**
 * Purpose: Correlations between two variables.
 * Helpful for: Life-time Value vs Acquisition Cost, Sales vs Marketing Spend, or Frequency vs Loyalty.
 */
export function CustomerRelationshipScatterChart() {
  return (
    <div className="w-full h-[300px] bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">Spend vs Value Correlation</h3>
      <ResponsiveContainer width="100%" height="90%">
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
             type="number" 
             dataKey="x" 
             name="Acquisition Cost" 
             unit="$" 
             axisLine={false} 
             tickLine={false} 
             tick={{ fill: '#94a3b8', fontSize: 10 }}
          />
          <YAxis 
             type="number" 
             dataKey="y" 
             name="Total Revenue" 
             unit="$" 
             axisLine={false} 
             tickLine={false} 
             tick={{ fill: '#94a3b8', fontSize: 10 }}
          />
          <ZAxis type="number" dataKey="z" range={[50, 400]} />
          <Tooltip 
             cursor={{ strokeDasharray: '3 3' }}
             contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Scatter name="Clients" data={data} fill="#6366f1" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}

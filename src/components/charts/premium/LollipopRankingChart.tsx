import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ZAxis } from 'recharts';

/**
 * Purpose: High-precision categorical rankings.
 * Helpful for: Top performing regions, Best selling items, or Product popularity.
 */
export function LollipopRankingChart() {
  const data = [
    { name: 'North', value: 870 },
    { name: 'South', value: 720 },
    { name: 'East', value: 950 },
    { name: 'West', value: 640 },
    { name: 'Central', value: 580 },
    { name: 'International', value: 1100 },
  ].sort((a, b) => b.value - a.value);

  const colors = ['#3b82f6', '#6366f1', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];

  return (
    <div className="w-full h-full min-h-[300px] bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col">
      <h3 className="text-sm font-bold text-gray-700 mb-6 uppercase tracking-wider text-center font-black">Region Ranking Index</h3>
      <div className="flex-1 w-full relative">
        {data.map((item, index) => (
          <div key={item.name} className="flex flex-col gap-1 mb-4 last:mb-0">
             <div className="flex items-center justify-between px-2">
               <span className="text-[10px] font-black text-gray-500 uppercase">{item.name}</span>
               <span className="text-xs font-black text-gray-900">{item.value}</span>
             </div>
             <div className="w-full h-5 relative flex items-center px-2">
                <div className="h-[2px] w-full bg-gray-100" />
                <div 
                   className="absolute h-[2px] bg-gray-400 opacity-20" 
                   style={{ width: `${(item.value / 1200) * 100}%` }}
                />
                <div 
                   className="absolute w-4 h-4 rounded-full border-4 border-white shadow-sm transition-all duration-500"
                   style={{ left: `calc(${(item.value / 1200) * 100}% - 8px)`, backgroundColor: colors[index % colors.length] }}
                />
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}

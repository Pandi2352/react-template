import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ZAxis, ReferenceLine } from 'recharts';

/**
 * Purpose: Comparing actual performance vs targets and ranges.
 * Helpful for: Performance vs Budget, Quality ranges, or Team efficiency benchmarks.
 */
export function BulletBaselineChart() {
  const data = [
    { name: 'Revenue', actual: 80, target: 90, poor: 40, fair: 70, good: 100 },
    { name: 'Cost', actual: 60, target: 50, poor: 30, fair: 60, good: 100 },
    { name: 'NPS', actual: 85, target: 75, poor: 40, fair: 80, good: 100 },
  ];

  return (
    <div className="w-full h-full min-h-[300px] bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-sm font-bold text-gray-700 mb-6 uppercase tracking-wider text-center">Benchmark & Baseline Performance</h3>
      <div className="flex flex-col gap-8">
        {data.map((item) => (
          <div key={item.name} className="flex flex-col gap-2 relative">
             <div className="flex justify-between items-center px-1">
               <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">{item.name}</span>
               <span className="text-xs font-black text-gray-900">{item.actual}%</span>
             </div>
             <div className="h-6 w-full bg-gray-50 rounded-md overflow-hidden flex relative items-center">
                <div className="h-full bg-red-100/30" style={{ width: `${item.poor}%` }} />
                <div className="h-full bg-yellow-100/30" style={{ width: `${item.fair - item.poor}%` }} />
                <div className="h-full bg-green-100/30" style={{ width: `${item.good - item.fair}%` }} />
                
                <div 
                  className="absolute h-2 bg-slate-800 rounded-sm z-10 transition-all duration-700" 
                  style={{ width: `${item.actual}%`, left: 0 }}
                />
                
                <div 
                  className="absolute h-full w-[3px] bg-red-500 z-20 shadow-sm" 
                  style={{ left: `calc(${item.target}% - 1px)` }}
                />
             </div>
             <div className="flex justify-between text-[8px] font-bold text-gray-400 px-1">
                <span>0</span>
                <span>25</span>
                <span>50</span>
                <span>75</span>
                <span>100</span>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}

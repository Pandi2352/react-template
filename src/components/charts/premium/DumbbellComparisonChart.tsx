/**
 * Purpose: Visualizing the gap/range between two variables.
 * Helpful for: Gender pay gaps, Min vs Max response times, or Price ranges.
 */
export function DumbbellComparisonChart() {
  const data = [
    { name: 'US East', min: 120, max: 180 },
    { name: 'US West', min: 140, max: 210 },
    { name: 'Europe', min: 90, max: 150 },
    { name: 'Asia', min: 180, max: 250 },
    { name: 'Canada', min: 110, max: 170 },
  ];

  return (
    <div className="w-full h-full min-h-[300px] bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-sm font-bold text-gray-700 mb-6 uppercase tracking-wider text-center">Latency Range Index (Min/Max)</h3>
      <div className="flex flex-col gap-6">
        {data.map((item) => (
          <div key={item.name} className="flex flex-col gap-2 relative h-10 justify-center">
            <div className="flex justify-between items-center text-[10px] font-black tracking-widest text-gray-400 uppercase">
              <span>{item.name}</span>
            </div>
            <div className="w-full h-1 bg-gray-50 rounded-full relative flex items-center">
              <div 
                className="absolute h-1 bg-indigo-200 rounded-full z-10" 
                style={{ left: `${(item.min / 300) * 100}%`, width: `${((item.max - item.min) / 300) * 100}%` }}
              />
              <div 
                className="absolute w-4 h-4 rounded-full bg-white border-[3px] border-indigo-500 shadow-sm z-20"
                style={{ left: `calc(${(item.min / 300) * 100}% - 8px)` }}
              />
              <div 
                className="absolute w-4 h-4 rounded-full bg-white border-[3px] border-indigo-700 shadow-sm z-20"
                style={{ left: `calc(${(item.max / 300) * 100}% - 8px)` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

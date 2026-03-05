import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

/**
 * Purpose: High-density micro-trends for key performance indicators.
 * Helpful for: Dashboard top cards, Mini-stat summary grids.
 */
export function RevenueSparklineGrid() {
  const commonOptions: ApexOptions = {
    chart: { sparkline: { enabled: true }, animations: { speed: 800 } },
    stroke: { width: 2, curve: 'smooth' },
    colors: ['#3b82f6'],
    tooltip: { fixed: { enabled: false }, x: { show: false }, y: { title: { formatter: () => '' } }, marker: { show: false } }
  };

  const data1 = [47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 19, 46];
  const data2 = [32, 53, 41, 19, 46, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 16, 27, 54, 43, 19, 46];
  const data3 = [14, 25, 34, 48, 26, 64, 55, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 31, 27, 54, 43, 19, 46];

  const SparkItem = ({ label, value, change, color, data }: { label: string; value: string; change: string; color: string; data: number[]}) => (
    <div className="flex-1 min-w-[150px] p-4 bg-gray-50/50 rounded-xl border border-gray-100 flex flex-col gap-2">
      <div className="flex flex-col">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{label}</span>
        <div className="flex items-baseline gap-2">
           <span className="text-lg font-black text-gray-900">{value}</span>
           <span className={change.startsWith('+') ? 'text-green-500 text-[10px] font-bold' : 'text-red-500 text-[10px] font-bold'}>{change}</span>
        </div>
      </div>
      <Chart options={{...commonOptions, colors: [color]}} series={[{data}]} type="line" height={40} />
    </div>
  );

  return (
    <div className="w-full bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-wrap gap-4">
      <SparkItem label="Revenue" value="$4,390" change="+12%" color="#3b82f6" data={data1} />
      <SparkItem label="Signups" value="2,140" change="-3%" color="#ef4444" data={data2} />
      <SparkItem label="Support" value="94%" change="+8%" color="#10b981" data={data3} />
    </div>
  );
}

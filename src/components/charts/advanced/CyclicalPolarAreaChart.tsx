import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

/**
 * Purpose: Categorical data distribution in a circular sector view.
 * Helpful for: Seasonal performance, Department-wise budget allocation, or Competitor market share.
 */
export function CyclicalPolarAreaChart() {
  const series = [42, 39, 72, 35, 23, 42, 59, 21, 62, 45, 53, 41];
  
  const options: ApexOptions = {
    chart: { type: 'polarArea', height: 350 },
    stroke: { colors: ['#fff'] },
    fill: { opacity: 0.8 },
    responsive: [{
      breakpoint: 480,
      options: { chart: { width: 200 }, legend: { position: 'bottom' } }
    }],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    legend: { position: 'right' },
    colors: ['#3b82f6', '#6366f1', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#8b5cf6', '#06b6d4', '#475569', '#3b82f6', '#6366f1', '#10b981'],
    plotOptions: {
      polarArea: {
        rings: { strokeWidth: 0 },
        spokes: { strokeWidth: 0 },
      }
    },
    yaxis: { show: false }
  };

  return (
    <div className="w-full bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">Annual Seasonal Distribution</h3>
      <Chart options={options} series={series} type="polarArea" height={300} />
    </div>
  );
}

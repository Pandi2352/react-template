import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

/**
 * Purpose: Visualizing hierarchical distributions.
 * Helpful for: Demographic age pyramids, Corporate hierarchy levels, or Resource scarcity.
 */
export function PyramidPopulationChart() {
  const series = [
    {
      name: '',
      data: [200, 330, 448, 470, 540, 580, 690, 1100, 1200, 1380],
    },
  ];

  const options: ApexOptions = {
    chart: { type: 'bar', height: 350, toolbar: { show: false } },
    plotOptions: {
      bar: {
        borderRadius: 0,
        horizontal: true,
        distributed: true,
        barHeight: '80%',
      },
    },
    colors: ['#3b82f6', '#6366f1', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#8b5cf6', '#06b6d4', '#475569', '#3b82f6'],
    dataLabels: {
      enabled: true,
      formatter: (val, opt) => opt.w.globals.labels[opt.dataPointIndex] + ':  ' + val,
      dropShadow: { enabled: true },
    },
    xaxis: { categories: ['Entry', 'Junior', 'Associate', 'Mid', 'Senior', 'Staff', 'Lead', 'Principal', 'Partner', 'C-Suite'] },
    legend: { show: false },
    grid: { strokeDashArray: 4, borderColor: '#f1f5f9' },
  };

  return (
    <div className="w-full bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
       <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider text-center">Talent Pyramid</h3>
      <Chart options={options} series={series} type="bar" height={300} />
    </div>
  );
}

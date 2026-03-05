import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

/**
 * Purpose: Visualizing statistical distribution and outliers in datasets.
 * Helpful for: Server response stability, Class test result distribution, or Clinical study variations.
 */
export function BoxWhiskerDistributionChart() {
  const series = [
    {
      type: 'boxPlot',
      data: [
        { x: 'Jan', y: [45, 52, 63, 68, 75] }, // [min, q1, median, q3, max]
        { x: 'Feb', y: [52, 60, 68, 72, 80] },
        { x: 'Mar', y: [42, 55, 61, 70, 78] },
        { x: 'Apr', y: [55, 68, 72, 85, 92] },
        { x: 'May', y: [48, 52, 64, 75, 85] },
        { x: 'Jun', y: [62, 72, 79, 88, 95] },
        { x: 'Jul', y: [50, 58, 65, 78, 88] },
      ],
    },
  ];

  const options: ApexOptions = {
    chart: { type: 'boxPlot', height: 350, toolbar: { show: false } },
    plotOptions: {
      boxPlot: {
        colors: { upper: '#3b82f6', lower: '#6366f1' },
      },
    },
    xaxis: { axisBorder: { show: false }, axisTicks: { show: false } },
    grid: { strokeDashArray: 4, borderColor: '#f1f5f9' },
  };

  return (
    <div className="w-full bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">Performance Stability Analysis</h3>
      <Chart options={options} series={series} type="boxPlot" height={300} />
    </div>
  );
}

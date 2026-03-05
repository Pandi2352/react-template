import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

/**
 * Purpose: Density of activity over time or categories.
 * Helpful for: Server load matrix, Help desk ticket frequency by hour, or User engagement heatmaps.
 */
export function ActivityHeatmapChart() {
  const generateData = (count: number, yrange: { min: number; max: number }) => {
    let i = 0;
    const series = [];
    while (i < count) {
      series.push({
        x: 'W' + (i + 1).toString(),
        y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
      });
      i++;
    }
    return series;
  };

  const series = [
    { name: 'Mon', data: generateData(18, { min: 0, max: 90 }) },
    { name: 'Tue', data: generateData(18, { min: 0, max: 90 }) },
    { name: 'Wed', data: generateData(18, { min: 0, max: 90 }) },
    { name: 'Thu', data: generateData(18, { min: 0, max: 90 }) },
    { name: 'Fri', data: generateData(18, { min: 0, max: 90 }) },
  ];

  const options: ApexOptions = {
    chart: { height: 350, type: 'heatmap', toolbar: { show: false } },
    dataLabels: { enabled: false },
    colors: ["#3b82f6"],
    plotOptions: {
      heatmap: {
        radius: 2,
        enableShades: true,
        colorScale: {
          ranges: [
            { from: 0, to: 30, color: '#eff6ff', name: 'low' },
            { from: 31, to: 60, color: '#3b82f6', name: 'medium' },
            { from: 61, to: 90, color: '#1e3a8a', name: 'high' },
          ]
        }
      }
    },
    xaxis: { axisBorder: { show: false }, axisTicks: { show: false } },
  };

  return (
    <div className="w-full bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">Weekly Activity Matrix</h3>
      <Chart options={options} series={series} type="heatmap" height={300} />
    </div>
  );
}

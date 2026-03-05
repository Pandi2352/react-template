import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

/**
 * Purpose: Visualizing relationship between 3 independent metrics (X, Y, and Size).
 * Helpful for: Risk Assessment (Probability vs Impact vs Cost), or Sales Performance (Deals vs Margin vs Revenue).
 */
export function DemographicBubbleChart() {
  const generateData = (_baseval: number, count: number, yrange: { min: number; max: number }) => {
    let series = [];
    for (let i = 0; i < count; i++) {
      let x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
      let y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
      let z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;
      series.push([x, y, z]);
    }
    return series;
  };

  const series = [
    { name: 'Bubble1', data: generateData(new Date('11 Feb 2026 GMT').getTime(), 20, { min: 10, max: 60 }) },
    { name: 'Bubble2', data: generateData(new Date('11 Feb 2026 GMT').getTime(), 20, { min: 10, max: 60 }) },
    { name: 'Bubble3', data: generateData(new Date('11 Feb 2026 GMT').getTime(), 20, { min: 10, max: 60 }) },
  ];

  const options: ApexOptions = {
    chart: { height: 350, type: 'bubble', toolbar: { show: false } },
    dataLabels: { enabled: false },
    fill: { opacity: 0.8 },
    xaxis: { tickAmount: 12, type: 'category', axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { max: 70 },
    theme: { palette: 'palette2' },
    colors: ['#3b82f6', '#6366f1', '#f59e0b'],
    grid: { strokeDashArray: 4, borderColor: '#f1f5f9' },
  };

  return (
    <div className="w-full bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">Metric Risk Exposure</h3>
      <Chart options={options} series={series} type="bubble" height={300} />
    </div>
  );
}

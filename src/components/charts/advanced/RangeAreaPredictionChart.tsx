import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

/**
 * Purpose: Predicting future performance while showing confidence intervals.
 * Helpful for: Financial forecasting, Quality control margins, or A/B test results.
 */
export function RangeAreaPredictionChart() {
  const series = [
    {
      name: 'Prediction Margin',
      type: 'rangeArea',
      data: [
        { x: 'Jan', y: [1100, 1900] },
        { x: 'Feb', y: [1200, 1800] },
        { x: 'Mar', y: [900, 2900] },
        { x: 'Apr', y: [1400, 2700] },
        { x: 'May', y: [2600, 3900] },
        { x: 'Jun', y: [1900, 3100] },
        { x: 'Jul', y: [2400, 3500] },
      ],
    },
    {
      name: 'Actual Revenue',
      type: 'line',
      data: [
        { x: 'Jan', y: 1500 },
        { x: 'Feb', y: 1700 },
        { x: 'Mar', y: 1400 },
        { x: 'Apr', y: 1900 },
        { x: 'May', y: 3100 },
        { x: 'Jun', y: 2400 },
        { x: 'Jul', y: 2800 },
      ],
    },
  ];

  const options: ApexOptions = {
    chart: { height: 350, type: 'rangeArea', animations: { speed: 500 }, toolbar: { show: false } },
    colors: ['#6366f1', '#3b82f6'],
    dataLabels: { enabled: false },
    fill: { opacity: [0.24, 1] },
    forecastDataPoints: { count: 2 },
    stroke: { curve: 'straight', width: [0, 4] },
    legend: { show: true, position: 'top', horizontalAlign: 'left' },
    xaxis: { axisBorder: { show: false }, axisTicks: { show: false } },
    grid: { strokeDashArray: 4, borderColor: '#f1f5f9' },
  };

  return (
    <div className="w-full bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">Revenue Forecast Modeling</h3>
      <Chart options={options} series={series} type="rangeArea" height={300} />
    </div>
  );
}

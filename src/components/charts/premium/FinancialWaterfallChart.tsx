import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

/**
 * Purpose: Tracking financial flow and accumulated balances.
 * Helpful for: Cash flow changes, Budget variances, or Earnings breakdowns.
 */
export function FinancialWaterfallChart() {
  const series = [
    {
      data: [
        { x: 'Initial', y: 4000 },
        { x: 'Revenue Q1', y: 3000 },
        { x: 'Expenses Q1', y: -2400 },
        { x: 'Revenue Q2', y: 4500 },
        { x: 'Expenses Q2', y: -2900 },
        { x: 'Adjustments', y: -1000 },
        { x: 'Final', y: 5200 },
      ],
    },
  ];

  const options: ApexOptions = {
    chart: { type: 'bar', height: 350, toolbar: { show: false } },
    plotOptions: {
      bar: {
        colors: {
          ranges: [
            { from: -10000, to: -1, color: '#ef4444' },
            { from: 0, to: 10000, color: '#10b981' },
          ]
        },
        columnWidth: '80%',
      },
    },
    dataLabels: { enabled: true, style: { fontSize: '10px' } },
    xaxis: { axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { title: { text: '$ Balance', style: { color: '#94a3b8' } } },
    grid: { strokeDashArray: 4, borderColor: '#f1f5f9' },
  };

  return (
    <div className="w-full bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider text-center">Cash Flow Waterfall</h3>
      <Chart options={options} series={series} type="bar" height={300} />
    </div>
  );
}

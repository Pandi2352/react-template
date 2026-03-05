import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

/**
 * Purpose: Professional financial market candle visualization.
 * Helpful for: Stock analysis, Trading platforms, or Asset price volatility.
 */
export function MarketCandlestickChart() {
  const series = [
    {
      data: [
        { x: new Date('2026-03-01').getTime(), y: [120, 135, 115, 130] }, // [open, high, low, close]
        { x: new Date('2026-03-02').getTime(), y: [132, 140, 130, 138] },
        { x: new Date('2026-03-03').getTime(), y: [136, 138, 120, 125] },
        { x: new Date('2026-03-04').getTime(), y: [128, 135, 122, 133] },
        { x: new Date('2026-03-05').getTime(), y: [135, 145, 132, 142] },
        { x: new Date('2026-03-06').getTime(), y: [140, 142, 138, 139] },
        { x: new Date('2026-03-07').getTime(), y: [138, 142, 125, 127] },
      ],
    },
  ];

  const options: ApexOptions = {
    chart: { type: 'candlestick', height: 350, toolbar: { show: false } },
    plotOptions: {
      candlestick: {
        colors: { upward: '#10b981', downward: '#ef4444' },
      },
    },
    xaxis: { type: 'datetime', axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { tooltip: { enabled: true } },
    grid: { strokeDashArray: 4, borderColor: '#f1f5f9' },
  };

  return (
    <div className="w-full bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">Asset Performance Index</h3>
      <Chart options={options} series={series} type="candlestick" height={300} />
    </div>
  );
}

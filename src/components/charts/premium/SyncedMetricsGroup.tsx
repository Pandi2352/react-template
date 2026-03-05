import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

/**
 * Purpose: Comparing two trends in lock-step.
 * Helpful for: Server CPU vs RAM, Price vs Volume, or Impressions vs Clicks.
 */
export function SyncedMetricsGroup() {
  const series1 = [{ name: 'Sessions', data: [31, 40, 28, 51, 42, 109, 100] }];
  const series2 = [{ name: 'Conversions', data: [11, 32, 45, 32, 34, 52, 41] }];
  
  const commonOptions: ApexOptions = {
    chart: { group: 'sparks', animations: { speed: 500 }, toolbar: { show: false } },
    stroke: { curve: 'straight', width: 3 },
    grid: { strokeDashArray: 4, borderColor: '#f1f5f9' },
    xaxis: { axisBorder: { show: false }, axisTicks: { show: false } },
    dataLabels: { enabled: false },
  };

  const options1: ApexOptions = {
    ...commonOptions,
    chart: { ...commonOptions.chart, id: 'fb', type: 'line', height: 160 },
    colors: ['#3b82f6'],
    yaxis: { labels: { minWidth: 40 } },
    title: { text: 'Web Traffic', style: { fontSize: '12px', fontWeight: 'bold' } }
  };

  const options2: ApexOptions = {
    ...commonOptions,
    chart: { ...commonOptions.chart, id: 'tw', type: 'line', height: 160 },
    colors: ['#10b981'],
    yaxis: { labels: { minWidth: 40 } },
    title: { text: 'Direct Sales', style: { fontSize: '12px', fontWeight: 'bold' } }
  };

  return (
    <div className="w-full bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-4">
      <Chart options={options1} series={series1} type="line" height={130} />
      <Chart options={options2} series={series2} type="line" height={130} />
    </div>
  );
}

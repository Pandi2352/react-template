import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

/**
 * Purpose: Visualizing multi-stage conversion rates.
 * Helpful for: Sales pipeine stages, Recruitment funnel, or E-commerce checkout drop-offs.
 */
export function SalesFunnelChart() {
  const series = [
    {
      name: 'Leads',
      data: [1380, 1100, 990, 880, 740, 548, 330, 200],
    },
  ];

  const options: ApexOptions = {
    chart: { type: 'bar', height: 350, toolbar: { show: false } },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
        barHeight: '80%',
        isFunnel: true,
      },
    },
    colors: ['#3b82f6'],
    dataLabels: {
      enabled: true,
      formatter: (val, opt) => opt.w.globals.labels[opt.dataPointIndex] + ':  ' + val,
      dropShadow: { enabled: true },
    },
    title: { text: 'Sales Pipeline (Funnel)', align: 'center', style: { color: '#475569' } },
    xaxis: { categories: ['Prospecting', 'Qualification', 'Needs Analysis', 'Proposal', 'Negotiation', 'Closed Won', 'Follow-up', 'Archive'] },
    legend: { show: false },
  };

  return (
    <div className="w-full bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <Chart options={options} series={series} type="bar" height={320} />
    </div>
  );
}

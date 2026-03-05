import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

/**
 * Purpose: Part-to-whole categorical data distribution using nested areas.
 * Helpful for: Portfolio Allocation, Market Capitalization sectors, or File System storage visualization.
 */
export function CategoryTreemapChart() {
  const series = [
    {
      data: [
        { x: 'Mobile Ops', y: 218 },
        { x: 'Web Services', y: 149 },
        { x: 'Cloud Infrastructure', y: 134 },
        { x: 'Security Compliance', y: 52 },
        { x: 'Data Intelligence', y: 44 },
        { x: 'Human Resources', y: 34 },
        { x: 'Customer Support', y: 31 },
        { x: 'Marketing Automation', y: 8 },
      ],
    },
  ];

  const options: ApexOptions = {
    chart: { height: 350, type: 'treemap', toolbar: { show: false } },
    colors: ['#3b82f6', '#10b981', '#6366f1', '#f59e0b', '#ef4444', '#ec4899', '#8b5cf6', '#06b6d4'],
    plotOptions: {
      treemap: {
        distributed: true,
        enableShades: true,
        borderRadius: 4
      }
    },
    dataLabels: { enabled: true, style: { fontSize: '12px' } },
  };

  return (
    <div className="w-full bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">Organizational Budget Allocation</h3>
      <Chart options={options} series={series} type="treemap" height={300} />
    </div>
  );
}

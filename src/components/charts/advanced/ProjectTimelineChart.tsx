import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

/**
 * Purpose: Professional project timeline and task scheduling.
 * Helpful for: Project Management (Gantt views), Resource Allocation, or Event Logs.
 */
export function ProjectTimelineChart() {
  const series = [
    {
      data: [
        { x: 'Analysis', y: [new Date('2026-03-01').getTime(), new Date('2026-03-05').getTime()], fillColor: '#3b82f6' },
        { x: 'Design', y: [new Date('2026-03-04').getTime(), new Date('2026-03-08').getTime()], fillColor: '#6366f1' },
        { x: 'Frontend', y: [new Date('2026-03-07').getTime(), new Date('2026-03-15').getTime()], fillColor: '#10b981' },
        { x: 'Backend', y: [new Date('2026-03-09').getTime(), new Date('2026-03-18').getTime()], fillColor: '#f59e0b' },
        { x: 'Testing', y: [new Date('2026-03-16').getTime(), new Date('2026-03-22').getTime()], fillColor: '#ef4444' },
      ],
    },
  ];

  const options: ApexOptions = {
    chart: { height: 350, type: 'rangeBar', toolbar: { show: false } },
    plotOptions: {
      bar: { horizontal: true, distributed: true, barHeight: '60%', borderRadius: 6 },
    },
    xaxis: { type: 'datetime', axisBorder: { show: false }, axisTicks: { show: false } },
    grid: { strokeDashArray: 4, borderColor: '#f1f5f9' },
    tooltip: { x: { format: 'dd MMM' } },
    legend: { show: false }
  };

  return (
    <div className="w-full bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">Project Phase Timeline</h3>
      <Chart options={options} series={series} type="rangeBar" height={300} />
    </div>
  );
}

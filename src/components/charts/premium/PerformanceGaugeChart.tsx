import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

/**
 * Purpose: Single-score performance tracking.
 * Helpful for: Server CPU load, Uptime percentage, or Team Productivity.
 */
export function PerformanceGaugeChart() {
  const series = [75];
  
  const options: ApexOptions = {
    chart: { height: 350, type: 'radialBar', toolbar: { show: false } },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: { margin: 0, size: '70%', background: '#fff' },
        track: { background: '#f1f5f9', strokeWidth: '67%', margin: 0 },
        dataLabels: {
          show: true,
          name: { offsetY: -10, show: true, color: '#9ca3af', fontSize: '14px' },
          value: { 
            offsetY: 5, color: '#3b82f6', fontSize: '30px', fontWeight: 'bold', show: true,
            formatter: (val) => val + '%'
          }
        }
      }
    },
    fill: { 
      type: 'gradient', 
      gradient: { shade: 'dark', type: 'horizontal', shadeIntensity: 0.5, gradientToColors: ['#6366f1'], inverseColors: true, opacityFrom: 1, opacityTo: 1, stops: [0, 100] } 
    },
    stroke: { lineCap: 'round' },
    labels: ['Efficiency'],
  };

  return (
    <div className="w-full bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <Chart options={options} series={series} type="radialBar" height={320} />
    </div>
  );
}

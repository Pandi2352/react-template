import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

/**
 * Purpose: Progress tracking across multiple categories or sub-tasks.
 * Helpful for: Multi-KPI health (CPU/RAM/Storage), Department Goals, or Skill Learning levels.
 */
export function TieredRadialProgressChart() {
  const series = [44, 55, 67, 83];
  
  const options: ApexOptions = {
    chart: { height: 350, type: 'radialBar' },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: { fontSize: '22px' },
          value: { fontSize: '16px' },
          total: {
            show: true,
            label: 'Total',
            formatter: (_w) => '249'
          }
        },
        hollow: { size: '30%' },
        track: { strokeWidth: '95%', background: '#f1f5f9' },
      }
    },
    labels: ['Apples', 'Oranges', 'Bananas', 'Berries'],
    colors: ['#3b82f6', '#6366f1', '#10b981', '#f59e0b'],
    stroke: { lineCap: 'round' }
  };

  return (
    <div className="w-full bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">Multi-Metric Progress</h3>
      <Chart options={options} series={series} type="radialBar" height={300} />
    </div>
  );
}

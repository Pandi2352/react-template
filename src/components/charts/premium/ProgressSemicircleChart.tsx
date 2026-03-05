import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

/**
 * Purpose: Tracking completion of circular targets.
 * Helpful for: Monthly budget used, Storage used, or Training progress.
 */
export function ProgressSemicircleChart() {
  const series = [67];
  
  const options: ApexOptions = {
    chart: { type: 'radialBar', offsetY: -20, sparkline: { enabled: true } },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: { background: "#f1f5f9", strokeWidth: '97%', margin: 5, dropShadow: { enabled: true, top: 2, left: 0, color: '#94a3b8', opacity: 0.1, blur: 5 } },
        dataLabels: {
          name: { show: false },
          value: { offsetY: -2, fontSize: '22px', fontWeight: 'bold' }
        }
      }
    },
    grid: { padding: { top: -10 } },
    fill: { 
      type: 'gradient', 
      gradient: { shade: 'light', shadeIntensity: 0.4, inverseColors: false, opacityFrom: 1, opacityTo: 1, stops: [0, 50, 53, 91] }, 
    },
    labels: ['Average Results'],
    colors: ['#10b981'],
  };

  return (
    <div className="w-full bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center">
      <h3 className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider text-center">Global Performance</h3>
      <Chart options={options} series={series} type="radialBar" height={300} />
      <div className="text-xs text-gray-400 font-medium -mt-10 uppercase tracking-widest">Target Met</div>
    </div>
  );
}

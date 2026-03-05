import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

/**
 * Purpose: Exploring long-duration time-series with a simplified navigation brush.
 * Helpful for: Historic Stock prices (e.g., 5-year views), Server logs, or High-frequency sensor data.
 */
export function BrushNavigationChart() {
  const generateData = (count: number, yrange: { min: number; max: number }) => {
    let i = 0;
    const series = [];
    while (i < count) {
      let x = 'Day ' + (i + 1).toString();
      let y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
      series.push({x, y});
      i++;
    }
    return series;
  };

  const data = generateData(40, { min: 10, max: 80 });

  const options: ApexOptions = {
    chart: { id: 'chart2', type: 'line', height: 230, toolbar: { show: false } },
    colors: ['#3b82f6'],
    stroke: { width: 3 },
    dataLabels: { enabled: false },
    fill: { opacity: 1, type: 'gradient' },
    xaxis: { type: 'category' },
    grid: { strokeDashArray: 4, borderColor: '#f1f5f9' },
  };

  const optionsBrush: ApexOptions = {
    chart: { 
      id: 'chart1', 
      height: 130, 
      type: 'area', 
      brush: { target: 'chart2', enabled: true }, 
      selection: { enabled: true, xaxis: { min: 5, max: 20 } }
    },
    colors: ['#6366f1'],
    fill: { type: 'gradient', gradient: { opacityFrom: 0.91, opacityTo: 0.1 } },
    xaxis: { type: 'category', tooltip: { enabled: false } },
    yaxis: { tickAmount: 2 },
  };

  const series = [{ data: data }];

  return (
    <div className="w-full bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-4">
      <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Historical Trend Navigator</h3>
      <Chart options={options} series={series} type="line" height={150} />
      <Chart options={optionsBrush} series={series} type="area" height={100} />
    </div>
  );
}

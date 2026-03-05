import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Revenue', value: 85, fill: '#3b82f6' },
  { name: 'Leads', value: 72, fill: '#6366f1' },
  { name: 'Uptime', value: 99, fill: '#10b981' },
  { name: 'Support', value: 64, fill: '#f59e0b' },
];

/**
 * Purpose: Tracking multiple targets or completion rates.
 * Helpful for: Fitness Goals, Department KPIs, or Project Milestone Progress.
 */
export function GoalCompletionRadialBarChart() {
  return (
    <div className="w-full h-[300px] bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">KPI Target Tracking</h3>
      <ResponsiveContainer width="100%" height="90%">
        <RadialBarChart 
          cx="50%" 
          cy="50%" 
          innerRadius="30%" 
          outerRadius="100%" 
          barSize={10} 
          data={data}
          startAngle={180}
          endAngle={-180}
        >
          <RadialBar
            label={{ position: 'insideStart', fill: '#fff' }}
            background
            dataKey="value"
            cornerRadius={5}
          />
          <Tooltip 
             contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend 
            iconSize={10} 
            layout="vertical" 
            verticalAlign="middle" 
            align="right" 
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}

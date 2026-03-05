import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ErrorBar } from 'recharts';

/**
 * Purpose: Visualizing precision and uncertainty in datasets.
 * Helpful for: Experimental results, Statistical polling, or Confidence intervals on specific points.
 */
export function ErrorBarPrecisionChart() {
  const data = [
    { x: 10, y: 30, error: 5 },
    { x: 20, y: 45, error: 8 },
    { x: 30, y: 65, error: 12 },
    { x: 40, y: 55, error: 5 },
    { x: 50, y: 85, error: 15 },
    { x: 60, y: 75, error: 7 },
    { x: 70, y: 45, error: 10 },
  ];

  return (
    <div className="w-full h-full min-h-[300px] bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-sm font-bold text-gray-700 mb-6 uppercase tracking-wider text-center font-black italic">Precision Error Tolerance Index</h3>
      <ResponsiveContainer width="100%" height={260}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis type="number" dataKey="x" name="Phase" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748b' }} />
          <YAxis type="number" dataKey="y" name="Result" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748b' }} />
          <Tooltip 
             contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
             cursor={{ strokeDasharray: '3 3' }}
          />
          <Scatter name="Test Group A" data={data} fill="#6366f1">
            <ErrorBar dataKey="error" width={4} strokeWidth={2} stroke="#ef4444" direction="y" />
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip, Legend } from 'recharts';

/**
 * Purpose: Comparing multi-dimensional profiles across multiple subjects.
 * Helpful for: Candidate skill comparison, Product A vs Product B specs, or Game character stats.
 */
export function RadarComplexProfile() {
  const data = [
    { subject: 'Math', A: 120, B: 110, fullMark: 150 },
    { subject: 'Chinese', A: 98, B: 130, fullMark: 150 },
    { subject: 'English', A: 86, B: 130, fullMark: 150 },
    { subject: 'Geography', A: 99, B: 100, fullMark: 150 },
    { subject: 'Physics', A: 85, B: 90, fullMark: 150 },
    { subject: 'History', A: 65, B: 85, fullMark: 150 },
  ];

  return (
    <div className="w-full h-full min-h-[300px] bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center">
      <h3 className="text-sm font-bold text-gray-700 mb-6 uppercase tracking-wider text-center">Multi-Profile Capability Scan</h3>
      <ResponsiveContainer width="100%" height={260}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#f1f5f9" />
          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }} />
          <PolarRadiusAxis hide />
          <Tooltip 
             contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
          <Radar name="Team Alpha" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
          <Radar name="Team Beta" dataKey="B" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
          <Legend wrapperStyle={{ fontSize: '10px', fontWeight: 'bold', paddingTop: '10px' }} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

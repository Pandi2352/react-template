import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
  { subject: 'UI/UX', current: 120, target: 150 },
  { subject: 'Reliability', current: 98, target: 130 },
  { subject: 'Speed', current: 86, target: 130 },
  { subject: 'Features', current: 145, target: 160 },
  { subject: 'Documentation', current: 70, target: 100 },
  { subject: 'Security', current: 150, target: 180 },
];

/**
 * Purpose: Multi-dimensional performance evaluation.
 * Helpful for: Skill matrices, Product Feature comparison, or Competitor Analysis across criteria.
 */
export function FeatureEngagementRadarChart() {
  return (
    <div className="w-full h-[300px] bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">Product Capability Profile</h3>
      <ResponsiveContainer width="100%" height="90%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#f1f5f9" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10 }} />
          <PolarRadiusAxis angle={30} domain={[0, 200]} tick={false} />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend />
          <Radar
            name="Current Version"
            dataKey="current"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.5}
            activeDot={{ r: 4 }}
          />
          <Radar
            name="Target Goals"
            dataKey="target"
            stroke="#6366f1"
            strokeDasharray="4 4"
            fill="#64748b"
            fillOpacity={0.1}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

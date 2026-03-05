import { 
  RevenueLineChart, 
  UserGrowthAreaChart, 
  RegionalSalesBarChart, 
  DeviceDonutChart, 
  TrafficSourceStackedAreaChart, 
  FeatureEngagementRadarChart, 
  CustomerRelationshipScatterChart, 
  VolumePriceComposedChart, 
  CategoryPerformanceHorizontalBarChart, 
  GoalCompletionRadialBarChart 
} from '@/components/charts';
import { Info } from 'lucide-react';

const ChartCard = ({ title, description, usage, children }: { 
  title: string; 
  description: string; 
  usage: string; 
  children: React.ReactNode 
}) => (
  <div className="flex flex-col gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
    <div className="flex flex-col gap-1">
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed font-medium">{description}</p>
    </div>
    
    <div className="flex-1 min-h-[300px] flex items-center justify-center">
      {children}
    </div>

    <div className="flex items-start gap-3 p-3 bg-blue-50/50 rounded-xl">
      <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
      <div className="flex flex-col gap-1">
        <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Best For</span>
        <span className="text-xs text-blue-600 font-medium">{usage}</span>
      </div>
    </div>
  </div>
);

export function ChartsShowcase() {
  return (
    <div className="flex flex-col gap-10 max-w-[1600px] mx-auto pb-20">
      <div className="flex flex-col gap-4 border-b border-gray-100 pb-10">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Enterprise Chart Suite</h1>
        <p className="text-xl text-gray-500 max-w-3xl leading-relaxed font-medium">
          A definitive collection of 10 purpose-built data visualizations. Each component is modular, responsive, and optimized for high-density enterprise dashboards.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <ChartCard 
          title="Revenue Line Chart" 
          description="A standard line graph for tracking performance variations over time." 
          usage="Profit vs Loss tracking, Monthly Revenue leaks, or Stock performance."
        >
          <RevenueLineChart />
        </ChartCard>

        <ChartCard 
          title="Growth Area Chart" 
          description="An area chart using sleek gradients to visualize total volume build-up." 
          usage="Cumulative User Growth, Network Bandwidth usage, or Total Data storage."
        >
          <UserGrowthAreaChart />
        </ChartCard>

        <ChartCard 
          title="Regional Bar Comparison" 
          description="Side-by-side grouped bars for comparing multiple categorical variables." 
          usage="Sales by Region, Product category performance, or Browser market share."
        >
          <RegionalSalesBarChart />
        </ChartCard>

        <ChartCard 
          title="Distribution Donut" 
          description="A minimalist donut chart showing part-to-whole relationships with clear labels." 
          usage="Device usage (Mobile/Web/Tablet), Budget splits, or Feedback sentiment."
        >
          <DeviceDonutChart />
        </ChartCard>

        <ChartCard 
          title="Market Mix Stacked Area" 
          description="A stacked area view showing how the total volume is shared between sources." 
          usage="Acquisition Source mix (Organic/Paid), Server costs per department, or Traffic peaks."
        >
          <TrafficSourceStackedAreaChart />
        </ChartCard>

        <ChartCard 
          title="Capability Radar Map" 
          description="A multi-axis chart comparing performance across 5+ independent criteria." 
          usage="Skill matrices for Teams, Feature comparisons (Us vs Competitor), or App health metrics."
        >
          <FeatureEngagementRadarChart />
        </ChartCard>

        <ChartCard 
          title="Spend vs Value Scatter" 
          description="Revealing correlations between two metrics using spatial positioning." 
          usage="Customer Lifetime Value vs Spend, Lead Quality vs Time-to-close, or Loyalty score."
        >
          <CustomerRelationshipScatterChart />
        </ChartCard>

        <ChartCard 
          title="Efficiency Composed View" 
          description="Mixing Bars and Lines to relate two different data types in one context." 
          usage="Total Revenue vs Profit Margin percentage, Leads vs Conversion rates."
        >
          <VolumePriceComposedChart />
        </ChartCard>

        <ChartCard 
          title="Leaderboard Horizontal Bars" 
          description="The best way to display rankings where category names are long and descriptive." 
          usage="Top Performing Sales Reps, Best referral sites, or most visited help articles."
        >
          <CategoryPerformanceHorizontalBarChart />
        </ChartCard>

        <ChartCard 
          title="Target Goal Radial Bar" 
          description="Individual gauge-style bars showing progress towards specific 100% goals." 
          usage="Daily KPI tracking, Departmental targets, or Project milestone completion."
        >
          <GoalCompletionRadialBarChart />
        </ChartCard>
      </div>
    </div>
  );
}

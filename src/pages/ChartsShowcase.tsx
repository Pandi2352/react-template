import { useState } from 'react';
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
import {
  ProjectTimelineChart,
  MarketCandlestickChart,
  ActivityHeatmapChart,
  DemographicBubbleChart,
  TieredRadialProgressChart,
  CyclicalPolarAreaChart,
  CategoryTreemapChart,
  BrushNavigationChart,
  RangeAreaPredictionChart,
  BoxWhiskerDistributionChart
} from '@/components/charts/advanced';
import { Info, BarChart3, TrendingUp } from 'lucide-react';
import { cn } from '@/utils';

const ChartCard = ({ title, description, usage, children, isAdvanced = false }: { 
  title: string; 
  description: string; 
  usage: string; 
  children: React.ReactNode;
  isAdvanced?: boolean;
}) => (
  <div className={cn(
    "flex flex-col gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300",
    isAdvanced && "border-indigo-100 bg-indigo-50/5"
  )}>
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        {isAdvanced && <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] font-bold rounded-full uppercase">Advanced</span>}
      </div>
      <p className="text-sm text-gray-500 leading-relaxed font-medium">{description}</p>
    </div>
    
    <div className="flex-1 min-h-[300px] flex items-center justify-center">
      {children}
    </div>

    <div className={cn(
      "flex items-start gap-3 p-3 rounded-xl",
      isAdvanced ? "bg-indigo-50/50" : "bg-blue-50/50"
    )}>
      <Info className={cn("w-5 h-5 mt-0.5 flex-shrink-0", isAdvanced ? "text-indigo-500" : "text-blue-500")} />
      <div className="flex flex-col gap-1">
        <span className={cn("text-xs font-bold uppercase tracking-wider", isAdvanced ? "text-indigo-700" : "text-blue-700")}>Best For</span>
        <span className={cn("text-xs font-medium", isAdvanced ? "text-indigo-600" : "text-blue-600")}>{usage}</span>
      </div>
    </div>
  </div>
);

export function ChartsShowcase() {
  const [activeTab, setActiveTab] = useState<'standard' | 'advanced'>('standard');

  return (
    <div className="flex flex-col gap-10 max-w-[1600px] mx-auto pb-20">
      <div className="flex flex-col gap-6 border-b border-gray-100 pb-10">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Enterprise Chart Suite</h1>
          <p className="text-xl text-gray-500 max-w-3xl leading-relaxed font-medium">
            A definitive collection of 20 purpose-built data visualizations using **Recharts** and **ApexCharts**.
          </p>
        </div>

        <div className="flex p-1 bg-gray-100 rounded-xl w-fit">
          <button 
            onClick={() => setActiveTab('standard')}
            className={cn(
              "flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all",
              activeTab === 'standard' ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
            )}
          >
            <BarChart3 className="w-4 h-4" />
            Standard Charts (10)
          </button>
          <button 
            onClick={() => setActiveTab('advanced')}
            className={cn(
              "flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all",
              activeTab === 'advanced' ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
            )}
          >
             <TrendingUp className="w-4 h-4" />
            Advanced Charts (10)
          </button>
        </div>
      </div>

      {activeTab === 'standard' ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 animate-in fade-in duration-500">
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
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 animate-in fade-in duration-500">
          <ChartCard 
            isAdvanced
            title="Phase Timeline (Gantt)" 
            description="Professional project scheduling and task milestone visualization." 
            usage="Project management, Task dependencies, or Server uptime logging."
          >
            <ProjectTimelineChart />
          </ChartCard>

          <ChartCard 
            isAdvanced
            title="Market Candlestick" 
            description="Financial market price movements with High, Low, Open, and Close values." 
            usage="Trading dashboards, Stock analysis, or Currency volatility tracking."
          >
            <MarketCandlestickChart />
          </ChartCard>

          <ChartCard 
            isAdvanced
            title="Activity Heatmap" 
            description="Visualizing the density of events over a categorical matrix." 
            usage="Github-style user activity, Help desk ticket load by hour, or Server traffic logs."
          >
            <ActivityHeatmapChart />
          </ChartCard>

          <ChartCard 
            isAdvanced
            title="Relational Bubble Chart" 
            description="Expanding scatter plots with a third dimension using the bubble radius." 
            usage="Market pricing vs Quality vs Popularity, Risk exposure mapping."
          >
            <DemographicBubbleChart />
          </ChartCard>

          <ChartCard 
            isAdvanced
            title="Multi-Level Radial Bar" 
            description="Concentric rings showing progress across many independent metrics." 
            usage="CPU/RAM/Buffer health, Sales team goal completion, Multi-skill levels."
          >
            <TieredRadialProgressChart />
          </ChartCard>

          <ChartCard 
            isAdvanced
            title="Cyclical Polar Area" 
            description="Sector-based data distribution in a 360-degree space." 
            usage="Annual sales cycles, Category budget allocations, Survey distributions."
          >
            <CyclicalPolarAreaChart />
          </ChartCard>

          <ChartCard 
            isAdvanced
            title="Hierarchical Treemap" 
            description="Revealing relative proportions using nested rectangular areas." 
            usage="Market Cap of sectors, File system usage, Asset allocation breakdown."
          >
            <CategoryTreemapChart />
          </ChartCard>

          <ChartCard 
            isAdvanced
            title="Brush Navigation Navigator" 
            description="High-density time-series data with a dedicated zoom/brush control." 
            usage="Yearly stock performance, high-frequency log analysis, IoT monitoring."
          >
            <BrushNavigationChart />
          </ChartCard>

          <ChartCard 
            isAdvanced
            title="Forecasting Range Area" 
            description="Trend mapping with shaded confidence intervals and error margins." 
            usage="Revenue prediction, Prediction modeling, Quality control charts."
          >
            <RangeAreaPredictionChart />
          </ChartCard>

          <ChartCard 
            isAdvanced
            title="Statistical Box Plot" 
            description="Comprehensive distribution analysis showing Min, Median, and Max outliers." 
            usage="Response time variance, Test scores distribution, Clinical results stability."
          >
            <BoxWhiskerDistributionChart />
          </ChartCard>
        </div>
      )}
    </div>
  );
}

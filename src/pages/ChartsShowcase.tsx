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
import {
  SalesFunnelChart,
  FinancialWaterfallChart,
  PerformanceGaugeChart,
  ProgressSemicircleChart,
  PyramidPopulationChart,
  SyncedMetricsGroup,
  RevenueSparklineGrid,
  SlopeMetricCompare,
  StepPriceChangeChart,
  LollipopRankingChart,
  BulletBaselineChart,
  DumbbellComparisonChart,
  NightingaleRoseChart,
  VariableRadiusPieChart,
  Pareto8020Chart,
  DivergingBarSentiment,
  StreamVolumeGraph,
  ErrorBarPrecisionChart,
  RadarComplexProfile,
  MultiMetricRangeBar
} from '@/components/charts/premium';
import { Info, BarChart3, TrendingUp, Star } from 'lucide-react';
import { cn } from '@/utils';

const ChartCard = ({ title, description, usage, children, variant = 'standard' }: { 
  title: string; 
  description: string; 
  usage: string; 
  children: React.ReactNode;
  variant?: 'standard' | 'advanced' | 'premium';
}) => (
  <div className={cn(
    "flex flex-col gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300",
    variant === 'advanced' && "border-indigo-100 bg-indigo-50/5",
    variant === 'premium' && "border-amber-100 bg-amber-50/5"
  )}>
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        {variant === 'advanced' && <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] font-bold rounded-full uppercase">Advanced</span>}
        {variant === 'premium' && <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-full uppercase">Premium</span>}
      </div>
      <p className="text-sm text-gray-500 leading-relaxed font-medium">{description}</p>
    </div>
    
    <div className="flex-1 min-h-[300px] flex items-center justify-center">
      {children}
    </div>

    <div className={cn(
      "flex items-start gap-3 p-3 rounded-xl",
      variant === 'advanced' ? "bg-indigo-50/50" : variant === 'premium' ? "bg-amber-50/50" : "bg-blue-50/50"
    )}>
      <Info className={cn(
        "w-5 h-5 mt-0.5 flex-shrink-0", 
        variant === 'advanced' ? "text-indigo-500" : variant === 'premium' ? "text-amber-500" : "text-blue-500"
      )} />
      <div className="flex flex-col gap-1">
        <span className={cn(
          "text-xs font-bold uppercase tracking-wider", 
          variant === 'advanced' ? "text-indigo-700" : variant === 'premium' ? "text-amber-700" : "text-blue-700"
        )}>Best For</span>
        <span className={cn(
          "text-xs font-medium", 
          variant === 'advanced' ? "text-indigo-600" : variant === 'premium' ? "text-amber-600" : "text-blue-600"
        )}>{usage}</span>
      </div>
    </div>
  </div>
);

export function ChartsShowcase() {
  const [activeTab, setActiveTab] = useState<'standard' | 'advanced' | 'premium'>('standard');

  return (
    <div className="flex flex-col gap-10 max-w-[1600px] mx-auto pb-20">
      <div className="flex flex-col gap-6 border-b border-gray-100 pb-10">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Enterprise Chart Suite</h1>
          <p className="text-xl text-gray-500 max-w-3xl leading-relaxed font-medium">
            A definitive collection of **40** purpose-built data visualizations using **Recharts** and **ApexCharts**.
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
            Standard (10)
          </button>
          <button 
            onClick={() => setActiveTab('advanced')}
            className={cn(
              "flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all",
              activeTab === 'advanced' ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
            )}
          >
             <TrendingUp className="w-4 h-4" />
            Advanced (10)
          </button>
          <button 
            onClick={() => setActiveTab('premium')}
            className={cn(
              "flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all",
              activeTab === 'premium' ? "bg-white text-amber-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
            )}
          >
             <Star className="w-4 h-4" />
            Premium (20)
          </button>
        </div>
      </div>

      {activeTab === 'standard' && (
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
      )}

      {activeTab === 'advanced' && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 animate-in fade-in duration-500">
          <ChartCard 
            variant="advanced"
            title="Phase Timeline (Gantt)" 
            description="Professional project scheduling and task milestone visualization." 
            usage="Project management, Task dependencies, or Server uptime logging."
          >
            <ProjectTimelineChart />
          </ChartCard>

          <ChartCard 
            variant="advanced"
            title="Market Candlestick" 
            description="Financial market price movements with High, Low, Open, and Close values." 
            usage="Trading dashboards, Stock analysis, or Currency volatility tracking."
          >
            <MarketCandlestickChart />
          </ChartCard>

          <ChartCard 
            variant="advanced"
            title="Activity Heatmap" 
            description="Visualizing the density of events over a categorical matrix." 
            usage="Github-style user activity, Help desk ticket load by hour, or Server traffic logs."
          >
            <ActivityHeatmapChart />
          </ChartCard>

          <ChartCard 
            variant="advanced"
            title="Relational Bubble Chart" 
            description="Expanding scatter plots with a third dimension using the bubble radius." 
            usage="Market pricing vs Quality vs Popularity, Risk exposure mapping."
          >
            <DemographicBubbleChart />
          </ChartCard>

          <ChartCard 
            variant="advanced"
            title="Multi-Level Radial Bar" 
            description="Concentric rings showing progress across many independent metrics." 
            usage="CPU/RAM/Buffer health, Sales team goal completion, Multi-skill levels."
          >
            <TieredRadialProgressChart />
          </ChartCard>

          <ChartCard 
            variant="advanced"
            title="Cyclical Polar Area" 
            description="Sector-based data distribution in a 360-degree space." 
            usage="Annual sales cycles, Category budget allocations, Survey distributions."
          >
            <CyclicalPolarAreaChart />
          </ChartCard>

          <ChartCard 
            variant="advanced"
            title="Hierarchical Treemap" 
            description="Revealing relative proportions using nested rectangular areas." 
            usage="Market Cap of sectors, File system usage, Asset allocation breakdown."
          >
            <CategoryTreemapChart />
          </ChartCard>

          <ChartCard 
            variant="advanced"
            title="Brush Navigation Navigator" 
            description="High-density time-series data with a dedicated zoom/brush control." 
            usage="Yearly stock performance, high-frequency log analysis, IoT monitoring."
          >
            <BrushNavigationChart />
          </ChartCard>

          <ChartCard 
            variant="advanced"
            title="Forecasting Range Area" 
            description="Trend mapping with shaded confidence intervals and error margins." 
            usage="Revenue prediction, Prediction modeling, Quality control charts."
          >
            <RangeAreaPredictionChart />
          </ChartCard>

          <ChartCard 
            variant="advanced"
            title="Statistical Box Plot" 
            description="Comprehensive distribution analysis showing Min, Median, and Max outliers." 
            usage="Response time variance, Test scores distribution, Clinical results stability."
          >
            <BoxWhiskerDistributionChart />
          </ChartCard>
        </div>
      )}

      {activeTab === 'premium' && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 animate-in fade-in duration-500">
          <ChartCard 
            variant="premium"
            title="Conversion Funnel" 
            description="Multi-stage process visualization with conversion rates." 
            usage="Sales pipelines, Marketing funnels, Recruitment tracking."
          >
            <SalesFunnelChart />
          </ChartCard>

          <ChartCard 
            variant="premium"
            title="Financial Waterfall" 
            description="Accumulated balance tracking with positive/negative shifts." 
            usage="Cash flow analysis, Budget variances, Earnings breakdowns."
          >
            <FinancialWaterfallChart />
          </ChartCard>

          <ChartCard 
            variant="premium"
            title="Efficiency Gauge" 
            description="Speedometer-style single KPI performance monitoring." 
            usage="Server health, Team productivity, Real-time resource utilization."
          >
            <PerformanceGaugeChart />
          </ChartCard>

          <ChartCard 
            variant="premium"
            title="Semicircle Target" 
            description="Clean 180-degree progress visualization for specific targets." 
            usage="Monthly quota tracking, Storage capacity, Learning progress."
          >
            <ProgressSemicircleChart />
          </ChartCard>

          <ChartCard 
            variant="premium"
            title="Talent Pyramid" 
            description="Hierarchical distribution mapping for resources or personnel." 
            usage="Staffing levels, Corporate seniority, Resource scarcity ranking."
          >
            <PyramidPopulationChart />
          </ChartCard>

          <ChartCard 
            variant="premium"
            title="Synchronized Lock-Step" 
            description="Multiple charts interacting together to reveal cross-metric trends." 
            usage="CPU vs RAM behavior, Marketing spend vs Resulting traffic."
          >
            <SyncedMetricsGroup />
          </ChartCard>

          <ChartCard 
            variant="premium"
            title="Sparkline Micro-Stats" 
            description="High-density minimal graphs for quick dashboard status checks." 
            usage="Real-time KPI summaries, Minimalist mobile dashboard cards."
          >
            <RevenueSparklineGrid />
          </ChartCard>

          <ChartCard 
            variant="premium"
            title="Slope Point-to-Point" 
            description="Identifying directional shifts between exactly two states or dates." 
            usage="Before/After testing results, Year-over-year categorical growth."
          >
            <SlopeMetricCompare />
          </ChartCard>

          <ChartCard 
            variant="premium"
            title="Step-wise Valuation" 
            description="Visualizing price or scale shifts that happen in discrete intervals." 
            usage="Subscription price history, Server scaling events, Inventory restocks."
          >
            <StepPriceChangeChart />
          </ChartCard>

          <ChartCard 
            variant="premium"
            title="Lollipop Ranking Index" 
            description="Clean categorical ranking with prioritized weight visualization." 
            usage="Product popularity leaderboards, Regional sales performance ranking."
          >
            <LollipopRankingChart />
          </ChartCard>

          <ChartCard 
            variant="premium"
            title="Benchmark Bullet Plot" 
            description="Comparing performance against targets, baselines, and ranges." 
            usage="Departmental budget vs actual vs target, Benchmark tracking."
          >
            <BulletBaselineChart />
          </ChartCard>

          <ChartCard 
            variant="premium"
            title="Dumbbell Delta Index" 
            description="Visualizing the gap or variance between a Minimum and Maximum point." 
            usage="Latency ranges, Salary bandwidths, Min/Max seasonal temperatures."
          >
            <DumbbellComparisonChart />
          </ChartCard>

          <ChartCard 
            variant="premium"
            title="Rose Area Proportion" 
            description="Sector-based area mapping for proportional categorical comparison." 
            usage="Cause and effect analysis, Budget mix, Disease statistic tracking."
          >
            <NightingaleRoseChart />
          </ChartCard>

          <ChartCard 
            variant="premium"
            title="Variable Donut Radius" 
            description="Emphasizing scale differnces using both angle and sector depth." 
            usage="Market capitalization sectors, Portofolio risk allocation."
          >
            <VariableRadiusPieChart />
          </ChartCard>

          <ChartCard 
            variant="premium"
            title="Pareto 80/20 Driver" 
            description="Combining bars and lines to identify the core 20% drivers of results." 
            usage="Quality control defects, Top selling products identification."
          >
            <Pareto8020Chart />
          </ChartCard>

          <ChartCard 
            variant="premium"
            title="Diverging Sentiment" 
            description="Polarizing data against a central baseline for profit/loss or agreement." 
            usage="NPS score breakdowns, Net profit variance, Survey sentiment."
          >
            <DivergingBarSentiment />
          </ChartCard>

          <ChartCard 
            variant="premium"
            title="Fluid Traffic Stream" 
            description="A flowing representation of volume changes over continuous time." 
            usage="Active user session streams, Server resource flow, Network traffic."
          >
            <StreamVolumeGraph />
          </ChartCard>

          <ChartCard 
            variant="premium"
            title="Precision Margin Scan" 
            description="Scatter plots with vertical error bars showing statistical uncertainty." 
            usage="Clinical trial results, Polling data precision, Quality control margins."
          >
            <ErrorBarPrecisionChart />
          </ChartCard>

          <ChartCard 
            variant="premium"
            title="Profile Radar Scan" 
            description="Side-by-side comparison of two multi-dimensional entities." 
            usage="Candidate A vs Candidate B, Product feature set comparison."
          >
            <RadarComplexProfile />
          </ChartCard>

          <ChartCard 
            variant="premium"
            title="Bandwidth Range Bar" 
            description="Categorical bars showing a Low, Mid, and High range per entity." 
            usage="Salary bands per role, Temperature tolerances, Stock price bandwidth."
          >
            <MultiMetricRangeBar />
          </ChartCard>
        </div>
      )}
    </div>
  );
}

/**
 * ============================================================================
 * 📊 INSIGHTS VIEW
 * ============================================================================
 * Description: Clean, actionable analytics dashboard.
 * Features: Recharts integration, top-level KPIs, AI strategic insights.
 * Vibe: Data-driven, professional, no vanity metrics.
 * ============================================================================
 */

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, Users, Eye, MessageSquare, Zap, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/src/lib/utils";

// 📈 Mock Data: Performance over time
const data = [
  { name: 'Mon', engagement: 4000, reach: 2400 },
  { name: 'Tue', engagement: 3000, reach: 1398 },
  { name: 'Wed', engagement: 2000, reach: 9800 },
  { name: 'Thu', engagement: 2780, reach: 3908 },
  { name: 'Fri', engagement: 1890, reach: 4800 },
  { name: 'Sat', engagement: 2390, reach: 3800 },
  { name: 'Sun', engagement: 3490, reach: 4300 },
];

// 📊 Mock Data: Content type performance
const postTypes = [
  { name: 'Motivational', value: 85 },
  { name: 'Questions',    value: 65 },
  { name: 'Tips/Tricks',  value: 45 },
  { name: 'Behind Scenes',value: 30 },
];

export function InsightsView() {
  return (
    // 🎬 Entrance Animation Container
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* ==========================================
          🔝 TOP SECTION: KPI STAT CARDS
          ========================================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Engagement Rate" value="4.8%" trend="+1.2%" isPositive icon={MessageSquare} />
        <StatCard title="Total Reach" value="124.5K" trend="+12.4%" isPositive icon={Eye} />
        <StatCard title="Follower Growth" value="+842" trend="-2.1%" isPositive={false} icon={Users} />
      </div>

      {/* ==========================================
          📊 MIDDLE SECTION: CHARTS
          ========================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 📈 Main Line Chart (Performance Overview) */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6 relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[60px] pointer-events-none" />
          
          <h3 className="text-lg font-semibold tracking-tight mb-6 relative z-10">Performance Overview</h3>
          
          <div className="h-[300px] w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                {/* Subtle Grid Lines */}
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                {/* Axes */}
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} tickLine={false} axisLine={false} />
                {/* Custom Tooltip */}
                <Tooltip 
                  contentStyle={{ backgroundColor: '#161A22', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                {/* Data Lines */}
                <Line type="monotone" dataKey="engagement" stroke="var(--color-accent)" strokeWidth={3} dot={{ r: 4, fill: '#0F1115', strokeWidth: 2 }} activeDot={{ r: 6, fill: 'var(--color-accent)' }} />
                <Line type="monotone" dataKey="reach" stroke="rgba(255,255,255,0.2)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 📊 Horizontal Bar Chart (Top Performing Types) */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col relative overflow-hidden">
          <h3 className="text-lg font-semibold tracking-tight mb-6 relative z-10">Top Performing Types</h3>
          
          <div className="flex-1 w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={postTypes} layout="vertical" margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.5)" tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#161A22', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
                {/* Gradient-like Bars */}
                <Bar dataKey="value" fill="var(--color-accent)" radius={[0, 4, 4, 0]} barSize={24}>
                  {postTypes.map((entry, index) => (
                    <cell key={`cell-${index}`} fill={`rgba(0, 210, 255, ${1 - index * 0.2})`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ==========================================
          🧠 BOTTOM SECTION: AI STRATEGIC INSIGHT
          ========================================== */}
      <div className="glass-panel rounded-2xl p-6 border border-accent/20 relative overflow-hidden group">
        {/* Ambient Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-accent/10 to-transparent opacity-50" />
        
        <div className="relative z-10 flex items-start gap-4">
          {/* Icon */}
          <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center shrink-0 border border-accent/30 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
            <Zap className="w-6 h-6 text-accent" />
          </div>
          
          {/* Content */}
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-white mb-2">AI Strategic Insight</h3>
            <p className="text-muted leading-relaxed">
              "Evening motivational posts perform <span className="text-success font-bold">34% better</span> than morning tips. 
              Your audience engages most with questions asked between 6 PM and 8 PM. 
              Consider shifting your 'Tips/Tricks' content to weekends for a 15% projected reach increase."
            </p>
            
            {/* Actions */}
            <div className="mt-4 flex gap-3">
              <button className="px-4 py-2 rounded-lg bg-accent text-bg text-sm font-semibold hover:bg-accent-hover transition-colors shadow-[0_0_10px_rgba(0,210,255,0.3)]">
                Apply Strategy
              </button>
              <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 transition-colors">
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 📈 Stat Card Sub-Component
 * ----------------------------------------------------------------------------
 * Reusable component for displaying top-level KPIs.
 */
function StatCard({ title, value, trend, isPositive, icon: Icon }: any) {
  return (
    <div className="glass-panel rounded-2xl p-6 relative overflow-hidden group hover:bg-white/[0.02] transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-muted uppercase tracking-wider">{title}</span>
        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
          <Icon className="w-4 h-4 text-white/40 group-hover:text-accent transition-colors" />
        </div>
      </div>
      
      {/* Value & Trend */}
      <div className="flex items-end justify-between">
        <span className="text-4xl font-bold tracking-tighter text-white">{value}</span>
        <div className={cn(
          "flex items-center gap-1 text-sm font-semibold px-2 py-1 rounded-md",
          isPositive ? "text-success bg-success/10" : "text-error bg-error/10"
        )}>
          {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
          {trend}
        </div>
      </div>
    </div>
  );
}

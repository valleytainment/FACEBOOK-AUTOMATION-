/**
 * ============================================================================
 * 🏠 DASHBOARD VIEW (MAIN SCREEN)
 * ============================================================================
 * Description: The primary control center. Where the magic happens.
 * Features: Big toggle switch, Health Score, Metric Cards, Timeline.
 * Vibe: Elite, Data-Driven, Calm.
 * ============================================================================
 */

import { useState } from "react";
import { motion } from "motion/react";
import { 
  Zap, 
  Activity, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  BarChart2,
  Calendar,
  Layers
} from "lucide-react";
import { cn } from "@/src/lib/utils";

export function DashboardView() {
  // 🎛️ STATE: Master Automation Switch
  const [isAutomationOn, setIsAutomationOn] = useState(true);

  return (
    // 🎬 Entrance Animation Container
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* ==========================================
          🔝 TOP SECTION: SYSTEM STATUS & HEALTH
          ========================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 🎛️ MAIN STATUS CARD (Col Span 2) */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6 relative overflow-hidden group">
          {/* Hover Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="flex items-start justify-between relative z-10">
            {/* Left: Info */}
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-1 flex items-center gap-3">
                Automation: 
                <span className={cn(
                  "transition-colors duration-300",
                  isAutomationOn ? "text-success drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]" : "text-muted"
                )}>
                  {isAutomationOn ? "ON" : "OFF"}
                </span>
              </h2>
              <p className="text-muted text-sm mb-6">System is running smoothly. No errors detected.</p>
              
              {/* Meta Details (Mono font for data feel) */}
              <div className="space-y-3 font-mono text-sm">
                <div className="flex items-center gap-3 text-white/80">
                  <Clock className="w-4 h-4 text-accent" />
                  <span className="w-24 text-muted">Next Post:</span>
                  <span className="font-medium text-white">Today 6:00 PM</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <Zap className="w-4 h-4 text-accent" />
                  <span className="w-24 text-muted">Model:</span>
                  <span className="font-medium text-white">GPT-4o</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  <span className="w-24 text-muted">Page:</span>
                  <span className="font-medium text-white">Valleytainment</span>
                </div>
              </div>
            </div>

            {/* Right: Big Toggle Switch */}
            <div className="flex flex-col items-center gap-3">
              <button 
                onClick={() => setIsAutomationOn(!isAutomationOn)}
                className={cn(
                  "relative w-20 h-10 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-bg",
                  isAutomationOn ? "bg-success/20 border border-success/50" : "bg-white/5 border border-white/10"
                )}
              >
                {/* Animated Toggle Thumb */}
                <motion.div 
                  className={cn(
                    "absolute top-1 w-8 h-8 rounded-full shadow-md flex items-center justify-center",
                    isAutomationOn ? "bg-success shadow-[0_0_15px_rgba(16,185,129,0.6)]" : "bg-muted"
                  )}
                  animate={{ left: isAutomationOn ? "calc(100% - 36px)" : "4px" }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <Zap className={cn("w-4 h-4", isAutomationOn ? "text-bg" : "text-bg/50")} />
                </motion.div>
              </button>
              <span className="text-xs font-mono text-muted uppercase tracking-wider">
                {isAutomationOn ? "Active" : "Paused"}
              </span>
            </div>
          </div>
        </div>

        {/* 💯 HEALTH SCORE CARD (Col Span 1) */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2" />
          
          <h3 className="text-sm font-medium text-muted uppercase tracking-widest mb-4">Health Score</h3>
          
          {/* SVG Circular Progress */}
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background Track */}
              <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
              {/* Animated Progress Ring */}
              <motion.circle 
                cx="50" cy="50" r="45" fill="none" 
                stroke="var(--color-accent)" strokeWidth="8" strokeLinecap="round"
                strokeDasharray="283"
                initial={{ strokeDashoffset: 283 }}
                animate={{ strokeDashoffset: 283 - (283 * 0.97) }} // 97% Score
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="drop-shadow-[0_0_8px_rgba(0,210,255,0.5)]"
              />
            </svg>
            {/* Center Text */}
            <div className="absolute flex flex-col items-center">
              <span className="text-4xl font-bold text-white tracking-tighter">97</span>
              <span className="text-[10px] text-success font-mono uppercase tracking-wider mt-1">Excellent</span>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          📊 MIDDLE SECTION: METRICS GRID
          ========================================== */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard title="Posts Today" value="2" sub="of 3 scheduled" icon={Calendar} />
        <MetricCard title="Posts This Week" value="14" sub="+2 from last week" icon={BarChart2} trend="up" />
        <MetricCard title="Content Variety" value="86/100" sub="Optimal mix" icon={Layers} trend="up" />
        <MetricCard title="Consistency Streak" value="23" sub="Days without miss" icon={Activity} trend="up" />
      </div>

      {/* ==========================================
          ⏳ BOTTOM SECTION: TIMELINE
          ========================================== */}
      <div className="glass-panel rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold tracking-tight">Upcoming Schedule</h3>
          <button className="text-xs text-accent hover:text-accent-hover font-medium transition-colors">
            View Full Schedule →
          </button>
        </div>
        
        {/* Vertical Timeline Container */}
        <div className="space-y-0 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
          <TimelineItem time="Today 6:00 PM" title="Motivation Post" status="scheduled" confidence={86} />
          <TimelineItem time="Tomorrow 9:00 AM" title="Morning Tips" status="pending" confidence={74} />
          <TimelineItem time="Tomorrow 6:00 PM" title="Inspirational Quote" status="pending" confidence={81} />
        </div>
      </div>
    </div>
  );
}

/**
 * 📈 Metric Card Sub-Component
 * ----------------------------------------------------------------------------
 * Displays a single KPI with icon and trend indicator.
 */
function MetricCard({ title, value, sub, icon: Icon, trend }: any) {
  return (
    <div className="glass-panel rounded-xl p-5 flex flex-col justify-between group hover:bg-white/[0.02] transition-colors">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-medium text-muted uppercase tracking-wider">{title}</span>
        <Icon className="w-4 h-4 text-white/20 group-hover:text-accent/50 transition-colors" />
      </div>
      <div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold tracking-tight text-white">{value}</span>
          {trend === 'up' && <TrendingUp className="w-3 h-3 text-success" />}
        </div>
        <span className="text-xs text-muted font-mono mt-1 block">{sub}</span>
      </div>
    </div>
  );
}

/**
 * ⏳ Timeline Item Sub-Component
 * ----------------------------------------------------------------------------
 * Displays a single scheduled or pending post in the timeline.
 */
function TimelineItem({ time, title, status, confidence }: any) {
  const isScheduled = status === 'scheduled';
  
  return (
    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active py-4">
      {/* Center Node (Dot) */}
      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-bg bg-card/80 backdrop-blur-sm shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 relative">
        <div className={cn(
          "w-2.5 h-2.5 rounded-full transition-all duration-300",
          isScheduled ? "bg-accent shadow-[0_0_8px_rgba(0,210,255,0.8)]" : "bg-muted"
        )} />
      </div>
      
      {/* Content Card */}
      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-panel rounded-xl p-4 hover:bg-white/[0.03] transition-colors cursor-pointer relative overflow-hidden">
        {/* Accent border for scheduled items */}
        {isScheduled && <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent/50" />}
        
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-mono text-muted">{time}</span>
          {/* AI Confidence Badge */}
          <div className="flex items-center gap-1.5 bg-white/5 px-2 py-0.5 rounded text-[10px] font-mono text-success border border-white/5">
            <Zap className="w-3 h-3" /> {confidence}% Match
          </div>
        </div>
        <h4 className="text-sm font-medium text-white">{title}</h4>
      </div>
    </div>
  );
}

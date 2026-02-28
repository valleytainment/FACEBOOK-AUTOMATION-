/**
 * ============================================================================
 * 📅 SCHEDULE VIEW
 * ============================================================================
 * Description: Grid-based time selector for defining when the AI should post.
 * Features: Weekly grid, smart AI suggestions, auto-fill toggles.
 * Vibe: Organized, systematic, and intelligent.
 * ============================================================================
 */

import { useState } from "react";
import { Plus, Zap, Settings2, CalendarDays, CheckCircle2, Wand2 } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useLocalStorage } from "@/src/hooks/useLocalStorage";
import { useToast } from "@/src/components/ui/ToastContext";

// 🗓️ Constants for Grid Generation
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TIMES = ["9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM", "9:00 PM"];

export function ScheduleView() {
  const { showToast } = useToast();

  // 🎛️ STATE: Global Schedule Settings
  const [autoFill, setAutoFill] = useLocalStorage("vt_schedule_autofill", true);
  const [manualApproval, setManualApproval] = useLocalStorage("vt_schedule_manual", false);

  // 🎛️ STATE: Mock Schedule Data (Day -> Time -> Boolean)
  const [schedule, setSchedule] = useLocalStorage<Record<string, Record<string, boolean>>>("vt_schedule_grid", {
    "Mon": { "9:00 AM": true, "6:00 PM": true },
    "Tue": { "12:00 PM": true, "6:00 PM": true },
    "Wed": { "9:00 AM": true, "3:00 PM": true },
    "Thu": { "6:00 PM": true, "9:00 PM": true },
    "Fri": { "9:00 AM": true, "12:00 PM": true, "6:00 PM": true },
    "Sat": { "12:00 PM": true },
    "Sun": { "6:00 PM": true },
  });

  /**
   * 🔄 Toggle Slot Action
   * Flips the boolean state of a specific day/time slot.
   */
  const toggleSlot = (day: string, time: string) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [time]: !prev[day]?.[time]
      }
    }));
  };

  /**
   * 🚀 Apply Suggestion Action
   */
  const handleApplySuggestion = () => {
    setSchedule(prev => ({
      ...prev,
      "Thu": {
        ...prev["Thu"],
        "6:00 PM": true // Closest to 6:30 PM for this demo
      }
    }));
    showToast("AI suggestion applied to schedule.", "success");
  };

  /**
   * 🪄 Run Auto-Fill Engine
   * Populates the grid with an optimal posting pattern.
   */
  const handleRunAutoFill = () => {
    const optimalSchedule = {
      "Mon": { "9:00 AM": true, "12:00 PM": true, "6:00 PM": true },
      "Tue": { "9:00 AM": true, "3:00 PM": true, "6:00 PM": true },
      "Wed": { "9:00 AM": true, "12:00 PM": true, "6:00 PM": true },
      "Thu": { "9:00 AM": true, "3:00 PM": true, "6:00 PM": true },
      "Fri": { "9:00 AM": true, "12:00 PM": true, "3:00 PM": true, "6:00 PM": true },
      "Sat": { "12:00 PM": true, "6:00 PM": true },
      "Sun": { "12:00 PM": true, "6:00 PM": true, "9:00 PM": true },
    };
    setSchedule(optimalSchedule);
    showToast("Auto-fill engine complete. 20 slots optimized for maximum reach.", "success");
  };

  return (
    // 🎬 Entrance Animation Container
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* ==========================================
          🎛️ HEADER CONTROLS
          ========================================== */}
      <div className="glass-panel rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-[60px] pointer-events-none" />
        
        {/* Title Area */}
        <div className="relative z-10">
          <h2 className="text-2xl font-bold tracking-tight mb-2 flex items-center gap-3">
            <CalendarDays className="w-6 h-6 text-accent" />
            Posting Schedule
          </h2>
          <p className="text-muted text-sm">Define when the AI should automatically publish content.</p>
        </div>

        {/* Global Toggles & Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10">
          
          {/* 🪄 Auto-Fill Action Button */}
          <button 
            onClick={handleRunAutoFill}
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-accent text-bg font-semibold text-sm hover:bg-accent-hover transition-all shadow-[0_0_15px_rgba(0,210,255,0.3)] hover:shadow-[0_0_25px_rgba(0,210,255,0.5)]"
          >
            <Wand2 className="w-4 h-4" />
            Run Auto-Fill
          </button>

          {/* Auto-fill Toggle */}
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">Auto-fill Slots</span>
              <span className="text-[10px] text-muted">AI generates content for empty slots</span>
            </div>
            <Toggle checked={autoFill} onChange={() => setAutoFill(!autoFill)} />
          </div>
          
          {/* Manual Approval Toggle */}
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">Manual Approval</span>
              <span className="text-[10px] text-muted">Review before posting</span>
            </div>
            <Toggle checked={manualApproval} onChange={() => setManualApproval(!manualApproval)} />
          </div>
        </div>
      </div>

      {/* ==========================================
          🧠 SMART SUGGESTION BANNER
          ========================================== */}
      <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 flex items-center gap-4 relative overflow-hidden group">
        {/* Animated Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        
        {/* Icon */}
        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
          <Zap className="w-5 h-5 text-accent" />
        </div>
        
        {/* Content */}
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-white">AI Insight</h4>
          <p className="text-xs text-accent/80 font-mono mt-0.5">
            Best engagement time detected: <span className="text-white font-bold">6:30 PM on Thursdays</span>. Consider adding a slot.
          </p>
        </div>
        
        {/* Action */}
        <button 
          onClick={handleApplySuggestion}
          className="px-4 py-2 rounded-lg bg-accent/20 hover:bg-accent/30 text-accent text-xs font-semibold transition-colors border border-accent/30"
        >
          Apply Suggestion
        </button>
      </div>

      {/* ==========================================
          📅 SCHEDULE GRID
          ========================================== */}
      <div className="glass-panel rounded-2xl overflow-hidden border border-border">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            
            {/* 🗓️ Table Header (Days) */}
            <thead>
              <tr>
                <th className="p-4 border-b border-r border-border bg-white/5 w-24 text-center">
                  <Settings2 className="w-4 h-4 text-muted mx-auto" />
                </th>
                {DAYS.map(day => (
                  <th key={day} className="p-4 border-b border-border bg-white/5 text-center font-semibold text-sm tracking-wider uppercase text-muted">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            
            {/* 🕒 Table Body (Times & Slots) */}
            <tbody>
              {TIMES.map(time => (
                <tr key={time} className="group">
                  {/* Time Label Column */}
                  <td className="p-4 border-b border-r border-border bg-white/[0.02] text-xs font-mono text-muted text-center whitespace-nowrap">
                    {time}
                  </td>
                  
                  {/* Interactive Slots */}
                  {DAYS.map(day => {
                    const isActive = schedule[day]?.[time];
                    return (
                      <td key={`${day}-${time}`} className="p-2 border-b border-border text-center relative">
                        <button
                          onClick={() => toggleSlot(day, time)}
                          className={cn(
                            "w-full h-12 rounded-lg border border-dashed transition-all duration-300 flex items-center justify-center group/btn relative overflow-hidden",
                            isActive 
                              // Active State Styling
                              ? "bg-accent/10 border-accent/50 hover:bg-accent/20 hover:border-accent" 
                              // Inactive State Styling
                              : "border-white/10 hover:border-white/30 hover:bg-white/5"
                          )}
                        >
                          {isActive ? (
                            <>
                              {/* Active Background Glow */}
                              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-50" />
                              {/* Checkmark Icon */}
                              <CheckCircle2 className="w-5 h-5 text-accent drop-shadow-[0_0_8px_rgba(0,210,255,0.8)] relative z-10" />
                            </>
                          ) : (
                            // Add Icon (Visible on hover)
                            <Plus className="w-4 h-4 text-muted opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                          )}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/**
 * 🎚️ Custom Toggle Switch Sub-Component
 * ----------------------------------------------------------------------------
 * Reusable UI element for boolean settings.
 */
function Toggle({ checked, onChange }: { checked: boolean, onChange: () => void }) {
  return (
    <button 
      onClick={onChange}
      className={cn(
        "w-12 h-6 rounded-full relative transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-bg shrink-0",
        checked ? "bg-accent" : "bg-white/10"
      )}
    >
      <div className={cn(
        "absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 shadow-sm",
        checked ? "left-[26px]" : "left-1"
      )} />
    </button>
  );
}

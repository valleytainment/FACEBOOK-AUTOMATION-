/**
 * ============================================================================
 * 🎯 TOP BAR (MISSION CONTROL)
 * ============================================================================
 * Description: The top status strip providing one-glance clarity.
 * Features: System health indicators, next post countdown, quick settings.
 * ============================================================================
 */

import { Settings, CheckCircle2, Clock, Zap } from "lucide-react";
import { cn } from "@/src/lib/utils";

export function TopBar() {
  return (
    // 🛡️ Header Container: Sticky, glassmorphism, flex layout
    <header className="h-14 border-b border-border bg-card/80 backdrop-blur-md flex items-center justify-between px-6 z-30 sticky top-0">
      
      {/* 📱 Mobile Logo (Hidden on Desktop) */}
      <div className="md:hidden flex items-center gap-2">
        <div className="w-5 h-5 rounded bg-accent flex items-center justify-center shadow-[0_0_10px_rgba(0,210,255,0.4)]">
          <div className="w-1.5 h-1.5 bg-bg rounded-sm" />
        </div>
      </div>

      {/* 🟢 Center Status Strip (Mission Critical Info) */}
      <div className="hidden md:flex items-center gap-6 mx-auto">
        <StatusIndicator icon={Zap} label="Automation" status="active" />
        <div className="w-px h-4 bg-white/10" /> {/* Divider */}
        <StatusIndicator icon={CheckCircle2} label="Facebook" status="active" />
        <div className="w-px h-4 bg-white/10" /> {/* Divider */}
        <StatusIndicator icon={CheckCircle2} label="AI Model" status="active" />
      </div>

      {/* ⏱️ Right Actions (Timing & Settings) */}
      <div className="flex items-center gap-4 text-xs font-mono">
        {/* Post Timings */}
        <div className="hidden lg:flex flex-col items-end text-muted">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3 h-3" /> Last: <span className="text-white">Today 9:00 AM</span>
          </span>
          <span className="flex items-center gap-1.5 text-accent">
            <Clock className="w-3 h-3" /> Next: <span className="text-white">Today 6:00 PM</span>
          </span>
        </div>
        
        {/* Settings Button */}
        <button className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted hover:text-white hover:bg-white/10 transition-colors">
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}

/**
 * 🟢 Status Indicator Sub-Component
 * ----------------------------------------------------------------------------
 * Reusable component for displaying system health with glowing icons.
 */
function StatusIndicator({ 
  icon: Icon, 
  label, 
  status 
}: { 
  icon: any, 
  label: string, 
  status: "active" | "error" | "warning" 
}) {
  // Color mapping based on status
  const colors = {
    active: "text-success",
    error: "text-error",
    warning: "text-warning"
  };

  // Glow mapping based on status
  const glowColors = {
    active: "shadow-[0_0_10px_rgba(16,185,129,0.3)]",
    error: "shadow-[0_0_10px_rgba(239,68,68,0.3)]",
    warning: "shadow-[0_0_10px_rgba(245,158,11,0.3)]"
  };

  return (
    <div className="flex items-center gap-2 text-xs font-medium text-muted">
      <div className="relative flex items-center justify-center">
        <Icon className={cn("w-3.5 h-3.5", colors[status])} />
        {/* Subtle background glow for the icon */}
        <div className={cn("absolute inset-0 rounded-full blur-[2px]", glowColors[status])} />
      </div>
      {label}
    </div>
  );
}
